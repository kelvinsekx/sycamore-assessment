import { defineStore } from 'pinia'
import { ref } from 'vue'

import { type CustomerType } from '@/types/customer'

// using composition setup instead of options with state|actions|getters
export const useCustomerStore = defineStore('customer', () => {
  const customers = ref<CustomerType[]>([])

  const addCustomer = function (customer: CustomerType) {
    customers.value.push(customer)
  }

  const updateCustomer = function (index: number, customer: CustomerType) {
    customers.value[index] = customer
  }

  const deleteCustomer = function (index: number) {
    console.log(index)
    customers.value.splice(index, 1)
  }

  const searchCustomers = function (query: string) {
    query = query.toLowerCase()
    return customers.value.filter(
      (customer) =>
        customer.firstName.toLowerCase().includes(query) ||
        customer.lastName.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.includes(query) ||
        customer.state.toLowerCase().includes(query) ||
        (customer.state ? 'active' : 'inactive').includes(query),
    )
  }

  return {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
  }
})
