"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";

export function Header({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center border-b py-2">
      <div className="max-w-6xl flex items-center justify-between w-full">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>

        <p className="font-semibold">{title}</p>

        <div />
      </div>
    </div>
  );
}
