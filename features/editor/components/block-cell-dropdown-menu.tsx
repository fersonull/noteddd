"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import { Ellipsis, ArrowLeftRight, FileCodeCorner } from "lucide-react";
import type { BlockCellDropdownProps } from "@/features/editor/types";

export function BlockCellDropdownMenu({
  onChangeType,
}: BlockCellDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-4 w-4 text-muted-foreground hover:text-black"
        >
          <Ellipsis className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="font-outfit">
        <DropdownMenuItem onClick={onChangeType}>
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          Change type
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FileCodeCorner className="mr-2 h-4 w-4" />
          Change Language
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
