"use client";

import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FcGoogle } from "react-icons/fc";
import { login } from "@/lib/actions/auth";
import AppLogo from "../common/app-logo";

export default function SignInForm() {
  return (
    <div className="flex items-center justify-center h-dvh font-sans">
      <div className="w-full max-w-xl">
        <AppLogo />

        <p className="font-semibold text-3xl">
          Login with your account, and start creating your first notebook.
        </p>

        <Separator className="mt-10 mb-6" />
        <div className="flex flex-col items-start justify-center gap-4">
          <Button variant="outline" onClick={() => login("github", "/")}>
            <FaGithub />
            <span>Continue with Github</span>
          </Button>
          <Button variant="outline" onClick={() => login("google", "/")}>
            <FcGoogle />
            <span>Continue with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
