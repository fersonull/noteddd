import EditorWrapper from "@/components/editor/editor-wrapper";

type ParamsType = {
  params: Promise<{ id: string }>;
};

export default async function NotebookPage({ params }: ParamsType) {
  const { id } = await params;
  console.log(id);

  return <EditorWrapper />;
}
