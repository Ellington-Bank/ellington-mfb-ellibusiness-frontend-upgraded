<template>
  <div class="main-cont">
    <div class="row">
      <div class="col s12 m3 pad0 side-nav-wrapper">
        <SideNav />
      </div>
      <div class="col s12 m9 pad0 content-side-wrapper">
        <div class="content-container">
          <div class="content-window">
            <div class="cont">
              <div class="window-icon right-align">
                <img src="@/assets/images/ellignton-pay-logo-black.png" alt="transfer" />
              </div>
              <div class="window-title-div">
                <h5 class="window-title">Transfer to an ElligntonPay User</h5>
              </div>
              <div class="window-form">
                <form @submit.prevent="handleSubmit">
                  <div class="input-field">
                    <input 
                      id="amount" 
                      type="number" 
                      class="inp-field"
                      v-model="formData.amount"
                      :class="{ 'invalid': errors.amount }"
                      @input="validateAmount"
                      min="0"
                    >
                    <label for="amount">Amount</label>
                    <span v-if="errors.amount" class="helper-text red-text">{{ errors.amount }}</span>
                    <span v-if="formData.amount" class="amount-in-words">
                      {{ amountInWords }}
                    </span>
                  </div>

                  <div class="input-field">
                    <input 
                      id="account-num" 
                      type="tel" 
                      class="inp-field"
                      v-model="formData.accountNumber"
                      :class="{ 'invalid': errors.accountNumber }"
                      @input="validateAccountNumber"
                      maxlength="10"
                    >
                    <label for="account-num">Recipient Account Number</label>
                    <span v-if="errors.accountNumber" class="helper-text red-text">{{ errors.accountNumber }}</span>
                    <span v-if="recipientName" class="recipient-name green-text">
                      {{ recipientName }}
                    </span>
                  </div>

                  <div class="input-field">
                    <input 
                      type="text" 
                      id="personalized-note" 
                      class="inp-field"
                      v-model="formData.note"
                      :class="{ 'invalid': errors.note }"
                      maxlength="100"
                    >
                    <label for="personalized-note">Personalized Note</label>
                    <span v-if="formData.note" class="char-count">
                      {{ formData.note.length }}/100
                    </span>
                  </div>

                  <div class="input-field mag0">
                    <p class="mag0">
                      <label>
                        <input 
                          type="checkbox" 
                          class="filled-in"
                          v-model="formData.addToBeneficiary"
                        />
                        <span>Add to Beneficiary</span>
                      </label>
                    </p>
                  </div>

                  <div class="button-div input-field">
                    <button 
                      type="submit" 
                      class="submit-btn sec-bg modal-trigger" 
                      data-target="transfer-popup"
                      :disabled="isSubmitting || hasErrors"
                    >
                      {{ isSubmitting ? 'Processing...' : 'Transfer' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div class="secured-notice center">
              <img src="@/assets/images/padlock.svg" alt="padlock-icon" />
              <span> Secured by ElligntonPay.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-wrapper">
      <TransferPopup 
        ref="transferPopupRef"
        :transfer-details="formData"
        @transfer-confirmed="handleTransferConfirmed"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import SideNav from "@/components/SideNav.vue"
import TransferPopup from "@/components/pop-ups/TransferPopup.vue"
import M from 'materialize-css'

const transferPopupRef = ref(null)
const isSubmitting = ref(false)
const recipientName = ref('')

const formData = reactive({
  amount: '',
  accountNumber: '',
  note: '',
  addToBeneficiary: false
})

const errors = reactive({
  amount: '',
  accountNumber: '',
  note: ''
})

const amountInWords = computed(() => {
  if (!formData.amount) return ''
  // Add your number to words conversion logic here
  return `${formData.amount} Naira only`
})

const hasErrors = computed(() => {
  return Object.values(errors).some(error => error) || 
    !formData.amount || 
    !formData.accountNumber
})

onMounted(() => {
  const elemsModal = document.querySelectorAll('.modal')
  M.Modal.init(elemsModal)
})

const validateAmount = () => {
  errors.amount = ''
  if (!formData.amount) {
    errors.amount = 'Amount is required'
  } else if (formData.amount <= 0) {
    errors.amount = 'Amount must be greater than 0'
  } else if (formData.amount > 1000000) {
    errors.amount = 'Amount cannot exceed 1,000,000'
  }
}

const validateAccountNumber = async () => {
  errors.accountNumber = ''
  recipientName.value = ''
  
  if (!formData.accountNumber) {
    errors.accountNumber = 'Account number is required'
    return
  }
  
  if (!/^\d{10}$/.test(formData.accountNumber)) {
    errors.accountNumber = 'Account number must be 10 digits'
    return
  }
  
  // Simulate account verification
  try {
    // Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500))
    recipientName.value = 'John Doe' // Replace with actual recipient name
  } catch (error) {
    errors.accountNumber = 'Invalid account number'
  }
}

const handleSubmit = async () => {
  if (hasErrors.value) return
  
  try {
    isSubmitting.value = true
    
    // Show transfer confirmation modal
    const modal = M.Modal.getInstance(document.querySelector('#transfer-popup'))
    modal.open()
    
  } catch (error) {
    console.error('Transfer error:', error)
    M.toast({ html: 'Transfer failed. Please try again.', classes: 'red' })
  } finally {
    isSubmitting.value = false
  }
}

const handleTransferConfirmed = async () => {
  try {
    // Handle successful transfer
    M.toast({ html: 'Transfer successful!', classes: 'green' })
    
    // Reset form
    Object.keys(formData).forEach(key => {
      formData[key] = key === 'addToBeneficiary' ? false : ''
    })
    recipientName.value = ''
    
  } catch (error) {
    console.error('Transfer confirmation error:', error)
    M.toast({ html: 'Transfer failed. Please try again.', classes: 'red' })
  }
}
</script>

<style scoped src="@/assets/css/transfer.css"></style>

<style scoped>
.main-cont {
  height: 100vh;
}

.main-cont > .row {
  width: 100%;
  margin: 0;
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

.input-field span {
  font-size: 14px;
}

/* Additional styles */
.amount-in-words {
  font-size: 12px;
  color: var(--sec-color);
  margin-top: 4px;
  display: block;
}

.recipient-name {
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.char-count {
  position: absolute;
  right: 0;
  bottom: -20px;
  font-size: 12px;
  color: #666;
}

.submit-btn {
  transition: all 0.3s ease;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Add ripple effect */
.submit-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.submit-btn:active::after {
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}
</style>