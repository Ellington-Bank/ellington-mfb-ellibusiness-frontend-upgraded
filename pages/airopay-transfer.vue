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

                  <div class="input-field checkbox-field">
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
  
  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
    
    const convertLessThanThousand = (n) => {
      if (n === 0) return ''
      
      let result = ''
      
      // Handle hundreds
      if (n >= 100) {
        result += ones[Math.floor(n / 100)] + ' Hundred'
        if (n % 100 !== 0) result += ' and '
      }
      
      // Handle tens and ones
      const twoDigits = n % 100
      if (twoDigits >= 10 && twoDigits < 20) {
        result += teens[twoDigits - 10]
      } else {
        result += tens[Math.floor(twoDigits / 10)]
        if (result !== '' && twoDigits % 10 !== 0) result += '-'
        result += ones[twoDigits % 10]
      }
      
      return result
    }
    
    if (num === 0) return 'Zero'
    
    const billion = Math.floor(num / 1000000000)
    num %= 1000000000
    const million = Math.floor(num / 1000000)
    num %= 1000000
    const thousand = Math.floor(num / 1000)
    const remainder = num % 1000
    
    let result = ''
    
    if (billion) {
      result += convertLessThanThousand(billion) + ' Billion'
      if (million || thousand || remainder) result += ', '
    }
    
    if (million) {
      result += convertLessThanThousand(million) + ' Million'
      if (thousand || remainder) result += ', '
    }
    
    if (thousand) {
      result += convertLessThanThousand(thousand) + ' Thousand'
      if (remainder) result += ', '
    }
    
    if (remainder) {
      result += convertLessThanThousand(remainder)
    }
    
    // Handle decimal part
    const amount = formData.amount.toString()
    const decimalPart = amount.includes('.') ? amount.split('.')[1] : '00'
    const kobo = parseInt(decimalPart.padEnd(2, '0').slice(0, 2))
    
    return `${result} Naira${kobo > 0 ? ` and ${convertLessThanThousand(kobo)} Kobo` : ''} Only`
  }
  
  try {
    const amount = parseFloat(formData.amount)
    if (isNaN(amount)) return ''
    if (amount > 999999999999) return 'Amount too large'
    return numberToWords(Math.floor(amount))
  } catch (error) {
    console.error('Error converting amount to words:', error)
    return ''
  }
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
  margin-bottom: 8px;
  display: inline-block;
}
.input-field span.character-count {
  margin: 0;
}
.checkbox-field {
  margin: 0;
  margin-top: 30px;
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