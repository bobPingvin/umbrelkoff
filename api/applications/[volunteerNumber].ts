import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  ensureApplicationsTable,
  getSql,
  setCorsHeaders,
  toApplicationResponse,
  type VolunteerApplicationRow,
} from '../_db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const rawParam = req.query.volunteerNumber;
  const rawValue = Array.isArray(rawParam) ? rawParam[0] : rawParam;
  if (!rawValue) {
    return res.status(400).json({ error: 'Не указан номер волонтёра' });
  }

  let volunteerNumber = rawValue;
  try {
    volunteerNumber = decodeURIComponent(rawValue);
  } catch {
    volunteerNumber = rawValue;
  }

  try {
    const sql = getSql();
    await ensureApplicationsTable(sql);

    const rows = (await sql`
      SELECT * FROM volunteer_applications
      WHERE volunteer_number = ${volunteerNumber}
      LIMIT 1
    `) as VolunteerApplicationRow[];

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Заявка не найдена' });
    }

    return res.status(200).json(toApplicationResponse(rows[0]));
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Ошибка поиска заявки в БД';
    return res.status(500).json({ error: message });
  }
}
