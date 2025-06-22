import { create } from 'zustand';

export const useClientStore = create((set) => ({
  client: null,
  setClient: (client) => set({ client }),
}));
