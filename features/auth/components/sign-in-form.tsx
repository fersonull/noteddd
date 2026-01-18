"use client";

import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { login } from "@/features/auth/actions/auth";
import AppLogo from "@/components/common/app-logo";
import { BookOpen, Code2, FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleLogin = async (provider: "github" | "google") => {
    setIsLoading(provider);
    await login(provider, "/notebooks");
  };
  return (
    <div className="flex items-center justify-center min-h-screen font-outfit w-full bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-card border rounded-2xl shadow-xl p-8 space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-primary/10 border-2 border-primary/20">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <AppLogo />
            </div>
            <div className="space-y-2">
              <h1 className="font-bold text-3xl tracking-tight">
                Welcome back
              </h1>
              <p className="text-muted-foreground text-sm">
                Sign in to access your notebooks and continue your journey
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full h-11"
              variant="outline"
              onClick={() => handleLogin("github")}
              disabled={isLoading !== null}
            >
              {isLoading === "github" ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <FaGithub className="mr-2 h-5 w-5" />
                  <span>Continue with GitHub</span>
                </>
              )}
            </Button>
            <Button
              className="w-full h-11"
              variant="outline"
              onClick={() => handleLogin("google")}
              disabled={isLoading !== null}
            >
              {isLoading === "google" ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <FcGoogle className="mr-2 h-5 w-5" />
                  <span>Continue with Google</span>
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            <Separator />
            <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                <span>Write notes & ideas</span>
              </div>
              <div className="flex items-start gap-2">
                <Code2 className="h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                <span>Store code snippets</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our{" "}
              <Link href="#" className="underline hover:text-foreground transition-colors">
                Terms and Conditions
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
