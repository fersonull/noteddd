import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginAuthError() {
  return (
    <div className="flex items-center justify-center min-h-screen font-outfit w-full bg-gradient-to-br from-background via-background to-destructive/5">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-card border rounded-2xl shadow-xl p-8 space-y-6 text-center">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-destructive/10 border-2 border-destructive/20">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-bold text-2xl tracking-tight">
              Authentication Error
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We encountered an issue while trying to sign you in. This could be due to:
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2 text-sm text-muted-foreground">
            <p>• Network connectivity issues</p>
            <p>• Invalid authentication credentials</p>
            <p>• Temporary service interruption</p>
          </div>

          <div className="space-y-3 pt-2">
            <Button asChild className="w-full">
              <Link href="/login">
                Try again
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to home
              </Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            If this problem persists, please contact support
          </p>
        </div>
      </div>
    </div>
  );
}
