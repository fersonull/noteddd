"use server";

import prisma from "@/lib/db";
import { auth } from "@/app/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { Block } from "../../../lib/types";

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
      title: rawTitle || `Untitled-${randomID}`, // Random name if empty
      content: [], // Start empty
    },
  });

  revalidatePath("/notebooks");
  redirect(`/notebooks/${notebook.id}`);
}

export async function getAllNotebooks(rawParams: unknown) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const ParamsSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(12),
    query: z.string().optional().default(""),
  });
  // 2. Parse the params. If 'limit' is missing, it defaults to 12.
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
        // 3. Now guaranteed to be valid integers
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
    console.error("Database Error:", error);
    return { success: false, data: [], error: "Failed to fetch notebooks" };
  }
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

export async function saveNotebook(notebookId: string, content: Block[]) {
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
        content: content as any,
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
