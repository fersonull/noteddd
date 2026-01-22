import { Code2, FileText } from "lucide-react";

export function LandingNotebookCard() {
  return (
    <div className="relative">
      <div className="rounded-xl border bg-card rotate-3 min-w-lg max-w-xl transform transition-transform hover:rotate-1 hover:scale-105 duration-300">
        <div className="p-4 border-b bg-muted/30 flex items-center gap-2 rounded-t-xl">
          <FileText className="h-4 w-4 text-primary" />
          <p className="font-semibold text-sm">Programming 101</p>
        </div>
        <div className="py-6 px-5 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium uppercase tracking-wider">
              <div className="h-px flex-1 bg-border" />
              <span>Text Block</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A conditional statement is a programming construct that lets a
              program make decisions by executing different code depending on
              whether a condition is true or false.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium uppercase tracking-wider">
              <div className="h-px flex-1 bg-border" />
              <Code2 className="h-3 w-3" />
              <span>Code Block</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="rounded-lg bg-accent-foreground p-4 font-mono border border-primary/20 shadow-inner">
              <pre>
                <code className="text-background text-xs leading-relaxed">
                  <span className="text-primary-foreground/60">if</span>{" "}
                  (condition) {"{"}
                  <br />
                  {"  "}
                  <span className="text-primary-foreground/70">
                    // runs when condition is true
                  </span>
                  <br />
                  {"}"} <span className="text-primary-foreground/60">else</span>{" "}
                  {"{"}
                  <br />
                  {"  "}
                  <span className="text-primary-foreground/70">
                    // runs when condition is false
                  </span>
                  <br />
                  {"}"}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
