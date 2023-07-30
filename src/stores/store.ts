// store.ts
import { defineStore } from 'pinia';

interface State {
  pkh: string;
  connected: boolean;
  loading: boolean;
  activeMemo: Array<{id: string, memo: string, done: boolean, time: string}>;
  doneMemo: Array<{id: string, memo: string, done: boolean, time: string}>;
}

export const useStore = defineStore('main', {
  state: (): State => ({
    pkh: '',
    connected: false,
    loading: false,
    activeMemo: [],
    doneMemo: [],
  }),

  getters: {
    getPkh(state) {
      return state.pkh;
    },
    getConnected(state) {
      return state.connected;
    },
    getLoading(state) {
      return state.loading;
    },
    getActiveMemo(state) {
      return state.activeMemo;
    },
    getDoneMemo(state) {
      return state.doneMemo;
    },
  },

  actions: {
    updatePkh(pkh: string) {
      this.pkh = pkh;
    },
    updateConnected(connected: boolean) {
      this.connected = connected;
    },
    updateLoading(loading: boolean) {
      this.loading = loading;
    },
    updateActiveMemo(activeMemo: Array<{id: string, memo: string, done: boolean, time: string}>) {
      this.activeMemo = activeMemo;
    },
    updateDoneMemo(doneMemo: Array<{id: string, memo: string, done: boolean, time: string}>) {
      this.doneMemo = doneMemo;
    },
    // Add other actions here...
  },
});
