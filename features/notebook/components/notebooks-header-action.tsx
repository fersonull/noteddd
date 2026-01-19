import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
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
    <Popover>
      <PopoverTrigger asChild>
        <Button size="default" className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Create notebook</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <form action={createNotebook} className="grid gap-4 font-outfit">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Create New Notebook</h4>
            <p className="text-xs text-muted-foreground">
              Give your notebook a name or leave it blank for an auto-generated title.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm">
              Notebook title <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., My Learning Notes"
              className="h-10"
            />
          </div>
          <Button type="submit" className="w-full">
            Create notebook
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
