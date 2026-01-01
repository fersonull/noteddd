import { auth } from "../auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/notebooks/navbar";
import Sidebar from "@/components/notebooks/sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-dvh w-full">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
