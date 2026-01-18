"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Ellipsis, FileText, Pencil, Trash2, X } from "lucide-react";
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
} from "../../../components/ui/dropdown-menu";
import { timeAgo } from "@/lib/utils";
import { useState } from "react";
import type { Notebooks } from "../types";
import { Input } from "@/components/ui/input";

export function NotebooksTable({ notebooks }: Notebooks) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (notebookId: string) => {
    if (!confirm("Are you sure you want to delete this notebook? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(notebookId);
    try {
      await deleteNotebook(notebookId);
    } catch (error) {
      console.error(error);
      setIsDeleting(null);
      alert("Failed to delete notebook. Please try again.");
    }
  };

  const handleRename = async (id: string) => {
    if (!newTitle.trim()) {
      setEditingId(null);
      return;
    }

    try {
      await renameNotebook(id, newTitle);
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50%]">Name</TableHead>
          <TableHead className="hidden md:table-cell">Last modified</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notebooks.map((n) => (
          <TableRow
            key={n.id}
            className={`cursor-pointer transition-colors ${
              isDeleting === n.id ? "opacity-50 pointer-events-none" : "hover:bg-muted/50"
            }`}
            onClick={() => router.push(`/notebooks/${n.id}`)}
          >
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 p-2 rounded-md bg-primary/10">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                {editingId === n.id ? (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 flex-1"
                  >
                    <Input
                      autoFocus
                      type="text"
                      defaultValue={n.title}
                      onChange={(e) => setNewTitle(e.target.value || n.title)}
                      className="h-8"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRename(n.id);
                        if (e.key === "Escape") setEditingId(null);
                      }}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 flex-shrink-0"
                      onClick={() => handleRename(n.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 flex-shrink-0"
                      onClick={() => setEditingId(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <span className="truncate">{n.title}</span>
                )}
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
              {timeAgo(n.updatedAt.toString())}
            </TableCell>

            <TableCell className="text-right">
              <div onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Ellipsis className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel className="font-medium text-xs truncate">
                      {n.title}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setEditingId(n.id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive focus:bg-destructive/10"
                      onClick={() => handleDelete(n.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
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
