import { Button } from "../ui/button";
import { Check, FilePlusCorner } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { createNotebook } from "@/lib/actions/notebook";

export function NotebooksTableAction() {
  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline">
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
