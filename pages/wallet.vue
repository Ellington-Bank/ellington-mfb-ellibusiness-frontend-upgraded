<template>
  <div class="main-cont">
    <div class="row">
      <div class="col s12 m3 pad0 side-nav-wrapper">
        <SideNav />
      </div>
      <div class="col s12 m9 pad0 content-side-wrapper">
        <TopNav />

        <div class="content-container">
          <div class="welcome-intro flex-div">
            <div class="fg-1">
              <h4>
                <span>Wallet & Card </span>
              </h4>
              <p>See your data</p>
            </div>
            <NuxtLink to="/request-card">
              <button class="submit-btn sec-bg">Request a Card</button>
            </NuxtLink>
          </div>
          
          <div class="container">
            <div class="wallet-grid">
              <!-- Wallet Details Card -->
              <div class="wallet-grid-item" :class="{ 'animate-in': isVisible }">
                <div class="flex-div grid-item-title">
                  <div class="grid-title-h fg-1">WALLET DETAILS</div>
                  <div class="date-block">
                    <img src="@/assets/images/calendar.svg" alt="icon">
                    <span class="date">{{ formatDate(currentDate) }}</span>
                  </div>
                </div>

                <div class="balance-info bi-pad">
                  <span class="item-sub-title">Current Balance</span>
                  <div class="balance-amt">{{ formatCurrency(walletData.balance) }}</div>
                </div>

                <div class="flex-div bi-pad">
                  <div class="balance-info fg-1">
                    <span class="item-sub-title">Income</span>
                    <div class="balance-amt">{{ formatCurrency(walletData.income) }}</div>
                  </div>
                  <div class="balance-info">
                    <span class="item-sub-title">Debit</span>
                    <div class="balance-amt">{{ formatCurrency(walletData.debit) }}</div>
                  </div>
                </div>
                
                <div class="flex-div download-statement-div">
                  <div class="fg-1">Wallet Statement</div>
                  <div>
                    <button 
                      class="download-statement-btn submit-btn sec-bg modal-trigger" 
                      data-target="wallet-statement"
                      :disabled="isDownloading"
                      @click="downloadStatement"
                    >
                      {{ isDownloading ? 'Downloading...' : 'Download' }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Bills Card -->
              <div class="wallet-grid-item rel" :class="{ 'animate-in': isVisible }">
                <div class="flex-div grid-item-title">
                  <div class="grid-title-h fg-1">BILLS</div>
                  <div class="date-block">
                    <img src="@/assets/images/calendar.svg" alt="icon">
                    <span class="date">{{ formatDate(currentDate) }}</span>
                  </div>
                </div>

                <div class="bi-pad">
                  <p class="gi-p">
                    You have {{ unpaidInvoices.length }} unpaid invoice{{ unpaidInvoices.length !== 1 ? 's' : '' }} 
                    this month. Follow up with your client to receive funds
                  </p>
                </div>

                <div class="bi-pad short-invoice-list">
                  <div 
                    v-for="invoice in displayedInvoices" 
                    :key="invoice.id"
                    class="invocie-item flex-div"
                  >
                    <div class="fg-1">
                      <div class="invocie-title">{{ invoice.title }}</div>
                      <div class="invocie-amount">{{ formatCurrency(invoice.amount) }}</div>
                    </div>
                    <div class="send-reminder-div">
                      <button 
                        class="send-reminder-btn submit-btn sec-bg modal-trigger" 
                        data-target="invoice-reminder"
                        @click="selectedInvoice = invoice"
                      >
                        Send Reminder
                      </button>
                    </div>
                  </div>
                </div>
                <div class="see-invoice">
                  <NuxtLink to="/invoice" class="sec-color">See All Invoice</NuxtLink>
                </div>
              </div>

              <!-- Loan Portfolio Card -->
              <div class="wallet-grid-item rel" :class="{ 'animate-in': isVisible }">
                <div class="flex-div grid-item-title">
                  <div class="grid-title-h fg-1">LOAN PORTFOLIO</div>
                  <div class="next-date-block">
                    <span class="sec-color">NEXT PAYMENT: {{ daysUntilPayment }} DAYS</span>
                  </div>
                </div>

                <div class="bi-pad loan-brief center">
                  <div class="loan-brief-amt">{{ formatCurrency(loanData.totalAmount) }}</div>
                  <div class="loan-brief-txt">
                    <p>
                      <span class="red-text">{{ formatCurrency(loanData.nextPayment) }}</span> will be 
                      debited from the registered debit card below.
                    </p>
                  </div>
                </div>

                <div class="card-div">
                  <div class="card-des sec-bg">
                    <div class="card-type-logo right-align">
                      <img src="@/assets/images/visa-logo.svg" alt="visa" class="card-type">
                    </div>
                    <div class="card-num-div">
                      <div class="card-num">{{ formatCardNumber(cardData.number) }}</div>
                      <div class="card-sec-num">{{ cardData.cvv }}</div>
                    </div>
                    <div class="card-name-div flex-div">
                      <div class="card-name fg-1">{{ cardData.name }}</div>
                      <div class="card-exp-date fg-1 flex-div">
                        <small>VALID<br>THRU</small>
                        <div class="fg-1">{{ cardData.expiry }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-wrapper">
      <WalletStatementPopup 
        ref="statementPopupRef"
        @download-complete="handleDownloadComplete"
      />
      <InvoiceReminderPopup 
        ref="reminderPopupRef"
        :invoice="selectedInvoice"
        @reminder-sent="handleReminderSent"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import SideNav from "@/components/SideNav.vue"
import TopNav from "@/components/TopNav.vue"
import WalletStatementPopup from '@/components/pop-ups/WalletStatementPopup.vue'
import InvoiceReminderPopup from '@/components/pop-ups/InvoiceReminderPopup.vue'
import M from 'materialize-css'

// State
const isVisible = ref(false)
const isDownloading = ref(false)
const currentDate = ref(new Date())
const selectedInvoice = ref(null)

// Mock data - replace with actual data fetching
const walletData = ref({
  balance: 528182,
  income: 342182,
  debit: 342182
})

const unpaidInvoices = ref([
  { id: 1, title: 'A&B Limited', amount: 32182 },
  { id: 2, title: 'Abijan Ventures', amount: 1345182 }
])

const loanData = ref({
  totalAmount: 10428182,
  nextPayment: 120000,
  nextPaymentDate: new Date('2024-03-28')
})

const cardData = ref({
  number: '4857000000003544',
  cvv: '2878',
  name: 'Harry Osborn',
  expiry: '**/**'
})

// Computed
const displayedInvoices = computed(() => {
  return unpaidInvoices.value.slice(0, 2) // Show only first 2 invoices
})

const daysUntilPayment = computed(() => {
  const diffTime = loanData.value.nextPaymentDate.getTime() - new Date().getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

// Methods
const formatDate = (date) => {
  return date.toLocaleDateString('en-GB')
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount)
}

const formatCardNumber = (number) => {
  return number.replace(/(\d{4})/g, '$1 ').replace(/\d(?=\d{4})/g, '*')
}

const downloadStatement = async () => {
  isDownloading.value = true
  try {
    const modal = M.Modal.getInstance(document.querySelector('#wallet-statement'))
    modal.open()
  } catch (error) {
    console.error('Download error:', error)
    M.toast({ html: 'Failed to download statement', classes: 'red' })
  } finally {
    isDownloading.value = false
  }
}

const handleDownloadComplete = () => {
  M.toast({ html: 'Statement downloaded successfully', classes: 'green' })
}

const handleReminderSent = () => {
  M.toast({ html: 'Reminder sent successfully', classes: 'green' })
}

onMounted(() => {
  const elemsModal = document.querySelectorAll('.modal')
  M.Modal.init(elemsModal)
  
  // Trigger animation after mount
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<style scoped src="@/assets/css/wallet.css"></style>

<style scoped>
.welcome-intro {
    width: 95%;
    margin: auto;
    margin-bottom: 20px;
}
.welcome-intro h4 {
    margin-bottom: 0;
}
.welcome-intro p {
    margin-top: 5px;
    opacity: 0.8;
}
</style>

<style scoped>
.main-cont{
    height: 100vh;
}
.main-cont > .row{
    width: 100%;
    margin: 0;
}
.center-form-div.container {
    width: 50%;
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
.input-field span {
  font-size: 14px;
}
</style>

<style scoped>
/* Animation classes */
.wallet-grid-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.wallet-grid-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger the animations */
.wallet-grid-item:nth-child(1) { transition-delay: 0.1s; }
.wallet-grid-item:nth-child(2) { transition-delay: 0.2s; }
.wallet-grid-item:nth-child(3) { transition-delay: 0.3s; }

/* Button states */
.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
