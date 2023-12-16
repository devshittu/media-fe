// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';
import { apiClient } from '@/lib/api-client';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Django',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const res = await apiClient.post(
            'https://api.mediaapp.local/api/auth/token/',
            {
              username_or_email: credentials.username,
              password: credentials.password,
            },
            {
              withCredentials: true,
            },
          );

          const userRes = await apiClient.get(
            'https://api.mediaapp.local/api/auth/me',
            {
              headers: {
                Authorization: `Bearer ${res.data.access_token}`,
              },
            },
          );

          const user = {
            ...userRes.data,
            accessToken: res.data.access_token,
          };

          return user;
        } catch (error) {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, req }) => {
      if (user) {
        token.accessToken = user.accessToken;
      } else if (
        req &&
        token.accessToken &&
        accessTokenExpired(token.accessToken)
      ) {
        const refreshToken = req.cookies['refresh_token'];
        if (refreshToken) {
          try {
            const refreshedToken = await refreshAccessToken(refreshToken);
            token.accessToken = refreshedToken;
          } catch (error) {
            console.error('Failed to refresh access token:', error);
          }
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  // Additional NextAuth configuration...
});

// Add this inside the jwt callback in [...nextauth].ts

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const response = await apiClient.post(
    'https://api.mediaapp.local/api/auth/token/refresh/',
    {
      refresh_token: refreshToken,
    },
    {
      withCredentials: true,
    },
  );

  return response.data.access_token;
}

// function accessTokenExpired(accessToken: string): boolean {
//   // Implement logic to check if the access token has expired
//   // This might involve decoding the JWT and checking the expiry time
// }
function accessTokenExpired(accessToken: string): boolean {
  try {
    const decodedToken = jwt.decode(accessToken) as jwt.JwtPayload;
    if (!decodedToken.exp) return true; // Assume expired if no expiry time

    const currentTime = Math.floor(Date.now() / 1000); // Current time in Unix timestamp
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding access token:', error);
    return true; // Assume expired if there's an error
  }
}
