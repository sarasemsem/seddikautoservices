import { create } from 'zustand';

export const useItemStore = create((set) => ({
  item: null,
  setItem: (item) => set({ item }),
}));

export const useServiceStore = create((set) => ({
  service: null,
  setService: (service) => set({ service }),
}));

export const useClientStore = create((set) => ({
  client: null,
  setClient: (client) => set({ client }),
}));
