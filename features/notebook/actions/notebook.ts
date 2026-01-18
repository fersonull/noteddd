"use server";

import prisma from "@/lib/db";
import { auth } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { nanoid } from "nanoid";
import type { GetAllNotebookResult, SaveNotebookResult } from "../types";
import { 
  ParamsSchema, 
  CreateNotebookSchema, 
  NotebookIdSchema,
  SaveNotebookSchema,
  RenameNotebookSchema 
} from "../schemas";
import { Notebook, Prisma } from "@/lib/generated/prisma/client";

export async function createNotebook(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const rawTitle = formData.get("title");
  const validation = CreateNotebookSchema.safeParse({ 
    title: rawTitle ? String(rawTitle) : undefined 
  });

  if (!validation.success) {
    throw new Error("Invalid input");
  }

  const randomID = nanoid(10);

  try {
    const notebook = await prisma.notebook.create({
      data: {
        userId: session.user.id,
        title: validation.data.title || `Untitled-${randomID}`,
        content: Prisma.JsonNull,
      },
    });

    revalidatePath("/notebooks");
    redirect(`/notebooks/${notebook.id}`);
  } catch (error) {
    console.error("Create notebook error:", error);
    throw new Error("Failed to create notebook");
  }
}

export async function getAllNotebooks(
  rawParams: unknown
): Promise<GetAllNotebookResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, data: [], error: "Unauthorized" };
  }

  const parsed = ParamsSchema.safeParse(rawParams);

  if (!parsed.success) {
    return { success: false, data: [], error: "Invalid parameters" };
  }

  const { page, limit, query } = parsed.data;
  const skip = (page - 1) * limit;

  try {
    const [notebooks, totalCount] = await Promise.all([
      prisma.notebook.findMany({
        where: {
          userId: session.user.id,
          title: query ? { contains: query, mode: "insensitive" } : undefined,
        },
        orderBy: { updatedAt: "desc" },
        take: limit,
        skip: skip,
      }),
      prisma.notebook.count({
        where: {
          userId: session.user.id,
          title: query ? { contains: query, mode: "insensitive" } : undefined,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit) || 1;

    return {
      success: true,
      data: notebooks,
      metadata: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalCount,
        hasMore: page < totalPages,
      },
    };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, data: [], error: "Failed to fetch notebooks" };
  }
}

export async function getNotebook(id: string): Promise<Notebook> {
  const session = await auth();

  if (!session?.user?.id) {
    return notFound();
  }

  const validation = NotebookIdSchema.safeParse({ id });

  if (!validation.success) {
    return notFound();
  }

  try {
    const notebook = await prisma.notebook.findFirst({
      where: {
        id: validation.data.id,
        userId: session.user.id,
      },
    });

    if (!notebook) {
      return notFound();
    }

    return notebook;
  } catch (error) {
    console.error("Get notebook error:", error);
    return notFound();
  }
}

export async function saveNotebook(
  notebookId: string,
  content: unknown
): Promise<SaveNotebookResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const validation = SaveNotebookSchema.safeParse({ notebookId, content });

  if (!validation.success) {
    return { success: false, error: "Invalid input" };
  }

  try {
    await prisma.notebook.update({
      where: {
        id: validation.data.notebookId,
        userId: session.user.id,
      },
      data: {
        content: validation.data.content as Prisma.InputJsonValue,
      },
    });

    revalidatePath(`/notebooks/${validation.data.notebookId}`);

    return { success: true };
  } catch (error) {
    console.error("Save notebook error:", error);
    return { success: false, error: "Failed to save notebook" };
  }
}

export async function deleteNotebook(notebookId: string): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const validation = NotebookIdSchema.safeParse({ id: notebookId });

  if (!validation.success) {
    throw new Error("Invalid input");
  }

  try {
    const result = await prisma.notebook.deleteMany({
      where: {
        id: validation.data.id,
        userId: session.user.id,
      },
    });

    if (result.count === 0) {
      throw new Error("Notebook not found or unauthorized");
    }

    revalidatePath("/notebooks");
  } catch (error) {
    console.error("Delete notebook error:", error);
    throw new Error("Failed to delete notebook");
  }
}

export async function renameNotebook(
  notebookId: string,
  newTitle: string
): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const validation = RenameNotebookSchema.safeParse({ notebookId, newTitle });

  if (!validation.success) {
    throw new Error("Invalid input");
  }

  try {
    await prisma.notebook.update({
      where: {
        id: validation.data.notebookId,
        userId: session.user.id,
      },
      data: {
        title: validation.data.newTitle,
      },
    });

    revalidatePath("/notebooks");
  } catch (error) {
    console.error("Rename notebook error:", error);
    throw new Error("Failed to rename notebook");
  }
}
