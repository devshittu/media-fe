import { cookies, headers } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { COOKIES_PREFIX, privateRoutes } from './config/constants';
import serverApiClient from './lib/server-api-client';
import { AuthResponse, AuthUser } from './features/auth';
import {
  URI_AUTH_ME,
  URI_AUTH_TOKEN,
  URI_AUTH_TOKEN_REFRESH,
} from './config/api-constants';

// Helper function to save tokens in cookies
const saveTokensInCookies = (token: any) => {
  cookies().set({
    name: `${COOKIES_PREFIX}.access-token`,
    value: token.accessToken,
  } as any);
  cookies().set({
    name: `${COOKIES_PREFIX}.refresh-token`,
    value: token.refreshToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  } as any);
};

export type DecodedAccessToken = {
  exp: number;
  user_id: number;
};
// @ts-ignore
export const refreshAccessToken = async (token) => {
  // this is our refresh token method
  console.log('Now refreshing the expired token...', token);
  try {
    const { data } = await serverApiClient.post<AuthResponse>(
      URI_AUTH_TOKEN_REFRESH,
      {
        // userID: token.userId,
        refresh_token: token.refreshToken,
      },
    );

    if (!data) {
      console.log('The token could not be refreshed!');
      throw new Error('Token refresh failed');
    }

    console.log('The token has been refreshed successfully.', data);

    return {
      ...token,
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? token.refreshToken,
      error: '',
    };
  } catch (error: any) {
    // Use any type to ensure you can access all error properties
    console.log('Refresh failed');
    console.log('Error message:', error.message);
    console.log('Error config:', error.config);
    if (error.response) {
      console.log('Error response status:', error.response.status);
      console.log('Error response data:', error.response.data);
      console.log('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.log('No response received:', error.request);
    } else {
      console.log('Error in setting up the request:', error.message);
    }

    // return an error if somethings goes wrong
    return {
      ...token,
      error: 'RefreshAccessTokenError', // attention!
    };
  }
};

export const config = {
  trustHost: true,
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },
  providers: [
    // we use credentials provider here
    CredentialsProvider({
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },

      async authorize(credentials, req) {
        const payload = {
          username_or_email: credentials.email,
          password: credentials.password,
        };

        try {
          console.log('Authorization request payload:', payload);

          const { data: user } = await serverApiClient.post<AuthResponse>(
            URI_AUTH_TOKEN,
            payload,
          );

          if (!user) {
            console.error('Authorization error:');
            throw new Error('Login failed');
          }
          console.log('Authorization response:', user);

          if (user) {
            // Store tokens in cookies
            cookies().set({
              name: `${COOKIES_PREFIX}.access-token`,
              value: user.access_token,
            } as any);
            cookies().set({
              name: `${COOKIES_PREFIX}.refresh-token`,
              value: user.refresh_token,
              httpOnly: true,
              sameSite: 'strict',
              secure: true,
            } as any);

            console.log(`Set accessToken and refreshToken in cookies`);

            // Fetch additional user details
            const { data: userDetails } = await serverApiClient.get<AuthUser>(
              URI_AUTH_ME,
              {
                headers: {
                  Authorization: `Bearer ${user.access_token}`,
                },
              },
            );
            // console.info(`userDetails: `,userDetails)

            // Return both the tokens and the user details
            return {
              // id: userDetails.id,
              name: userDetails.display_name,
              // email: userDetails.email,
              picture: userDetails.display_picture || userDetails.avatar_url,
              accessToken: user.access_token,
              refreshToken: user.refresh_token,
              idToken: user.token_id,
              // bio: userDetails.avatar_url,
              ...userDetails,
            };
          }

          return null;
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error('Authorization failed');
        }
      },
    }),
  ],
  // this is required
  secret: process.env.AUTH_SECRET,
  // our custom login page
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.id = user.id;
        token.name = user.name; // Map to correct fields
        token.email = user.email;
        token.picture = user.picture; // Map to correct fields
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = 'Unknown'; // Default user role
        token.bio = user.bio;
        token.username = user.username;
        token.has_completed_setup = user.has_completed_setup;
        // token.user = user

        // Ensure accessToken exists and decode it
        if (user.accessToken) {
          try {
            // Decode the access token
            const decodedAccessToken = jwtDecode<DecodedAccessToken>(
              user.accessToken,
            );

            if (decodedAccessToken) {
              token.userId = decodedAccessToken.user_id;
              token.accessTokenExpires = decodedAccessToken.exp * 1000; // Convert to milliseconds
              console.log('decodedAccessToken: ', decodedAccessToken);
            }
          } catch (error) {
            console.error('Failed to decode access token:', error);
          }
        }
      }

      // Return previous token if the access token has not expired yet
      console.log(
        '**** Access token expires on *****',
        token.accessTokenExpires,
        new Date(token.accessTokenExpires),
      );
      // Check if the access token is still valid
      if (
        (token.accessTokenExpires &&
          Date.now() < Number(token.accessTokenExpires)) ||
        token.error !== 'RefreshAccessTokenError'
      ) {
        console.log('**** returning previous token ******', token);
        // const { refreshToken, ...rest } = token;
        // return rest;
        return token;
      }

      // Refresh the access token if it has expired
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      console.log('session => ', session);

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          name: token.name, // Ensure session has the correct name
          picture: token.picture, // Ensure session has the correct picture
          role: token.role,
          bio: token.bio,
          username: token.username,
          is_active: token.is_active,
          has_completed_setup: token.has_completed_setup,
          // cognitoGroups: token.cognitoGroups as string[],
          accessToken: token.accessToken as string,
          accessTokenExpires: token.accessTokenExpires as number,
          redirectToVerify: !token.is_active && !token.has_completed_setup, // Redirect if not active and setup not completed
        },
        error: token.error,
      };
    },
  },
  debug: process.env.NODE_ENV === 'development',
} satisfies NextAuthConfig;

export const { auth, handlers } = NextAuth(config);

// src/auth.ts
