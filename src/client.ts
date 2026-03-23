import { config } from './config.js';

export async function apiCall<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${config.apiUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`thatsme API error ${res.status}: ${body}`);
  }

  return res.json() as T;
}
