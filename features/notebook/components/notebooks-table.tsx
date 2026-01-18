"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Ellipsis, NotebookIcon, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  deleteNotebook,
  renameNotebook,
} from "@/features/notebook/actions/notebook";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "../../../components/ui/dropdown-menu";
import { timeAgo } from "@/lib/utils";
import { useState } from "react";
import type { Notebooks } from "../types";

export function NotebooksTable({ notebooks }: Notebooks) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const router = useRouter();

  const handleDelete = async (notebookId: string) => {
    try {
      await deleteNotebook(notebookId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRename = async (id: string) => {
    try {
      await renameNotebook(id, newTitle);

      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Table>
      <TableCaption>A list of your notebooks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Title</TableHead>
          <TableHead className="text-right">Last modified</TableHead>
          <TableHead className="text-right">File size</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notebooks.map((n) => (
          <TableRow
            key={n.id}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => router.push(`/notebooks/${n.id}`)}
          >
            <TableCell className="font-medium flex items-center gap-2">
              <NotebookIcon size={16} className="text-muted-foreground" />
              {editingId === n.id ? (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2"
                >
                  <input
                    autoFocus
                    type="text"
                    defaultValue={n.title}
                    onChange={(e) => setNewTitle(e.target.value || n.title)}
                    className="ring ring-muted-foreground py-1 px-3 rounded-sm"
                  />

                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => handleRename(n.id)}
                  >
                    <Check size={14} />
                  </Button>
                </div>
              ) : (
                n.title
              )}
            </TableCell>
            <TableCell className="text-right text-muted-foreground">
              {timeAgo(n.updatedAt.toString())}
            </TableCell>
            <TableCell className="text-right text-muted-foreground">
              12.2 KB {/* Add a helper to calculate size */}
            </TableCell>

            <TableCell className="text-right w-12.5 p-0 pr-4">
              <div onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Ellipsis className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="font-outfit">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className=" font-medium text-muted-foreground tracking-wide truncate max-w-40">
                        {n.title}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setEditingId(n.id)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        onClick={() => handleDelete(n.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
