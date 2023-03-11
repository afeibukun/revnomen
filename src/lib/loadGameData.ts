import { category, nounArray } from "@/data/hidden_name";

export const generateCategoryLength = () => {
  const minCategoryLength = 5;
  const maxCategoryLength = 12;
  let selectedCategoryLength =
    Math.floor(Math.random() * (maxCategoryLength - minCategoryLength + 1)) +
    minCategoryLength;
  return selectedCategoryLength;
};

export const selectCategory = (categoryLength: Number) => {
  let categoryArray = nounArray.map(({ category }) => category);
  let selectedCategoryArray = [] as any;
  // for (let i = 0; i<categoryLength; i++){
  while (selectedCategoryArray.length < categoryLength) {
    let randomIndex = Math.floor(Math.random() * categoryArray.length);
    let selectedCategory = categoryArray[randomIndex];
    if (!selectedCategoryArray.includes(selectedCategory)) {
      selectedCategoryArray.push(selectedCategory);
    }
  }
  return selectedCategoryArray;
};

export const selectNoun = (categoryList: any) => {
  const selectedNounList = categoryList.map((thisCategory: any) => {
    let categoryOnMainArray = nounArray.filter(
      (noun) => noun.category == thisCategory
    )[0];
    let randomIndex = Math.floor(
      Math.random() * categoryOnMainArray.data.length
    );
    let selectedNoun = categoryOnMainArray.data[randomIndex];
    let selectedNounArray = selectedNoun.toLowerCase().replace(/[^a-z]/g, '').split("");
    let hiddenNounArray = [...selectedNounArray].fill("")
    return { category: thisCategory, noun: selectedNoun, nounArray:selectedNounArray, hiddenNounArray: hiddenNounArray};
  });

  return selectedNounList;
};
