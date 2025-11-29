import Link from "next/link";

export default function NavItems() {
  return (
    <div className="text-sm lg:flex-grow">
      <Link
        href="/"
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Optimiser
      </Link>
    </div>
  );
}
