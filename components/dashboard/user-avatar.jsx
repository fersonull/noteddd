import { auth } from "@/app/auth";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, User } from "lucide-react";

export default async function UserAvatar() {
  const session = await auth();
  return (
    // <div className="flex items-center gap-3 font-sans">
    //   {/* user avatart */}
    //   <div className="overflow-hidden rounded-full w-10 h-10 relative bg-gray-200 border-2 border-foreground">
    //     {session?.user?.image ? (
    //       <Image
    //         src={session.user.image}
    //         className="object-cover"
    //         alt="User Avatar"
    //         width={100}
    //         height={100}
    //       />
    //     ) : (
    //       <div className="flex items-center justify-center h-full text-xl font-bold text-gray-500">
    //         {session?.user?.name?.[0] || "?"}
    //       </div>
    //     )}
    //   </div>

    //   {/* user name */}
    //   <div className="flex flex-col leading-2">
    //     <p className="text-muted-foreground">signed in as</p>
    //     <p className="text-2xl font-semibold">{session.user.name}</p>
    //   </div>
    // </div>

    // name and dropdown only
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User />
          <span>
            <p className="font-sans">{session.user.email}</p>
          </span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50 font-sans" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            My Account
          </DropdownMenuLabel>
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem>
            <User strokeWidth={2.4} />
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
