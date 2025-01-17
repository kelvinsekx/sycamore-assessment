<script setup lang="ts">
import { CustomerType } from '@/types/customer'

defineProps({
  customers: {
    type: Array<CustomerType>,
  },
  activeIndex: {
    type: Number,
  },
})

// for humans: pardon all these messy emits. The fact that vue's props can't take a callback is horrible
const emits = defineEmits([
  'togglePromptBeforeDeleteModal',
  'toggleOtherActions',
  'toggleUpdateModal',
])
const emitPromptToDelete = () => emits('togglePromptBeforeDeleteModal')
const emitToggleOtherActions = (index: number) => emits('toggleOtherActions', { index })
const emitToggleUpdateModal = (index: number) => emits('toggleUpdateModal', { index })
</script>
<template>
  <tr class="sekx_tr bg-white" v-for="(customer, index) in customers" :key="customer.firstName">
    <td class="border-b text-xs">
      <div>
        <p class="whitespace-no-wrap font-semibold">{{ customer.firstName }}</p>
        <p class="text-gray-400 text-xs whitespace-no-wrap">{{ customer.email }}</p>
      </div>
    </td>
    <td class="border-b text-xs">
      <p class="text-gray-900 whitespace-no-wrap">{{ customer.lastName }}</p>
    </td>
    <td class="border-b text-xs">
      <p class="text-gray-900 whitespace-no-wrap">{{ customer.phone }}</p>
    </td>
    <td class="border-b text-xs">
      <p class="text-gray-900 whitespace-no-wrap">{{ customer.state }}</p>
    </td>
    <td class="border-b text-xs">
      <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
        <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
        <span class="relative">{{ customer.status ? 'Active' : 'In-Active' }}</span>
      </span>
    </td>
    <td class="border-b text-xs">
      <span
        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight underline cursor-pointer"
        @click="emitToggleUpdateModal(index)"
      >
        View Details
      </span>
    </td>
    <td class="border-b text-sm text-right relative">
      <div v-show="index == activeIndex" class="absolute -left-7">
        <ul>
          <li>
            <button class="bg-red-100 text-red-700" @click="emitPromptToDelete">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 inline-block py-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              delete
            </button>
          </li>
          <li>
            <button class="bg-slate-200 text-slate-700" @click="emitToggleUpdateModal(index)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 inline-block py-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              update
            </button>
          </li>
        </ul>
      </div>
      <button
        type="button"
        class="inline-block text-gray-500 hover:text-gray-700"
        @click="emitToggleOtherActions(index)"
      >
        <svg class="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path
            d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
          />
        </svg>
      </button>
    </td>
  </tr>
</template>

<style scoped>
.sekx_tr td {
  padding: 10px 20px;
  font-weight: bold;
}
</style>
