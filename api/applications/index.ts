import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  ensureApplicationsTable,
  getSql,
  setCorsHeaders,
  toApplicationResponse,
  type VolunteerApplicationRow,
} from '../_db.js';

interface CreateApplicationRequest {
  corp?: string;
  fullName?: string;
  age?: number | string;
  email?: string;
  phone?: string;
  program?: string;
  motivation?: string;
  needsAccommodation?: boolean;
  needsTransfer?: boolean;
  agreedToTerms?: boolean;
}

function trimOrEmpty(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function formatRuDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

async function generateUniqueVolunteerNumber(
  sql: ReturnType<typeof getSql>,
  corp: 'umbrella' | 'murkoff'
): Promise<{ volunteerNumber: string; code: string }> {
  const prefix = corp === 'umbrella' ? 'АМБРЕЛЛА-БИО-' : 'МЕРКОФФ-ЗАБОТА-';

  for (let attempt = 0; attempt < 25; attempt++) {
    const code = String(Math.floor(1000 + Math.random() * 9000));
    const candidate = `${prefix}${code}`;
    const existing = (await sql`
      SELECT 1 FROM volunteer_applications WHERE volunteer_number = ${candidate} LIMIT 1
    `) as Record<string, unknown>[];
    if (existing.length === 0) {
      return { volunteerNumber: candidate, code };
    }
  }

  const fallbackCode = String(Date.now() % 100000);
  return { volunteerNumber: `${prefix}${fallbackCode}`, code: fallbackCode };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const sql = getSql();
    await ensureApplicationsTable(sql);

    if (req.method === 'GET') {
      const rows = (await sql`
        SELECT * FROM volunteer_applications ORDER BY created_at DESC
      `) as VolunteerApplicationRow[];
      return res.status(200).json(rows.map(toApplicationResponse));
    }

    if (req.method === 'POST') {
      let body: CreateApplicationRequest | null = null;
      if (typeof req.body === 'string') {
        try {
          body = JSON.parse(req.body) as CreateApplicationRequest;
        } catch {
          return res.status(400).json({ error: 'Некорректный JSON в запросе' });
        }
      } else if (req.body && typeof req.body === 'object') {
        body = req.body as CreateApplicationRequest;
      }

      if (!body) {
        return res.status(400).json({ error: 'Пустой запрос' });
      }

      const corpRaw = trimOrEmpty(body.corp).toLowerCase();
      if (corpRaw !== 'umbrella' && corpRaw !== 'murkoff') {
        return res
          .status(400)
          .json({ error: 'Некорректная корпорация: укажите umbrella или murkoff' });
      }
      const corp: 'umbrella' | 'murkoff' = corpRaw;

      const fullName = trimOrEmpty(body.fullName).slice(0, 180);
      if (!fullName) {
        return res.status(400).json({ error: 'Укажите полное имя (ФИО)' });
      }

      const parsedAge = Number(body.age);
      if (!Number.isFinite(parsedAge) || parsedAge < 18 || parsedAge > 80) {
        return res
          .status(400)
          .json({ error: 'Возраст должен быть от 18 до 80 лет' });
      }
      const age = Math.trunc(parsedAge);

      const email = trimOrEmpty(body.email).slice(0, 180);
      if (!email || !email.includes('@')) {
        return res
          .status(400)
          .json({ error: 'Укажите корректную электронную почту' });
      }

      const phone = trimOrEmpty(body.phone).slice(0, 64);
      if (!phone) {
        return res.status(400).json({ error: 'Укажите номер телефона' });
      }

      if (!body.agreedToTerms) {
        return res
          .status(400)
          .json({ error: 'Необходимо согласие с условиями программы' });
      }

      let program = trimOrEmpty(body.program).slice(0, 200);
      if (!program) {
        program =
          corp === 'umbrella'
            ? 'Иммунизация «Прародитель-Т»'
            : 'Программа «Новый Старт»';
      }

      const motivation = trimOrEmpty(body.motivation).slice(0, 1000);
      const needsAccommodation = Boolean(body.needsAccommodation);
      const needsTransfer = Boolean(body.needsTransfer);

      const { volunteerNumber, code } = await generateUniqueVolunteerNumber(
        sql,
        corp
      );

      const isUmbrella = corp === 'umbrella';
      const facility = isUmbrella
        ? 'Медицинский исследовательский корпус Арклей, Блок C'
        : 'Санаторно-оздоровительный комплекс Синьявского, Корпус С-1';
      const assignedRole = isUmbrella
        ? 'Ассистент превентивных био-испытаний'
        : 'Участник программы социальной адаптации «Новый Старт»';
      const clearanceLevel = isUmbrella
        ? 'Уровень 1-B (Био-Скрининг)'
        : 'Полный пансион (Сектор Синьявского)';
      const issuedDate = isUmbrella ? formatRuDate(new Date()) : '14.11.1959 г.';
      const barcode = isUmbrella
        ? `*АМБРЕЛЛА-${code}*`
        : `*МЕРКОФФ-ЗАБОТА-${code}*`;
      const status = 'ЗАРЕГИСТРИРОВАНО';

      const inserted = (await sql`
        INSERT INTO volunteer_applications (
          volunteer_number,
          corp,
          full_name,
          age,
          email,
          phone,
          program,
          motivation,
          needs_accommodation,
          needs_transfer,
          agreed_to_terms,
          facility,
          assigned_role,
          clearance_level,
          issued_date,
          barcode,
          status,
          created_at
        )
        VALUES (
          ${volunteerNumber},
          ${corp},
          ${fullName},
          ${age},
          ${email},
          ${phone},
          ${program},
          ${motivation},
          ${needsAccommodation},
          ${needsTransfer},
          ${true},
          ${facility},
          ${assignedRole},
          ${clearanceLevel},
          ${issuedDate},
          ${barcode},
          ${status},
          NOW()
        )
        RETURNING *
      `) as VolunteerApplicationRow[];

      return res.status(201).json(toApplicationResponse(inserted[0]));
    }

    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return res.status(405).json({ error: 'Метод не поддерживается' });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Внутренняя ошибка сервера при работе с БД';
    return res.status(500).json({ error: message });
  }
}
