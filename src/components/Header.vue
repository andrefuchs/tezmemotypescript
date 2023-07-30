

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../stores/store'; // adjust this import path to your actual store file path
import { formatPkhString } from "../utils";

export default defineComponent({
  name: "NavHeader",
  setup() {
    let store;

try {
  store = useStore();
  // ... rest of setup
  console.log("_STORE: " + store);
  
} catch (error) {
  console.error("_ERROR STORE: " + error);
}

if (!store) {
  console.error("Store could not be initialized.");
  return; // You might want to handle this situation differently.
}

    // Equivalent of your mapGetters
    const getPkh = store.getPkh;
    const getConnected = store.getConnected;

    // Equivalent of your mapActions
    const connectWallet = store.connectWallet;
    const disconnectWallet = store.disconnectWallet;

    // Equivalent of your methods
    const connect = () => {
      connectWallet();
    };
    const disconnect = () => {
      disconnectWallet();
    };
    const formatAddress = (pkh: string) => {
      return formatPkhString(pkh);
    };

    return {
      getPkh,
      getConnected,
      connect,
      disconnect,
      formatAddress,
    };
  },
});
</script>

<template>
  <nav>


    <div>
      <button v-if="getConnected" @click="disconnect" class="is-connected">
        {{ formatAddress(getPkh) }}
      </button>
      <button v-else @click="connect">Connect Wallet</button>
    </div>
  </nav>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
nav {
  padding: 20px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #424975;

  .logo {
    max-width: 150px;
    img {
      width: 100%;
    }
  }

  button {
    background: #11152b;
    color: rgb(211, 211, 211);
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;

    &.is-connected{
      font-size: 18px;
    }
  }
}
</style>
