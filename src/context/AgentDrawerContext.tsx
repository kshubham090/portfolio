import { createContext, useContext, useState, type ReactNode } from 'react';

interface AgentDrawerCtx {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Ctx = createContext<AgentDrawerCtx | null>(null);

export function AgentDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <Ctx.Provider value={{ open, setOpen }}>{children}</Ctx.Provider>;
}

export function useAgentDrawer() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAgentDrawer must be used within AgentDrawerProvider');
  return ctx;
}
