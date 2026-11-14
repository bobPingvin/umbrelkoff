import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ensureApplicationsTable, getSql, setCorsHeaders } from '../_db.js';

interface CountRow {
  corp: string;
  cnt: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  try {
    const sql = getSql();
    await ensureApplicationsTable(sql);

    const rows = (await sql`
      SELECT corp, COUNT(*)::int AS cnt
      FROM volunteer_applications
      GROUP BY corp
    `) as CountRow[];

    let umbrella = 0;
    let murkoff = 0;
    for (const row of rows) {
      if (row.corp === 'umbrella') umbrella = Number(row.cnt) || 0;
      if (row.corp === 'murkoff') murkoff = Number(row.cnt) || 0;
    }

    return res.status(200).json({
      total: umbrella + murkoff,
      umbrella,
      murkoff,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Ошибка получения статистики из БД';
    return res.status(500).json({ error: message });
  }
}
