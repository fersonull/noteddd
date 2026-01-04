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
import { Ellipsis, NotebookIcon, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Notebook } from "@/lib/generated/prisma/client";
import { deleteNotebook } from "@/lib/actions/notebook";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "../ui/dropdown-menu";

type NotebookType = {
  notebooks: Notebook[];
};

export function NotebooksTable({ notebooks }: NotebookType) {
  const router = useRouter();

  const handleDelete = async (notebookId: string) => {
    try {
      await deleteNotebook(notebookId);
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
              {n.title}
            </TableCell>
            <TableCell className="text-right text-muted-foreground">
              {n.updatedAt.toLocaleDateString("en-US")}
            </TableCell>
            <TableCell className="text-right text-muted-foreground">
              12.2 KB
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
                      <DropdownMenuLabel className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide truncate max-w-40">
                        {n.title}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => console.log("Rename")}>
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
