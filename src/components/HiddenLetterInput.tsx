import { useState } from "react";
import { convertToSlug } from "@/lib";

const HiddenLetterInput = ({ categoryLabel }: any) => {
  const [inputChar, setInputChar] = useState("");

  const validateInput = (event: any) => {
    const val = event.target.value;
    const key = val.charCodeAt();

    if (
      val &&
      ((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) &&
      val.length == 1
    ) {
      setInputChar(val);
    }
  };
  return (
    <>
      <label htmlFor={convertToSlug(categoryLabel)} className="hidden">
        {categoryLabel}
      </label>
      <input
        type="text"
        id={convertToSlug(categoryLabel)}
        value={inputChar}
        maxLength={1}
        onChange={validateInput}
        className="w-12 border-b-2 border-black text-center text-3xl font-medium uppercase outline-0 bg-transparent"
      />
    </>
  );
};
export default HiddenLetterInput;
