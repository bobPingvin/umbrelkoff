import process from 'node:process';
import { neon } from '@neondatabase/serverless';
import type { VercelResponse } from '@vercel/node';

export type SqlClient = ReturnType<typeof neon>;

export interface VolunteerApplicationRow {
  id: number | string;
  volunteer_number: string;
  corp: string;
  full_name: string;
  age: number;
  email: string;
  phone: string;
  program: string;
  motivation: string | null;
  needs_accommodation: boolean;
  needs_transfer: boolean;
  agreed_to_terms: boolean;
  facility: string;
  assigned_role: string;
  clearance_level: string;
  issued_date: string;
  barcode: string;
  status: string;
  created_at: string | Date;
}

let tableReadyPromise: Promise<void> | null = null;

export function getDatabaseUrl(): string | undefined {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.NEON_DATABASE_URL
  );
}

export function getSql(): SqlClient {
  const url = getDatabaseUrl();
  if (!url) {
    throw new Error(
      'Не настроена переменная окружения DATABASE_URL для подключения к Neon PostgreSQL'
    );
  }
  return neon(url);
}

export async function ensureApplicationsTable(sql: SqlClient): Promise<void> {
  if (!tableReadyPromise) {
    tableReadyPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS volunteer_applications (
          id BIGSERIAL PRIMARY KEY,
          volunteer_number VARCHAR(64) NOT NULL UNIQUE,
          corp VARCHAR(32) NOT NULL,
          full_name VARCHAR(180) NOT NULL,
          age INTEGER NOT NULL,
          email VARCHAR(180) NOT NULL,
          phone VARCHAR(64) NOT NULL,
          program VARCHAR(200) NOT NULL,
          motivation VARCHAR(1000),
          needs_accommodation BOOLEAN NOT NULL DEFAULT FALSE,
          needs_transfer BOOLEAN NOT NULL DEFAULT FALSE,
          agreed_to_terms BOOLEAN NOT NULL DEFAULT TRUE,
          facility VARCHAR(255) NOT NULL,
          assigned_role VARCHAR(255) NOT NULL,
          clearance_level VARCHAR(160) NOT NULL,
          issued_date VARCHAR(32) NOT NULL,
          barcode VARCHAR(64) NOT NULL,
          status VARCHAR(64) NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `;
    })().catch((err) => {
      tableReadyPromise = null;
      throw err;
    });
  }
  await tableReadyPromise;
}

export function toApplicationResponse(row: VolunteerApplicationRow) {
  const createdAtValue =
    row.created_at instanceof Date
      ? row.created_at.toISOString()
      : row.created_at
        ? String(row.created_at)
        : null;

  return {
    id: `pass-${row.id}`,
    volunteerNumber: row.volunteer_number,
    fullName: row.full_name,
    age: Number(row.age),
    email: row.email,
    phone: row.phone,
    corp: row.corp,
    facility: row.facility,
    assignedRole: row.assigned_role,
    clearanceLevel: row.clearance_level,
    bloodType: row.program,
    motivation: row.motivation ?? '',
    needsAccommodation: Boolean(row.needs_accommodation),
    needsTransfer: Boolean(row.needs_transfer),
    issuedDate: row.issued_date,
    barcode: row.barcode,
    status: row.status,
    createdAt: createdAtValue,
  };
}

export function setCorsHeaders(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
