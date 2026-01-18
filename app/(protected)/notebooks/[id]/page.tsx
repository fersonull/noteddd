import { EditorWrapper } from "@/features/editor";
import { Header } from "@/features/editor";
import { getNotebook } from "@/features/notebook/actions/notebook";
import { Block, NotebookPageParams } from "@/features/editor/types";

export default async function NotebookPage({ params }: NotebookPageParams) {
  const { id } = await params;

  const notebook = await getNotebook(id);

  const blocks = Array.isArray(notebook.content)
    ? (notebook.content as unknown as Block[])
    : [];

  return (
    <>
      <Header title={notebook.title} />

      <main className="max-w-6xl w-full mx-auto px-4 py-8 relative">
        <EditorWrapper id={notebook.id} blocks={blocks} />
      </main>
    </>
  );
}
