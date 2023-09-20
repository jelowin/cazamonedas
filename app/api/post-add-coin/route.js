import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request) {
  const data = await request.json();
  try {
    const result =
      await sql`INSERT INTO user_coins (user_id, coin_id) VALUES (${data.userId}, ${data.coinId});`;
    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
