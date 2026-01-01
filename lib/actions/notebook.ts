"use server";

import { auth } from "@/app/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function createNotebook() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const notebook = await prisma.notebook.create({
    data: {
      userId: session.user.id,
      title: "Untitled Notebook",
      content: [], // Start empty
    },
  });

  redirect(`/notebook/${notebook.id}`);
}
