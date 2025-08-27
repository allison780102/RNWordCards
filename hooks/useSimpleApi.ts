import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export function useSimpleApi<T = any>(path: string) {
  return useSWR<T>(path, fetcher);
}
