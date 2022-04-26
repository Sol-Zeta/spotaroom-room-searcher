import { RefObject } from "react";

export const downloadFile = (content: string, fileName: string, contentType: string, ref: RefObject<HTMLAnchorElement>) => {
    const file = new Blob([content], { type: contentType });
    if(ref.current){
      ref.current.href = URL.createObjectURL(file);
      ref.current.download = fileName;
      ref.current.click();
    }
};
// export const downloadFile = (ref: RefObject<HTMLAnchorElement>) => {
//   if (ref.current) {
//     ref.current.click();
//   }
// };
