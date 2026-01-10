import { Button } from "../../../components/ui/button";
import { Check, FilePlusCorner } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../components/ui/popover";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { createNotebook } from "@/features/notebook/actions/notebook";

export function NotebooksTableAction() {
  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm">
            <FilePlusCorner />
            <p className="text-sm">Create new</p>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={createNotebook} className="grid gap-4 font-outfit">
            <div>
              <Label>New Notebook</Label>
              <p className="text-sm text-muted-foreground"></p>
            </div>
            <Input
              name="title"
              placeholder="Untitled"
              className="flex-1 me-1"
            />
            <Button>
              <Check />
              Create
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
