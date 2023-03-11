export const convertToSlug = (text: String): String =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

export const randomString = (length: Number, chars: String): String => {
  let result = "";
  for (let i:any = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
