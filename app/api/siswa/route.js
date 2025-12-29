export const runtime = 'edge';

// Menggunakan wrapper db yang sudah kita buat sebelumnya di lib/db.js agar konsisten
import { getSantriData } from '@/lib/db';

export async function GET() {
    try {
        // Query yang sangat spesifik berdasarkan screenshot yang Anda berikan
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
            ORDER BY nama_siswa ASC
        `;

        const data = await getSantriData(query);

        // Jika getSantriData mengembalikan null atau undefined (karena binding hilang)
        if (!data) {
            return Response.json({
                error: "DATABASE_BINDING_MISSING",
                message: "Aplikasi tidak bisa menemukan 'DB_PONDOK'. Pastikan Binding di Dashboard Cloudflare sudah di-Save dan di-Redeploy."
            }, { status: 500 });
        }

        return Response.json(data);

    } catch (e) {
        console.error("Critical API Error:", e);
        return Response.json({
            error: "SERVER_ERROR",
            message: e.message
        }, { status: 500 });
    }
}
