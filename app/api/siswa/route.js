export const runtime = 'edge';

import { getSantriData } from '@/lib/db';

export async function GET() {
    // Kita bungkus semua dalam try-catch paling luar
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
            ORDER BY nama_siswa ASC
            LIMIT 100
        `;

        const data = await getSantriData(query);

        if (data === null) {
            return new Response(JSON.stringify({
                error: "BINDING_NOT_FOUND",
                message: "Aplikasi tidak bisa mendeteksi database. Pastikan Binding di Dashboard Cloudflare sudah benar."
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (e) {
        return new Response(JSON.stringify({
            error: "RUNTIME_CRASH",
            message: e.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
