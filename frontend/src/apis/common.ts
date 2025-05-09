import axios, { type AxiosProgressEvent, type AxiosResponse } from "axios";

export class BadResponseFormatError extends Error {
  constructor(received: string, expected: string) {
    super(`Malformed response (received: ${received}, expected: ${expected})`);
  }
}

const checkContentType = (
  res: AxiosResponse,
  expected: string = "application/json"
): void => {
  if (!res.headers["content-type"].startsWith(expected)) {
    throw new BadResponseFormatError(res.headers["content-type"], expected);
  }
};

const getJson = async <T>(resource: string): Promise<T> => {
  const res = await axios.get<T>(resource);
  checkContentType(res);
  return res.data;
};

const postJson = async <T>(
  resource: string,
  payload: {} | null = null
): Promise<T> => {
  const res = await axios.post<T>(resource, payload);
  checkContentType(res);
  return res.data;
};

const postForm = async <T>(
  resource: string,
  formData: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
): Promise<T> => {
  const res = await axios.post(resource, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: onUploadProgress,
  });
  checkContentType(res);
  return res.data;
};

const deleteJson = async <T>(resource: string): Promise<T> => {
  const res = await axios.delete<T>(resource);
  checkContentType(res);
  return res.data;
};
export { postJson, postForm, getJson, deleteJson };
