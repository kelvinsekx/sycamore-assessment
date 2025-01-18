<script setup lang="ts">
import { ref } from 'vue'
/** components__imports */
import AddNewCustomer from './components/Modals/AddNewCustomer.vue'
import UpdateExistingCustomer from './components/Modals/UpdateExistingCustomer.vue'
import PromptBeforeDelete from './components/Modals/PromptBeforeDelete.vue'
import BreadCrumb from './components/BreadCrumb.vue'
import SearchComponent from './components/SearchComponent.vue'
/** store__imports */
import { useCustomerStore } from './stores/customerStore'
import TableRowComponent from './components/TableRowComponent.vue'

const tableHeaderLabels = ['Last name', 'Phone Number', 'State(Nigeria)', 'Status', 'Details']

/** Add New Customers */
const showModal = ref(false)
const toggleModal = () => (showModal.value = !showModal.value)

/** Delete Customer */
const showPromptBeforeDeleteModal = ref(false)
const togglePromptBeforeDeleteModal = () => {
  showPromptBeforeDeleteModal.value = !showPromptBeforeDeleteModal.value
}

/** Update Customer */
const showUpdateModal = ref(false)
const toggleUpdateModal = ({ index }: { index: number }) => {
  activeTableDataIndex.value = index // I'm sorry, but we need to do this here too.
  showUpdateModal.value = !showUpdateModal.value
}

/** Keep track of selected row */
const activeTableDataIndex = ref() // default is intentionally null to show no row has been selected
const toggleOtherActions = ({ index }: { index: number }) => {
  activeTableDataIndex.value = index
}

/** Pinia Store */
const customersStore = useCustomerStore()
</script>

<template>
  <div class="container mx-auto py-10 relative max-w-4xl">
    <!-- all the modals used on this page -->
    <AddNewCustomer :showing="showModal" :toggleModal="toggleModal" @toggle-modal="toggleModal" />
    <UpdateExistingCustomer
      :index="activeTableDataIndex"
      :showing="showUpdateModal"
      @toggle-modal="toggleUpdateModal"
    />
    <PromptBeforeDelete
      :index="activeTableDataIndex"
      :showing="showPromptBeforeDeleteModal"
      @toggle-modal="togglePromptBeforeDeleteModal"
    />
    <!-- modals list ended -->

    <BreadCrumb @toggle-modal="toggleModal" />
    <div class="mt-10 bg-white rounded-lg border-gray-200 border">
      <div
        class="flex flex-col max-md:gap-4 max-md:px-4 md:flex-row justify-between items-center px-8 py-6"
      >
        <span class="text-2xl font-semibold">Customer List</span>
        <SearchComponent />
      </div>
      <div class="max-w-full max-md:overflow-x-scroll">
        <table class="min-w-full leading-normal">
          <thead class="">
            <tr class="border-gray-200 border-t border-b bg-white uppercase text-xs text-gray-600">
              <th class="px-5 py-3 font-semibold border-gray-200 text-left no-shrink">
                First Name - Email
              </th>
              <th
                class="px-5 py-3 font-semibold border-gray-200 text-left no-shrink"
                v-for="label in tableHeaderLabels"
                :key="label"
              >
                {{ label }}
              </th>
              <th class="px-5 py-3 border-gray-200"></th>
            </tr>
          </thead>
          <tbody>
            <template v-if="!customersStore.searchQuery">
              <TableRowComponent
                :customers="customersStore.customers"
                @toggle-prompt-before-delete-modal="togglePromptBeforeDeleteModal"
                @toggle-other-actions="toggleOtherActions"
                @toggle-update-modal="toggleUpdateModal"
                :active-index="activeTableDataIndex"
              />
            </template>
            <template v-else>
              <TableRowComponent
                :customers="customersStore.filteredCustomers"
                @toggle-prompt-before-delete-modal="togglePromptBeforeDeleteModal"
                @toggle-other-actions="toggleOtherActions"
                @toggle-update-modal="toggleUpdateModal"
                :active-index="activeTableDataIndex"
              />
            </template>
          </tbody>
        </table>
        <template
          v-if="customersStore.customers.length < 1 || customersStore.filteredCustomers.length < 1"
        >
          <p class="text-center pl-5 text-base font-semibold">No data</p>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-shrink {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
