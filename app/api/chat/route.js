import { callAI } from '@/lib/ai';

export async function POST(req) {
  try {
    const { message } = await req.json();

    const messages = [
      { role: 'user', content: message }
    ];

    const reply = await callAI(messages);

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
