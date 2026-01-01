import { Button } from "../ui/button";
import UserAvatar from "./user-avatar";
import { Plus, SearchIcon } from "lucide-react";
import {
  InputGroupInput,
  InputGroup,
  InputGroupAddon,
} from "../ui/input-group";

export default async function Navbar() {
  return (
    <div className="py-3 px-6 flex items-center justify-center sticky top-0 font-sans border-b">
      <div className="flex items-center justify-between w-full">
        <UserAvatar />

        <InputGroup className="max-w-lg">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <Button variant="outline">
          <Plus />
          New notebook
        </Button>
      </div>
    </div>
  );
}
