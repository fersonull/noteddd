import EditorWrapper from "@/components/editor/editor-wrapper";
import { Header } from "@/components/editor/header";
import { getNotebook } from "@/features/notebook/actions/notebook";
import { Block } from "@/lib/types";

type ParamsType = {
  params: Promise<{ id: string }>;
};

export default async function NotebookPage({ params }: ParamsType) {
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
