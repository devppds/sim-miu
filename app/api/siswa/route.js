export const runtime = 'edge';

import { getSantriData } from '@/lib/db';

export async function GET() {
    try {
        const query = `
            SELECT 
                id,
                stambuk_madrasah as nis, 
                nama_siswa as nama, 
                kelas, 
                kamar,
                status_mb as status,
                tahun_masuk
            FROM santri 
            WHERE madrasah LIKE '%MIU%'
            ORDER BY kelas ASC, nama_siswa ASC
        `;

        const data = await getSantriData(query);

        // Debugging: Jika data kosong, kita cek binding-nya
        if (!data || data.length === 0) {
            console.warn("Query berhasil tapi data 0 atau Binding DB_PONDOK tidak aktif.");
        }

        return Response.json(data);
    } catch (e) {
        console.error("API Error fetch siswa:", e);
        return Response.json({ error: e.message, details: "Cek konfigurasi D1 Bindings di Dashboard Cloudflare" }, { status: 500 });
    }
}
