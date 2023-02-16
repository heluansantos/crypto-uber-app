export const buildUrl = (path: string, params: URLSearchParams) =>
  `${BASE_URL}${path}?${params.toString()}`;

const BASE_URL = "https://phantom.app/ul/v1/";
