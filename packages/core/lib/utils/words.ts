export const capitalize = (input: string) => input.charAt(0).toUpperCase() + input.slice(1);
  
export const titleCase = (title: string) => title.toLowerCase().split(" ").map((word: string, i: number) => {
    // ignore certain words if they aren't the first word
    if (["a", "an", "to", "the", "of"].includes(word) && i > 0) return word;

    return capitalize(word);
}).join(" ");