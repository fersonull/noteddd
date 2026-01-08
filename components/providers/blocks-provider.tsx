import { createContext, useState } from "react";
import { Block } from "@/lib/types";

type BlocksContextType = {
  blocks: Block[] | undefined;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
};

const BlocksContext = createContext<BlocksContextType | undefined>(undefined);

export default function BlocksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const addBlock = () => {};

  return (
    <BlocksContext.Provider value={{ blocks, setBlocks }}>
      {children}
    </BlocksContext.Provider>
  );
}
