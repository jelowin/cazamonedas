import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  const { rows } = await sql`SELECT * FROM coins`;
  // const { rows } = await sql`SELECT * FROM coins WHERE country > ${country};`;
  return NextResponse.json({ rows });
}
