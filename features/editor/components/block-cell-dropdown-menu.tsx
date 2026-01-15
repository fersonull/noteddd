"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import { Ellipsis, ArrowLeftRight, FileCodeCorner, Check } from "lucide-react";
import type { BlockCellDropdownProps } from "@/features/editor/types";

const AVAILABLE_LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
];

export function BlockCellDropdownMenu({
  blockType,
  currentLanguage = "javascript",
  onChangeType,
  onChangeLanguage,
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
        
        {blockType === "code" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <FileCodeCorner className="mr-2 h-4 w-4" />
                Change Language
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {AVAILABLE_LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang.value}
                    onClick={() => onChangeLanguage(lang.value)}
                  >
                    {currentLanguage === lang.value && (
                      <Check className="mr-2 h-4 w-4" />
                    )}
                    <span className={currentLanguage !== lang.value ? "ml-6" : ""}>
                      {lang.label}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
