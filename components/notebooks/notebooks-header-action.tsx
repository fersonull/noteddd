import { Button } from "../ui/button";
import { Check, Plus } from "lucide-react";
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
            <Plus />
            <p className="text-sm">create new</p>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={createNotebook} className="grid gap-4 font-outfit">
            <Label>Notebook title</Label>
            <Input
              name="title"
              placeholder="Add title here..."
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
