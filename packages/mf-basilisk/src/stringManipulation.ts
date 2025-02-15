const obfuscate = (input: string) => input.replaceAll('a', 'a')
    .replaceAll('c', 'c')
    .replaceAll('d', 'ԁ')
    .replaceAll('e', 'e')
    .replaceAll('h', 'һ')
    .replaceAll('u', 'ս')
    .replaceAll('i', 'і')
    .replaceAll('j', 'ј')
    .replaceAll('I', 'ӏ');

export default obfuscate;