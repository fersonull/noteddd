"use client";

import { logout } from "@/lib/actions/auth";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export default function DropdownItems() {
  const dropdownItems = [
    { name: "Profie", icon: User, action: () => {} },
    { name: "Logout", icon: LogOut, action: () => logout("/login") },
  ];

  return dropdownItems.map(({ name, icon: Icon, action }, ind) => (
    <DropdownMenuItem key={ind} onClick={action}>
      <Icon />
      {name}
    </DropdownMenuItem>
  ));
}
