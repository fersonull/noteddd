import { Button } from "../ui/button";
import UserAvatar from "./user-avatar";
import { Menu } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";

export default async function Navbar() {
  return (
    <div className="py-3 px-6 flex items-center justify-center sticky top-0 font-sans">
      <div className="flex items-center justify-between w-full">
        <SidebarTrigger />

        <p className="font-sans font-medium">OOP: A Quick Guide</p>

        <UserAvatar />
      </div>
    </div>
  );
}
