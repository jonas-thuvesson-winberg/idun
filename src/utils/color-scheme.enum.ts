export const whiteOrange = 'WhiteOrange';
export const blueGray = 'BlueGray';
export const plainTheme = 'PlainTheme';
export type ColorScheme = string;
export const colorSchemes = [blueGray, whiteOrange, plainTheme];

export const isColorScheme = (colorScheme: string): boolean => {
  if (!colorScheme) return false;
  colorSchemes.find(i => colorScheme.trim() === i.trim());
};

export function toClass(colorScheme: ColorScheme): string {
  if (isColorScheme(colorScheme)) {
    throw new Error('Invalid usage');
  }

  const words = [];
  let currentWord = colorScheme[0];
  for (let i = 1; i < colorScheme.length; i++) {
    if (i === colorScheme.length - 1) {
      currentWord += colorScheme[i];
      words.push(currentWord.toLowerCase().trim());
      break;
    }

    if (colorScheme[i].toLowerCase() !== colorScheme[i]) {
      words.push(currentWord.toLowerCase().trim());
      currentWord = '';
    }
    currentWord += colorScheme[i];
  }
  console.log(words);
  return words.join('-');
}
