<script setup lang="ts">
import CardModalComponent from '../CardModalComponent.vue'
import { ref, computed } from 'vue'

import { useCustomerStore } from '../../stores/customerStore'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  state: 'Lagos',
  status: false,
  details: '',
})

const isValid = computed(() => {
  return (
    form.value.firstName &&
    form.value.lastName &&
    form.value.email &&
    form.value.phone &&
    form.value.details
  )
})

defineProps({
  showing: {
    type: Boolean,
    default: false,
  },
})

// store
const customersStore = useCustomerStore()
const emits = defineEmits(['toggle-modal'])

const handleSubmit = function () {
  if (isValid.value) {
    customersStore.addCustomer({ ...form.value })
    emits('toggle-modal')
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      state: 'Lagos',
      status: false,
      details: '',
    }
  }
}
</script>

<template>
  <CardModalComponent :showing="showing" @toggle-modal="emits('toggle-modal')">
    <header class="font-semibold text-lg md:text-2xl pl-4">Add New Customer</header>
    <form @submit.prevent="handleSubmit" class="space-y-4 p-4">
      <div class="md:flex gap-4">
        <div>
          <label for="firstName">First Name</label>
          <input v-model="form.firstName" id="firstName" type="text" class="input" />
        </div>
        <div>
          <label for="lastName">Last Name</label>
          <input v-model="form.lastName" id="lastName" type="text" class="input" />
        </div>
      </div>
      <div class="md:flex gap-4">
        <div>
          <label for="email">Email</label>
          <input v-model="form.email" id="email" type="email" class="input" />
        </div>
        <div>
          <label for="phone">Phone Number</label>
          <input v-model="form.phone" id="phone" type="tel" class="input" />
        </div>
      </div>
      <div class="md:flex gap-4 items-start">
        <div>
          <label for="state">State</label>
          <select v-model="form.state" id="state" class="input">
            <option>Oyo</option>
            <option>Lagos</option>
            <option>Kaduna</option>
            <option>Abuja</option>
          </select>
        </div>
        <div class="flex items-center">
          <input v-model="form.status" id="active" type="checkbox" class="mr-2" />
          <label for="active" class="font-medium text-gray-700">Set to active</label>
        </div>
      </div>
      <div>
        <label for="details">Customer's Details</label>
        <textarea
          v-model="form.details"
          id="details"
          class="input wysiwyg-editor w-full"
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-green-100 text-green-700 px-3 py-1 rounded-sm border border-green-700"
      >
        Submit
      </button>
    </form>
  </CardModalComponent>
</template>

<style scoped>
label {
  font-size: 14px;
  display: block;
}
input,
textarea {
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 6px;
  padding: 2px 4px;
}
</style>
