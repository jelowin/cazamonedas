import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request) {
  // const { searchParams } = new URL(request.url);
  // const country = searchParams.get("country");
  const { rows } = await sql`SELECT * FROM coins`;
  // const { rows } = await sql`SELECT * FROM coins WHERE country > ${country};`;
  return NextResponse.json(rows);
}
