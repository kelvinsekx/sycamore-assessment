<script setup lang="ts">
// store
import { useCustomerStore } from '../../stores/customerStore'
import CardModalComponent from '../CardModalComponent.vue'

const props = defineProps({
  showing: {
    type: Boolean,
    default: false,
  },
  toggleModal: {
    type: Function,
  },
  index: {
    type: Number,
    required: true,
  },
})

const customersStore = useCustomerStore()
</script>
<template>
  <CardModalComponent :showing="showing" @toggle-modal="toggleModal">
    <div>
      <h1 class="text-4xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-7 text-red-800"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
          />
        </svg>
        Dangerous & Irreversible
      </h1>
      <p>This action would delete item with index {{ props.index }}</p>
      <div class="flex items-center gap-2 mt-2">
        <button
          class="bg-red-100 text-red-700 px-3 py-1 rounded-sm"
          @click="
            () => {
              customersStore.deleteCustomer(index)
              alsert(index)
              toggleModal()
            }
          "
        >
          Delete
        </button>
        <button class="bg-slate-200 text-slate-700 px-3 py-1 rounded-sm" @click="toggleModal">
          Cancel
        </button>
      </div>
    </div>
  </CardModalComponent>
</template>
