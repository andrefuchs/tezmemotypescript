<template>
  <div class="modal">
    <form autocomplete="off" @submit.prevent="handleMemoUpdate">
      <button @click="toggleModal" class="close-modal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
      <div class="memo-wrapper">
        <input
          required
          minlength="3"
          name="memo"
          class="form-input"
          type="text"
          placeholder="New memo..."
          v-model="new_memo"
          maxlength="200"
        />
        <small class="memo-input-count">{{ new_memo.length }}/200</small>
      </div>

      <button :class="loading && 'loading'" :disabled="new_memo === memo">Update Memo</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '../stores/store';

export default defineComponent({
  name: "UpdateMemo",
  props: {
    memo: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    toggleModal: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    // Equivalent of your data properties
    const new_memo = ref("");
    const loading = ref(false);

    // Equivalent of your mapActions
    const updateMemo = store.updateMemo;

    // Equivalent of your methods
    const handleMemoUpdate = async () => {
      loading.value = true;
      await updateMemo({ memo: new_memo.value, id: props.id });
      loading.value = false;
      props.toggleModal();
    };

    // Equivalent of your mounted lifecycle hook
    const onMounted = () => {
      new_memo.value = props.memo;
    };

    onMounted();

    return {
      new_memo,
      loading,
      handleMemoUpdate,
    };
  },
});
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: rgba(0, 0, 0, 0.851);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  > form {
    position: relative;
  }
  .close-modal {
    position: absolute;
    top: -60px;
    right: 0;
    padding: 10px;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    cursor: pointer;
    background: #fff;
    border: 1px solid #707594;
    z-index: 999;
    svg {
      width: 100%;
    }
  }

  button {
    background: #707594;
    border: none;
    color: #11152b;
    cursor: pointer;
    width: 100%;
    font-weight: 600;
    padding: 15px 20px;
    border-radius: 4px;
    margin-top: 10px;
  }
}

.memo-wrapper {
  background: #42497573;
  padding: 15px;
  padding-bottom: 10px;
  text-align: left;
  border-radius: 4px;
  max-width: 600px;
  min-width: 400px;

  @media (max-width: 576px) {
    min-width: 300px;
  }
}
</style>
