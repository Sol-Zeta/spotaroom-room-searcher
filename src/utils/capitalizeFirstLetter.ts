export const capitalizeFirstLetter = (string: string) => {
  const word = string.split("");
    return `${word[0].toUpperCase()}${word.slice(1).join("")}`;
};
