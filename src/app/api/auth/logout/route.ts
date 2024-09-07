import { COOKIES_PREFIX } from '@/config/constants';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json();

  // change with your own endpoint
  const res = await fetch(`${process.env.NEXT_SERVER_API_URL}/auth/logout`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${body.accessToken}`,
    },
  });

  // remove cookies after
  cookies()
    .getAll()
    .map((cookie) => {
      if (cookie.name.startsWith(`${COOKIES_PREFIX}.`))
        cookies().delete(cookie.name as any);
    });

  return Response.json({
    success: res.ok,
    status: res.status,
  });
}

// src/app/api/auth/logout/route.ts
