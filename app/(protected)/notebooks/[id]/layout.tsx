export default function NotebookPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <main>{children}</main>
    </div>
  );
}
