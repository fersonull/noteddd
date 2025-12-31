import Link from "next/link";

export default function AppLogo() {
  return (
    <Link href="/" className="font-mono font-semibold mb-10">
      {process.env.NEXT_PUBLIC_APP_NAME || "??"}
    </Link>
  );
}
