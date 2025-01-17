<script setup lang="ts">
import AddNewCustomer from './components/Modals/AddNewCustomer.vue'
import UpdateExistingCustomer from './components/Modals/UpdateExistingCustomer.vue'
import PromptBeforeDelete from './components/Modals/PromptBeforeDelete.vue'
import BreadCrumb from './components/BreadCrumb.vue'
import SekxInputComponent from './components/SekxInputComponent.vue'
import { ref } from 'vue'

// store
import { useCustomerStore } from './stores/customerStore'

const tableHeaderLabels = ['Last name', 'Phone Number', 'State(Nigeria)', 'Status', 'Details']

const showModal = ref(false)
const showPromptBeforeDeleteModal = ref(false)
const showUpdateModal = ref(false)
const activeTableDataIndex = ref()

// store
const customersStore = useCustomerStore()

// modal
const toggleModal = () => (showModal.value = !showModal.value)
const toggleUpdateModal = (index) => {
  showUpdateModal.value = !showUpdateModal.value
  activeTableDataIndex.value = index
}
const toggleOtherActions = (index) => {
  if (activeTableDataIndex.value == index) {
    activeTableDataIndex.value = null
  } else {
    activeTableDataIndex.value = index
  }
}
const togglePromptBeforeDeleteModal = (index) => {
  showPromptBeforeDeleteModal.value = !showPromptBeforeDeleteModal.value
  activeTableDataIndex.value = index
}
</script>

<template>
  <div class="container mx-auto py-10 relative">
    <!-- all the modals used on this page -->
    <AddNewCustomer :showing="showModal" :toggleModal="toggleModal" @toggle-modal="toggleModal" />
    <UpdateExistingCustomer
      :index="activeTableDataIndex"
      :showing="showUpdateModal"
      :toggleModal="toggleUpdateModal"
    />
    <PromptBeforeDelete
      :index="activeTableDataIndex"
      :showing="showPromptBeforeDeleteModal"
      :toggleModal="togglePromptBeforeDeleteModal"
    />
    <!-- modals list ended -->
    <BreadCrumb @toggle-modal="toggleModal" />
    <div class="mt-10 bg-white rounded-lg border-gray-200 border">
      <div class="w-full flex justify-between items-center px-8 py-6">
        <span class="text-2xl font-semibold">Customer List</span>
        <SekxInputComponent />
      </div>
      <table class="min-w-full leading-normal">
        <thead class="">
          <tr class="border-gray-200 border-t border-b bg-white uppercase text-xs text-gray-600">
            <th class="px-5 py-3 font-semibold border-gray-200 text-left">First Name - Email</th>
            <th
              class="px-5 py-3 font-semibold border-gray-200 text-left"
              v-for="label in tableHeaderLabels"
              :key="label"
            >
              {{ label }}
            </th>
            <th class="px-5 py-3 border-gray-200"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="sekx_tr"
            v-for="(customer, index) in customersStore.customers"
            :key="customer.firstName"
          >
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
              <span
                class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
              >
                <span
                  aria-hidden
                  class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                ></span>
                <span class="relative">{{ status ? 'Active' : 'In-Active' }}</span>
              </span>
            </td>
            <td class="border-b text-xs">
              <span
                class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight underline"
              >
                View Details
              </span>
            </td>
            <td class="border-b text-sm text-right relative">
              <div v-show="index == activeTableDataIndex" class="absolute -left-7">
                <ul>
                  <li>
                    <button
                      class="bg-red-100 text-red-700"
                      @click="togglePromptBeforeDeleteModal(index)"
                    >
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
                    <button class="bg-slate-200 text-slate-700" @click="toggleUpdateModal(index)">
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
                @click="toggleOtherActions(index)"
              >
                <svg class="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path
                    d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.sekx_tr td {
  padding: 10px 20px;
  font-weight: bold;
}
</style>
