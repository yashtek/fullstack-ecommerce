import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;



export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  retry = true
): Promise<Response | null> => {
  const cookieStore = await cookies();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      cookie: cookieStore.toString(), 
    },
    cache: "no-store",
  });

  if (res.status === 401 && retry) {
    const refreshRes = await fetch(`${BASE_URL}/refresh`, {
      method: "POST",
      headers: {
        cookie: cookieStore.toString(),
      },
    });

    if (!refreshRes.ok) {
      return null;
    }

    // Backend sets new accessToken cookie via Set-Cookie header
    // Retry the original request with the new token from cookies
    return fetchWithAuth(url, options, false);
  }

  return res;
};

export const getUserProfile = async (): Promise<any> => {
  const res = await fetchWithAuth(`${BASE_URL}/me`);

  if (!res || !res.ok) return null;
  const data = await res.json();

  return data.user;
};
