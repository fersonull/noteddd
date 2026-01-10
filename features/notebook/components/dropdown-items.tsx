"use client";

import { logout } from "@/features/auth/index";
import { DropdownMenuItem } from "../../../components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export function DropdownItems() {
  const dropdownItems = [
    { name: "Profile", icon: User, action: () => {} },
    { name: "Logout", icon: LogOut, action: () => logout("/login") },
  ];

  return dropdownItems.map(({ name, icon: Icon, action }, ind) => (
    <DropdownMenuItem key={ind} onClick={action}>
      <Icon />
      {name}
    </DropdownMenuItem>
  ));
}
