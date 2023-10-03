export const getRedirectURL = (env: any) => {
  let url =
    env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  return `${url}auth/`;
};
