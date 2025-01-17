<script setup lang="ts">
import CardModalComponent from '../CardModalComponent.vue'
import { reactive, watch } from 'vue'

// store
import { useCustomerStore } from '../../stores/customerStore'
const customersStore = useCustomerStore()

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

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  state: 'Lagos',
  active: false,
  details: '',
})

function updateForm() {
  const activeItem = customersStore.customers[props.index]
  if (activeItem) {
    form.firstName = activeItem.firstName || ''
    form.lastName = activeItem.lastName || ''
    form.email = activeItem.email || ''
    form.phone = activeItem.phone || ''
    form.state = activeItem.state || 'Lagos'
    form.active = activeItem.active || false
    form.details = activeItem.details || ''
  }
}

// for humans: I don't like to watch for changes but since reactive objects are only defined once, I had to.
watch(
  () => props.index,
  () => {
    updateForm()
  },
  { immediate: true }, // Run immediately on component mount
)

const handleSubmit = function () {
  customersStore.updateCustomer(props.index, { ...form })
  props.toggleModal()
}
</script>

<template>
  <CardModalComponent :showing="showing" @toggle-modal="toggleModal">
    <header class="font-semibold text-2xl pl-4">Update Customer Info {{ index }}</header>
    <form @submit.prevent="handleSubmit" class="space-y-4 p-4">
      <div class="flex gap-4">
        <div>
          <label for="firstName">First Name</label>
          <input v-model="form.firstName" id="firstName" type="text" class="input" />
        </div>
        <div>
          <label for="lastName">Last Name</label>
          <input v-model="form.lastName" id="lastName" type="text" class="input" />
        </div>
      </div>
      <div class="flex gap-4">
        <div>
          <label for="email">Email</label>
          <input v-model="form.email" id="email" type="email" class="input" />
        </div>
        <div>
          <label for="phone">Phone Number</label>
          <input v-model="form.phone" id="phone" type="tel" class="input" />
        </div>
      </div>
      <div class="flex gap-4 items-start">
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
          <input v-model="form.active" id="active" type="checkbox" class="mr-2" />
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
        Update
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
