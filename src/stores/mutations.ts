import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'mainStore',
  state: () => ({
    pkh: null as any,
    connected: false,
    loading: false,
    activeMemo: null as any,
    doneMemo: null as any,
  }),
  actions: {
    updatePkh(pkh: any) {
      this.pkh = pkh;
    },
    updateConnected(connected: boolean) {
      this.connected = connected;
    },
    updateLoading(loading: boolean) {
      this.loading = loading;
    },
    updateActiveMemo(activeMemo: any) {
      this.activeMemo = activeMemo;
    },
    updateDoneMemo(doneMemo: any) {
      this.doneMemo = doneMemo;
    },
  },
});
