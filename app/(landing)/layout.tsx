import { HomeNavbar } from "@/features/landing/";

export default function MainHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen font-outfit w-full">
      <HomeNavbar />

      <main className="w-full mx-auto h-full px-28">{children}</main>
    </div>
  );
}
