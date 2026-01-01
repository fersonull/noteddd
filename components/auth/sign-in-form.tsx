"use client";

import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FcGoogle } from "react-icons/fc";
import { login } from "@/lib/actions/auth";
import AppLogo from "../common/app-logo";

export default function SignInForm() {
  return (
    <div className="flex items-center justify-center h-dvh font-sans w-full">
      <div className="w-full max-w-xl">
        <div className="mb-10">
          <AppLogo />
        </div>

        <p className="font-semibold text-3xl">
          Login with your account, and start creating your first notebook.
        </p>

        <Separator className="mt-10 mb-6" />
        <div className="flex flex-col items-start justify-center gap-4 w-full">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => login("github", "/dashboard")}
          >
            <FaGithub />
            <span>Continue with GitHub</span>
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => login("google", "/dashboard")}
          >
            <FcGoogle />
            <span>Continue with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
