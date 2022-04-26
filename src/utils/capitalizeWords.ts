export const capitalizeWords = (string: string) => {
  const allWords = string.split(" ");
  if (allWords.length && allWords[0] !== "") {
    const capitalized = allWords
      .map((e: string) => {
        const word = e.split("");
        return `${word[0].toUpperCase()}${word.slice(1).join("")}`;
      })
      .join(" ");
    return capitalized;
  }
  return string;
};
