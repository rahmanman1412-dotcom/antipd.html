// MRYAGAMI QUANTUM FORCE — CLOUDFLARE WORKER
// Routing & API Ringkas

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        // API endpoint — laporan
        if (path === '/api/report' && request.method === 'POST') {
            try {
                const data = await request.json();
                // Simulasi simpan laporan
                const reportId = 'MRY-' + Math.random().toString(36).substring(2, 8).toUpperCase();
                return new Response(JSON.stringify({
                    status: 'success',
                    message: 'Laporan diterima. ID: ' + reportId,
                    id: reportId,
                    timestamp: new Date().toISOString()
                }), {
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch {
                return new Response(JSON.stringify({ status: 'error', message: 'Data tidak sah' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        // Status laporan — GET
        if (path === '/api/status' && request.method === 'GET') {
            const id = url.searchParams.get('id');
            if (!id) {
                return new Response(JSON.stringify({ status: 'error', message: 'ID diperlukan' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            // Simulasi status
            const statuses = ['Diterima', 'Dalam proses verifikasi', 'Sedang disiasat', 'Selesai'];
            return new Response(JSON.stringify({
                id: id,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                updated: new Date().toISOString()
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Root — serve static
        return new Response('MRYAGAMI PORTAL AKTIF', {
            headers: { 'Content-Type': 'text/html' }
        });
    }
};
