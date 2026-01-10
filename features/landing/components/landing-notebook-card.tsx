export function LandingNotebookCard() {
  return (
    <div className="rounded shadow border rotate-3 min-w-lg">
      <div className="p-2 border-b  text-center">
        <p className="font-medium">Programming 101</p>
      </div>
      <div className="py-3 px-4 h-full w-full min-h-44 max-w-lg space-y-4">
        <div>
          <p className="text-xs">
            A conditional statement is a programming construct that lets a
            program make decisions by executing different code depending on
            whether a condition is true or false.
          </p>
        </div>
        <div className="rounded bg-accent-foreground p-2 font-mono">
          <pre>
            <code className="text-background text-xs">
              if (condition) {"{"}
              <br />
              {"  // runs when condition is true"}
              <br />
              {"}"} else {"{"}
              <br />
              {"  // runs when condition is false"}
              <br />
              {"}"}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
