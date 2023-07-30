import { defineStore } from 'pinia';

interface State {
  pkh: string,
  connected: boolean,
  loading: boolean,
  activeMemo: any[],
  doneMemo: any[],
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
    updateActiveMemo(activeMemo: any[]) {
      this.activeMemo = activeMemo;
    },
    updateDoneMemo(doneMemo: any[]) {
      this.doneMemo = doneMemo;
    },
    // Add other actions here...
  },
});
