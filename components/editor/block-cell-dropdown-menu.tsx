"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis, ArrowLeftRight, FileCodeCorner } from "lucide-react";

type DropdownPropsType = {
  onChangeType: () => void;
};

export default function BlockCellDropdownMenu({
  onChangeType,
}: DropdownPropsType) {
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
          <ArrowLeftRight />
          change type
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FileCodeCorner />
          change language
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
