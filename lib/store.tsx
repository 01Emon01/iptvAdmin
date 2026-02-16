import { create } from "zustand";

type SidebarStore = {
  open: boolean;
  toggleOpen: () => void;
  setOpen: (value: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  open: true,
  toggleOpen: () => {
    set((state) => ({
      open: !state.open,
    }));
  },
  setOpen: (value) => set({ open: value }),
}));
