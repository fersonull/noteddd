import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center h-dvh font-sans">
      <div className="w-full max-w-xl">
        <p className="font-mono uppercase font-semibold mb-10">
          {process.env.NEXT_PUBLIC_APP_NAME || "??"}
        </p>
        <p className="font-semibold text-3xl">
          Login with your account, and start creating your first notebook.
        </p>

        <Separator className="mt-10 mb-6" />
        <div className="flex flex-col items-start justify-center gap-4">
          <Button variant="outline">
            <FaGithub />
            <span>Continue with Github</span>
          </Button>
          <Button variant="outline">
            <FcGoogle />
            <span>Continue with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
