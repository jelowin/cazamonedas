import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  const { rows } = await sql`SELECT * FROM coins ORDER BY year;`;
  return NextResponse.json(rows);
}
