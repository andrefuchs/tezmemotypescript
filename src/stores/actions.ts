import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { ColorMode, NetworkType } from "@airgap/beacon-sdk";
import { CONTRACT_ADDRESS } from "@/utils";
import BigNumber from "bignumber.js";

const network = { type: NetworkType.GHOSTNET };

const Tezos = new TezosToolkit("https://ghostnet.tezos.marigold.dev");

const wallet = new BeaconWallet({
  name: "Tez-memo",
  preferredNetwork: network.type,
});

Tezos.setWalletProvider(wallet);

wallet.client.setColorMode(ColorMode.DARK);

const getContract = async () => await Tezos.wallet.at(CONTRACT_ADDRESS);

export default {
  async connectWallet({ dispatch }: { dispatch: Function }) {
    try {
      await wallet.requestPermissions({
        network: network,
      });
      dispatch("checkWalletConnection");
    } catch (error) {
      console.log(error);
    }
  },

  async checkWalletConnection({ commit }: { commit: Function }) {
    try {
      const activeAccount = await wallet.client.getActiveAccount();
      let pkh: string;

      if (activeAccount) {
        pkh = activeAccount.address;
        commit("updatePkh", pkh);
        commit("updateConnected", true);
      } else {
        commit("updatePkh", "");
        commit("updateConnected", false);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async disconnectWallet({ dispatch }: { dispatch: Function }) {
    await wallet.clearActiveAccount();
    dispatch("checkWalletConnection");
  },

  async getMemoList({ state, commit }: { state: any, commit: Function }) {
    commit("updateLoading", true);

    try {
      let active_memo: any[] = [];
      let done_memo: any[] = [];

      if (state.connected) {
        const contract = await getContract();
        const storage: any = await contract.storage();
        const storage_user_memos = await storage.users.get(state.pkh);

        const user_memos = storage_user_memos.map((val: any) => new BigNumber(val).toNumber());
        console.log(user_memos);

        for (let index = 0; index < user_memos.length; index++) {
          const memo = await storage.memos.get({
            owner: state.pkh,
            id: user_memos[index].toString(),
          });

          const formated_memo = { ...memo, id: new BigNumber(memo.id).toString() };

          if (!memo.done) {
            active_memo.push(formated_memo);
          } else {
            done_memo.push(formated_memo);
          }
        }
      }

      commit("updateActiveMemo", active_memo);
      commit("updateDoneMemo", done_memo);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        commit("updateLoading", false);
      }, 1000);
    }
  },

  async softUpdateMemoList({ state, commit }: { state: any, commit: Function }) {
    try {
      let active_memo: any[] = [];
      let done_memo: any[] = [];

      if (state.connected) {
        const contract = await getContract();
        const storage: any = await contract.storage();
        const storage_user_memos = await storage.users.get(state.pkh);

        const user_memos = storage_user_memos.map((val: any) => new BigNumber(val).toNumber());
        console.log(user_memos);

        for (let index = 0; index < user_memos.length; index++) {
          const memo = await storage.memos.get({
            owner: state.pkh,
            id: user_memos[index].toString(),
          });

          const formated_memo = { ...memo, id: new BigNumber(memo.id).toString() };

          if (!memo.done) {
            active_memo.push(formated_memo);
          } else {
            done_memo.push(formated_memo);
          }
        }
      }

      commit("updateActiveMemo", active_memo);
      commit("updateDoneMemo", done_memo);
    } catch (error) {
      console.log(error);
    }
  },

  async addMemo({ dispatch }: { dispatch: Function }, memo: string) {
    try {
      const contract = await getContract();
      const op = await contract.methods.addMemo(memo).send();
      await op.confirmation();
      dispatch("softUpdateMemoList");
    } catch (error) {
      console.log(error);
    }
  },

  async deleteMemo({ dispatch }: { dispatch: Function }, id: string) {
    try {
      const contract = await getContract();
      const op = await contract.methods.deleteMemo(id).send();
      await op.confirmation();
      dispatch("softUpdateMemoList");
    } catch (error) {
      console.log(error);
    }
  },

  async toggleMemoStatus({ dispatch }: { dispatch: Function }, id: string) {
    try {
      const contract = await getContract();
      const op = await contract.methods.toggleMemoStatus(id).send();
      await op.confirmation();
      dispatch("softUpdateMemoList");
    } catch (error) {
      console.log(error);
    }
  },

  async updateMemo({ dispatch }: { dispatch: Function }, payload: any) {
    try {
      const contract = await getContract();
      const op = await contract.methodsObject.updateMemo(payload).send();
      await op.confirmation();
      dispatch("softUpdateMemoList");
    } catch (error) {
      console.log(error);
    }
  },
};
