import { SignInForm } from "@/features/auth/index";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const session = await auth();
  console.log(session);

  if (session) redirect("/notebooks");

  return <SignInForm />;
}
