export const getRedirectURL = () => {
  let url = 'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  return `${url}auth/`;
};
