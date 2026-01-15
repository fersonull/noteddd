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
import {
  MoreVertical,
  ArrowLeftRight,
  FileCodeCorner,
  Check,
  Trash2,
} from "lucide-react";
import type { BlockCellDropdownProps } from "@/features/editor/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaJsSquare, FaPython } from "react-icons/fa";

const AVAILABLE_LANGUAGES = [
  { value: "javascript", label: "JavaScript", icon: FaJsSquare },
  { value: "python", label: "Python", icon: FaPython },
];

export function BlockCellDropdownMenu({
  blockType,
  currentLanguage = "javascript",
  onChangeType,
  onChangeLanguage,
  onDelete,
}: BlockCellDropdownProps) {
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Block options</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="end" className="font-outfit w-48">
        <DropdownMenuItem onClick={onChangeType} className="cursor-pointer">
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          <span>Change type</span>
        </DropdownMenuItem>

        {blockType === "code" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer">
                <FileCodeCorner className="mr-2 h-4 w-4" />
                <span>Change Language</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-44">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Select Language
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {AVAILABLE_LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang.value}
                    onClick={() => onChangeLanguage(lang.value)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          <lang.icon />
                        </span>
                        <span>{lang.label}</span>
                      </div>
                      {currentLanguage === lang.value && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onDelete}
          className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete block</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
