<template>
  <div class="main-cont">
    <div class="row">
      <div class="col s12 m3 pad0 side-nav-wrapper">
        <SideNav />
      </div>
      <div class="col s12 m9 pad0 content-side-wrapper">
        <TopNav />

        <div class="content-container">
          <div class="cont-title">New Invoice</div>
          <div class="container">
            <form @submit.prevent="handleSubmit">
              <div class="invoice-details-1">
                <div class="flex-div">
                  <div class="file-field input-field fg-1">
                    <div class="fpw">
                      <span>
                        <img 
                          :src="logoPreview || '/images/select-logo-file.png'" 
                          alt="select-file" 
                          class="select-file-img"
                          @click="triggerFileInput"
                        >
                        <input 
                          ref="fileInput"
                          type="file"
                          class="hide"
                          accept="image/*"
                          @change="handleLogoUpload"
                        >
                      </span>
                    </div>
                  </div>
                  <div class="text-inputs">
                    <div class="input-field">
                      <input 
                        id="invoice-number" 
                        type="text" 
                        class="inp-field"
                        v-model="formData.invoiceNumber"
                      >
                      <label for="invoice-number">Invoice Number</label>
                    </div>
                    <div class="input-field">
                      <textarea 
                        id="invoice-description" 
                        class="materialize-textarea inp-field"
                        v-model="formData.description"
                      ></textarea>
                      <label for="invoice-description">Invoice Description</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="invoice-details-2">
                <div class="table-div">
                  <table id="add-invoice-table">
                    <thead>
                      <tr>
                        <th>ITEM DESCRIPTION</th>
                        <th>QUANTITY</th>
                        <th>DISCOUNT (%)</th>
                        <th>AMOUNT</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in invoiceItems" :key="index">
                        <td class="item-desc-td">
                          <div class="input-field">
                            <textarea 
                              :id="'item-description-' + index"
                              placeholder="Item Description" 
                              class="materialize-textarea inp-field"
                              v-model="item.description"
                            ></textarea>
                          </div>
                        </td>
                        <td class="item-qty-td">
                          <div class="input-field">
                            <input 
                              :id="'item-quantity-' + index"
                              placeholder="0" 
                              type="number"
                              min="1"
                              class="inp-field"
                              v-model="item.quantity"
                              @input="calculateTotals"
                            >
                          </div>
                        </td>
                        <td class="item-disc-td">
                          <div class="input-field">
                            <input 
                              :id="'item-discount-' + index"
                              placeholder="0" 
                              type="number"
                              min="0"
                              max="100"
                              class="inp-field"
                              v-model="item.discount"
                              @input="calculateTotals"
                            >
                          </div>
                        </td>
                        <td class="item-amt-td">
                          <div class="input-field">
                            <input 
                              :id="'item-amount-' + index"
                              placeholder="0" 
                              type="number"
                              min="0"
                              class="inp-field"
                              v-model="item.amount"
                              @input="calculateTotals"
                            >
                          </div>
                        </td>
                        <td class="action-td">
                          <div class="input-field">
                            <button 
                              class="table-action" 
                              type="button"
                              @click="removeItem(index)"
                            >
                              <img src="@/assets/images/trash.svg" alt="delete-icon" class="action-icon">
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="table-btn-div">
                    <button 
                      type="button"
                      class="btn-add-row submit-btn sec-bg"
                      @click="addNewItem"
                    >
                      Add New Item
                    </button>
                  </div>

                  <div class="total-wrapper">
                    <div class="total-div flex-div">
                      <div class="total-title fg-1">SUB-TOTAL:</div>
                      <div class="total-amount" id="sub-total">
                        {{ selectedCurrency }} <span>{{ formatMoney(totals.subtotal) }}</span>
                      </div>
                    </div>
                    <div class="total-div flex-div">
                      <div class="total-title fg-1">V.A.T (7.5%):</div>
                      <div class="total-amount" id="vat">
                        {{ selectedCurrency }} <span>{{ formatMoney(totals.vat) }}</span>
                      </div>
                    </div>
                    <div class="total-div flex-div l-blue">
                      <div class="total-title fg-1">TOTAL:</div>
                      <div class="total-amount" id="total">
                        {{ selectedCurrency }} <span>{{ formatMoney(totals.total) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="invoice-details-3">
                <div class="form-div">
                  <div class="input-field">
                    <input 
                      id="client-email" 
                      type="email" 
                      class="inp-field validate"
                      v-model="formData.clientEmail"
                      placeholder="enter email"
                    >
                    <label for="client-email">Client Email</label>
                  </div>
                  <div class="input-field">
                    <input 
                      id="due-date" 
                      type="text" 
                      class="inp-field datepicker"
                      ref="datepicker"
                      placeholder="select date"
                    >
                    <label for="due-date">Due Date</label>
                  </div>
                  <div class="input-field">
                    <select 
                      id="currency"
                      v-model="formData.currency"
                    >
                      <option value="" disabled>Select Currency</option>
                      <option 
                        v-for="curr in currencies" 
                        :key="curr.value" 
                        :value="curr.value"
                      >
                        {{ curr.label }}
                      </option>
                    </select>
                    <label for="currency">Currency</label>
                  </div>
                </div>

                <div class="form-submit-div center">
                  <button 
                    type="submit" 
                    class="submit-btn sec-bg modal-trigger" 
                    data-target="invoice-pre-send"
                    :disabled="isSubmitting"
                  >
                    {{ isSubmitting ? 'Sending...' : 'Send Invoice' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-wrapper">
      <InvoicePreConfirm />
      <InvoiceConfirmed />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import SideNav from "@/components/SideNav.vue"
import TopNav from "@/components/TopNav.vue"
import InvoicePreConfirm from '@/components/pop-ups/InvoicePreConfirm.vue'
import InvoiceConfirmed from '@/components/pop-ups/InvoiceConfirmed.vue'
import M from 'materialize-css'

const fileInput = ref(null)
const datepicker = ref(null)
const logoPreview = ref(null)
const isSubmitting = ref(false)

const formData = reactive({
  invoiceNumber: '',
  description: '',
  clientEmail: '',
  dueDate: '',
  currency: ''
})

const currencies = [
  { value: 'NGN', label: 'NIGERIAN NAIRA - NGN' },
  { value: 'GHC', label: 'GHANIAN CEDIS - GHC' },
  { value: 'USD', label: 'US DOLLARS - USD' },
  { value: 'GBP', label: 'BRITISH POUNDS - GBP' }
]

const invoiceItems = ref([
  { description: '', quantity: 0, discount: 0, amount: 0 }
])

const totals = reactive({
  subtotal: 0,
  vat: 0,
  total: 0
})

const selectedCurrency = computed(() => {
  return formData.currency || 'NGN'
})

onMounted(() => {
  M.AutoInit()
  
  const elemsDP = document.querySelectorAll('.datepicker')
  const elemsSelect = document.querySelectorAll('select')
  
  M.Datepicker.init(elemsDP, {
    format: 'yyyy-mm-dd',
    onSelect: (date) => {
      formData.dueDate = M.Datepicker.getInstance(datepicker.value).toString()
    }
  })
  
  M.FormSelect.init(elemsSelect)
})

const calculateTotals = () => {
  let subtotal = 0
  
  invoiceItems.value.forEach(item => {
    const itemTotal = item.quantity * item.amount
    const discountAmount = (itemTotal * item.discount) / 100
    subtotal += itemTotal - discountAmount
  })
  
  totals.subtotal = subtotal
  totals.vat = subtotal * 0.075
  totals.total = totals.subtotal + totals.vat
}

const formatMoney = (amount) => {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const addNewItem = () => {
  invoiceItems.value.push({ description: '', quantity: 0, discount: 0, amount: 0 })
}

const removeItem = (index) => {
  invoiceItems.value.splice(index, 1)
  calculateTotals()
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleLogoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 5000000) { // 5MB limit
      M.toast({ html: 'File size should be less than 5MB', classes: 'red' })
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      logoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  try {
    isSubmitting.value = true
    
    // Show pre-confirmation modal
    const modal = M.Modal.getInstance(document.querySelector('#invoice-pre-send'))
    modal.open()
    
  } catch (error) {
    console.error('Error submitting invoice:', error)
    M.toast({ html: 'Error sending invoice', classes: 'red' })
  } finally {
    isSubmitting.value = false
  }
}

const validateForm = () => {
  // Add your validation logic here
  return true
}
</script>

<style scoped src="@/assets/css/invoice.css"></style>

<style scoped>
.main-cont{
    height: 100vh;
}
.main-cont > .row{
    width: 100%;
    margin: 0;
}
.content-container {
    margin-top: calc(64px + 1.2rem);
}
.side-nav-wrapper.col.m3 {
    width: 20% !important;
    position: relative;
}
.content-side-wrapper.col.m9 {
    width: 80% !important;
    position: relative;
    height: 100vh;
    overflow: auto;
}
textarea.inp-field {
    min-width: 180px;
}
#add-invoice-table .input-field {
    margin-top: -1rem;
}
#add-invoice-table td {
    padding-bottom: 0;
}
.select-wrapper+label {
    left: 0;
    top: -30px;
}
</style>