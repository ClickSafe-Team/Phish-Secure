const PLACEHOLDER_PREFIX = "__REPLACE_WITH_";

export function hasConfiguredEndpoint(endpoint: string | undefined) {
  return Boolean(endpoint && !endpoint.startsWith(PLACEHOLDER_PREFIX));
}

export async function apiRequest<T>(
  endpoint: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(endpoint, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
