"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export function NotebooksTableAction() {
  return (
    <div className="flex items-center">
      <Button size="sm" variant="outline" asChild>
        <Link href="">
          <Plus />
          <p className="text-sm">create new</p>
        </Link>
      </Button>
    </div>
  );
}
