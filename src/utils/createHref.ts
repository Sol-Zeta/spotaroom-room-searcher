export const createHref = (content: any, contentType: string) => {
    const file = new Blob([content], { type: contentType });
    // return URL.createObjectURL(file);
    return URL.createObjectURL(new Blob([JSON.stringify(content)], { type: contentType }))
  };