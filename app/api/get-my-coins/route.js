import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request) {
  try {
    const result = await sql`SELECT *
    FROM coins c
    JOIN user_coins uc ON c.id = uc.coin_id
    JOIN users u ON u.id = uc.user_id
    WHERE u.id = 1;
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
