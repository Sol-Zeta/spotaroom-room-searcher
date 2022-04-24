import { RefObject } from 'react';

export const createHref = (content: string, contentType: string) => {
  const file = new Blob([content], { type: contentType });
  return URL.createObjectURL(file);
};

export const downloadFile = (
  content: string,
  contentType: string,
  ref: RefObject<HTMLAnchorElement>
) => {
  createHref(content, contentType);
  if (ref.current) {
    ref.current.click();
  }
};
