export function convertToTitleCase(input : string) {
    // Split the input string by capital letters
    const words = input.split(/(?=[A-Z])/);
    
    // Capitalize the first character of each word and convert the rest to lowercase
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    
    // Join the words with spaces
    const result = capitalizedWords.join(' ');
    
    return result;
}


export function convertToSpaceSeparated(str: string) {
    // Split the string by underscores
    const wordsArray = str?.split('_');
    
    // Join the array elements with spaces
    const spaceSeparatedString = wordsArray?.join(' ');
    
    return spaceSeparatedString;
  }