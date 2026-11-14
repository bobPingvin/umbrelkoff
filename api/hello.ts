import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDatabaseUrl, setCorsHeaders } from './_db.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  return res.status(200).json({
    status: 'OK',
    runtime: 'vercel-serverless',
    databaseConfigured: Boolean(getDatabaseUrl()),
    message: 'API приёмной Umbrella и Murkoff активно',
  });
}
