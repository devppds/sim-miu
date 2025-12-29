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
            WHERE madrasah = 'MIU'
            ORDER BY kelas ASC, nama_siswa ASC
        `;

        const data = await getSantriData(query);

        return Response.json(data);
    } catch (e) {
        console.error("API Error fetch siswa:", e);
        return Response.json({ error: e.message }, { status: 500 });
    }
}
