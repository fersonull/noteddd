import SignInForm from "@/components/auth/sign-in-form";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const session = await auth();
  console.log(session);

  if (session) redirect("/dashboard");

  return <SignInForm />;
}
