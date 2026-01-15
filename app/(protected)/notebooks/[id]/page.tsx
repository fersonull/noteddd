import { EditorWrapper } from "@/features/editor";
import { Header } from "@/features/editor";
import { getNotebook } from "@/features/notebook/actions/notebook";
import { Block, NotebookPageParams } from "@/features/editor/types";

export default async function NotebookPage({ params }: NotebookPageParams) {
  const { id } = await params;
  console.log(id);

  const notebook = await getNotebook(id);
  console.log(notebook);

  const blocks = Array.isArray(notebook.content)
    ? (notebook.content as unknown as Block[])
    : [];

  return (
    <>
      <Header title={notebook.title} />

      <main className="max-w-6xl w-full mx-auto relative">
        <EditorWrapper id={notebook.id} blocks={blocks} />
      </main>
    </>
  );
}
