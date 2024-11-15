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
                <h5 class="window-title">Transfer to a Bank Account</h5>
              </div>
              <div class="window-form">
                <form @submit.prevent="handleSubmit" id="bank-transfer-form">
                  <div class="input-field">
                    <input 
                      id="amount" 
                      type="number" 
                      class="inp-field"
                      v-model="formData.amount"
                      :class="{ 'invalid': errors.amount }"
                      @input="validateAmount"
                      min="100"
                    >
                    <label for="amount">Amount</label>
                    <span v-if="errors.amount" class="helper-text red-text">{{ errors.amount }}</span>
                    <span v-if="formattedAmount" class="amount-text sec-color">
                      {{ formattedAmount }}
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
                    <div v-if="accountDetails" class="account-details green-text">
                      <p>{{ accountDetails.name }}</p>
                      <small>{{ accountDetails.bank }}</small>
                    </div>
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
                    <span v-if="formData.note" class="character-count">
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
                      :disabled="!canSubmit || isSubmitting"
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
        :transfer-details="transferDetails"
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

const isSubmitting = ref(false)
const accountDetails = ref(null)
const transferPopupRef = ref(null)

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

const formattedAmount = computed(() => {
  if (!formData.amount) return ''
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(formData.amount)
})

const canSubmit = computed(() => {
  return formData.amount > 0 && 
    formData.accountNumber.length === 10 && 
    accountDetails.value &&
    !Object.values(errors).some(error => error)
})

const transferDetails = computed(() => ({
  ...formData,
  recipientName: accountDetails.value?.name,
  recipientBank: accountDetails.value?.bank,
  formattedAmount: formattedAmount.value
}))

onMounted(() => {
  const elemsModal = document.querySelectorAll('.modal')
  M.Modal.init(elemsModal)
})

const validateAmount = () => {
  errors.amount = ''
  
  if (!formData.amount) {
    errors.amount = 'Amount is required'
    return
  }
  
  const amount = Number(formData.amount)
  if (amount < 100) {
    errors.amount = 'Minimum amount is ₦100'
  } else if (amount > 1000000) {
    errors.amount = 'Maximum amount is ₦1,000,000'
  }
}

const validateAccountNumber = async () => {
  errors.accountNumber = ''
  accountDetails.value = null
  
  if (!formData.accountNumber) {
    errors.accountNumber = 'Account number is required'
    return
  }
  
  if (!/^\d{10}$/.test(formData.accountNumber)) {
    errors.accountNumber = 'Account number must be 10 digits'
    return
  }
  
  try {
    // Simulate bank account verification
    await new Promise(resolve => setTimeout(resolve, 800))
    accountDetails.value = {
      name: 'JOHN DOE',
      bank: 'ACCESS BANK PLC'
    }
  } catch (error) {
    errors.accountNumber = 'Invalid account number'
    console.error('Account verification error:', error)
  }
}

const handleSubmit = async () => {
  if (!canSubmit.value) return
  
  try {
    isSubmitting.value = true
    
    // Open confirmation modal
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
    accountDetails.value = null
    
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

.amount-text {
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.account-details {
  margin-top: 4px;
  font-size: 12px;
}

.account-details p {
  margin: 0;
  font-weight: 500;
}

.character-count {
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
</style>