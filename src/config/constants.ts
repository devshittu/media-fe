export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;

export const API_MOCKING = process.env.NEXT_PUBLIC_API_MOCKING === 'true';

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_TEST = process.env.NODE_ENV === 'test';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const IS_DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG === 'true' ?? false;

export const IS_BROWSER = typeof window !== 'undefined';
export const IS_SERVER = typeof window === 'undefined';

export const THEME_DARK = 'dark';
export const THEME_LIGHT = 'light';
export const THEME_SYSTEM = 'system';

export const RECENT_ARTICLES_LIMIT = 2;
export const PAGINATE_STORIES_LIMIT = 8;

export const APP_NAME =
  (process.env.NEXT_PUBLIC_APP_NAME as string) ?? `Media-FE`;
const d = new Date();
let year = d.getFullYear();
export const COPYRIGHT_TEXT =
  (process.env.NEXT_PUBLIC_COPYRIGHT_TEXT as string) ??
  `© Copyright ${year} ${APP_NAME} Inc. All rights reserved.`;

export const ACCESS_TOKEN_KEY = 'accessToken';
export const AUTH_USER_DETAILS_KEY = 'authUserDetails';
export const APP_SUPPORT_VERSION =
  (process.env.NEXT_PUBLIC_APP_SUPPORT_VERSION as string) ?? `v1.0`;
