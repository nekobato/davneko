type UseFetch = typeof useFetch;

export const useApi: UseFetch = (url, options) => {
  const config = useRuntimeConfig();
  return useFetch(url, {
    baseURL: config.public.apiBase as string,
    key: url.toString(),
    ...options
  });
};
