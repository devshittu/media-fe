import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json();
  const payload = {
    refreshToken: cookies().get('refresh-token')?.value,
    userID: body.userID,
  };
  const res = await fetch(
    `${process.env.NEXT_SERVER_API_URL}/auth/token/refresh/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(payload),
    },
  );
  const data = await res.json();
  return new Response(
    JSON.stringify({ success: res.ok, status: res.status, data }),
    { status: res.ok ? 200 : 500 },
  );
}
