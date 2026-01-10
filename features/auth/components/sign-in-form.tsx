"use client";

import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { login } from "@/features/auth/actions/auth";
import AppLogo from "@/components/common/app-logo";

export function SignInForm() {
  return (
    <div className="flex items-center justify-center h-dvh font-outfit w-full">
      <div className="w-full max-w-sm mx-auto">
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
            onClick={() => login("github", "/notebooks")}
          >
            <FaGithub />
            <span>Continue with GitHub</span>
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => login("google", "/notebooks")}
          >
            <FcGoogle />
            <span>Continue with Google</span>
          </Button>

          <div className="text-center w-full">
            <p className="text-xs">
              By signing in, you agree to our{" "}
              <a href="" className="underline">
                Terms and Conditions
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
