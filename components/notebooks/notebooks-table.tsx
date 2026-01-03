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
import { NotebookIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Notebook } from "@/lib/types";

type NotebookType = {
  notebooks: Notebook[];
};

export function NotebooksTable({ notebooks }: NotebookType) {
  const router = useRouter();

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
            className="cursor-pointer"
            onClick={() => router.push(`/notebooks/${n.id}`)}
          >
            <TableCell className="font-medium flex items-center gap-2">
              <NotebookIcon size={16} className="text-muted-foreground" />
              {n.title}
            </TableCell>
            <TableCell className="text-right">
              {n.updatedAt.toLocaleString("en-us")}
            </TableCell>
            <TableCell className="text-right">12.2 KB</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
