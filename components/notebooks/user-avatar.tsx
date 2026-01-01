import { auth } from "@/app/auth";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, LogOut, User } from "lucide-react";
import DropdownItems from "./dropdown-items";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default async function UserAvatar() {
  const session = await auth();
  console.log(session?.user?.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full h-10 w-10">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={session?.user?.image || ""}
                alt={session?.user?.name || ""}
              />
              <AvatarFallback>
                {session?.user?.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>

          <div className="pointer-events-none">
            <p className="text-xs text-muted-foreground">signed in as</p>
            <p>{session?.user?.email}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50 font-outfit" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownItems />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
