// pages/api/refresh.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cookie from 'cookie';

// Define the response type
interface RefreshResponse {
  accessToken?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RefreshResponse>,
) {
  console.log('NextApiRequest: req.headers.cookie', req.headers.cookie);
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const refreshToken = cookies['refresh_token'];

    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token provided' });
    }

    // Replace with your actual refresh token endpoint and logic
    const response = await axios.post(
      'https://your-auth-server.com/api/token/refresh',
      {
        refresh_token: refreshToken,
      },
    );

    const newAccessToken = response.data.access_token;
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
