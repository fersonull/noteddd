import SignInForm from "@/components/auth/sign-in-form";
import { auth } from "../auth";

export default async function AuthPage() {
  const session = await auth();
  console.log(session);

  return <SignInForm />;
}
