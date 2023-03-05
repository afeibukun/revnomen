export const convertToSlug = (text: String) => text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
