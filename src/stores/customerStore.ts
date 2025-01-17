import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { type CustomerType } from '@/types/customer'

// using composition setup instead of options with state|actions|getters
export const useCustomerStore = defineStore('customer', () => {
  const customers = ref<CustomerType[]>([])
  const searchQuery = ref('')

  const addCustomer = function (customer: CustomerType) {
    customers.value.push(customer)
  }

  const updateCustomer = function (index: number, customer: CustomerType) {
    customers.value[index] = customer
  }

  const deleteCustomer = function (index: number) {
    customers.value.splice(index, 1)
  }

  const filteredCustomers = computed(() => {
    const query = searchQuery.value.toLowerCase()
    if (!query) return customers.value

    return customers.value.filter(
      (customer) =>
        customer.firstName.toLowerCase().includes(query) ||
        customer.lastName.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.includes(query),
    )
  })

  const setSearchQuery = function (query: string) {
    searchQuery.value = query
  }

  return {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    setSearchQuery,
    filteredCustomers,
    searchQuery,
  }
})
