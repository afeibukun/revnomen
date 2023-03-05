import Link from "next/link";

const LinkButton = ({ url, children}:any) => {
  return (
    <>
      <Link
        href={url}
        className="inline-block py-6 px-20 rounded-lg text-2xl font-semibold bg-gray-300"
      >
        {children}
      </Link>
    </>
  );
};
export default LinkButton;
