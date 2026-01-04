"use server";

import { auth } from "@/app/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { nanoid } from "nanoid";

export async function createNotebook(formData: FormData) {
  const session = await auth();
  const rawTitle = formData.get("title") as string;

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const randomID = nanoid(10);

  const notebook = await prisma.notebook.create({
    data: {
      userId: session.user.id,
      title: rawTitle || `Untitled-${randomID}`,
      content: [], // Start empty
    },
  });

  revalidatePath("/notebooks");
  redirect(`/notebooks/${notebook.id}`);
}

export async function getAllNotebooks() {
  const session = await auth();

  const notebooks = await prisma.notebook.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return notebooks;
}

export async function getNotebook(id: string) {
  const session = await auth();

  const notebook = await prisma.notebook.findFirst({
    where: {
      id,
      userId: session?.user?.id,
    },
  });

  if (!notebook) {
    // If this returns null, it means either:
    // 1. The notebook doesn't exist
    // 2. The notebook exists, but belongs to someone else (Access Denied)
    return notFound();
  }

  return notebook;
}

export async function saveNotebook(notebookId: string, content: any) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.notebook.update({
      where: {
        id: notebookId,
        userId: session?.user?.id,
      },
      data: {
        content,
      },
    });

    revalidatePath(`/notebooks/${notebookId}`);

    return { success: true };
  } catch (error) {
    console.error("Save error:", error);
    return { success: false, error: "Failed to save to database" };
  }
}

export async function deleteNotebook(notebookId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const result = await prisma.notebook.deleteMany({
    where: {
      id: notebookId,
      userId: session.user?.id,
    },
  });

  if (result.count === 0) {
    throw new Error("Failed to delete. You might not own this file.");
  }

  revalidatePath("/notebooks");
}
