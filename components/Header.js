import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white text-center font-bold p-2 text-purple-600 border-b-2 border-solid">
      <Link href="/">GTA Scholar Tracker</Link>
    </header>
  );
}
