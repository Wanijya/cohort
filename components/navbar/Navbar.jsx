import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-20 w-full bg-pink-400 flex justify-between items-center px-11 text-2xl">
      <h2>Navbar</h2>
      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/courses">Courses</Link>
        <Link href="/product">Product</Link>
      </div>
    </div>
  );
};

export default Navbar;
