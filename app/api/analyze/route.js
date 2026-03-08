import { callAI } from '@/lib/ai';

export async function POST(req) {
  try {
    const { image } = await req.json();

    const reply = await callAI([], image);

    return new Response(JSON.stringify({ analysis: reply }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
