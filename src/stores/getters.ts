import { defineStore } from 'pinia';

interface MainStoreState {
  pkh: any | null;
  connected: boolean;
  loading: boolean;
  activeMemo: any | null;
  doneMemo: any | null;
}

export const useStore = defineStore({
  id: 'mainStore',
  state: (): MainStoreState => ({
    pkh: null,
    connected: false,
    loading: false,
    activeMemo: null,
    doneMemo: null,
  }),
  getters: {
    getPkh(): MainStoreState['pkh'] {
      return this.pkh;
    },
    getConnected(): boolean {
      return this.connected;
    },
    getLoading(): boolean {
      return this.loading;
    },
    getActiveMemo(): MainStoreState['activeMemo'] {
      return this.activeMemo;
    },
    getDoneMemo(): MainStoreState['doneMemo'] {
      return this.doneMemo;
    },
  },
  actions: {
    updatePkh(pkh: MainStoreState['pkh']) {
      this.pkh = pkh;
    },
    updateConnected(connected: boolean) {
      this.connected = connected;
    },
    updateLoading(loading: boolean) {
      this.loading = loading;
    },
    updateActiveMemo(activeMemo: MainStoreState['activeMemo']) {
      this.activeMemo = activeMemo;
    },
    updateDoneMemo(doneMemo: MainStoreState['doneMemo']) {
      this.doneMemo = doneMemo;
    },
  },
});