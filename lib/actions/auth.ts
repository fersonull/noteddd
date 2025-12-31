"use server";

import { signIn, signOut } from "@/app/auth";

export const login = async (provider: string, to: string) => {
  await signIn(provider, { redirectTo: to });
};

export const logout = async (to: string) => {
  await signOut({ redirectTo: to });
};
