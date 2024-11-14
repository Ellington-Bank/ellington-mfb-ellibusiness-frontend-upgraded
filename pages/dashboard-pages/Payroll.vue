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
                <span>Payroll </span>
              </h4>
              <p>See your payroll data</p>
            </div>
            <NuxtLink to="/request-card">
              <button class="submit-btn sec-bg">Download Report</button>
            </NuxtLink>
          </div>
          <div class="container b-container">
            <div class="payroll-grid">
              <div class="payroll-grid-item payroll-card-block">
                <div class="payroll-balance-card">
                  <div class="pbc1">
                    <div class="payroll-acct-num">Account Number: {{ accountNumber }}</div>
                    <h4 class="payroll-balance">₦{{ formatMoney(balance) }}</h4>
                  </div>
                  <div class="payroll-card-icon">
                    <img src="@/assets/images/payroll-card-icon.svg" alt="icon">
                  </div>
                </div>
              </div>

              <div class="payroll-grid-item payroll-list-block">
                <div class="center pli-title">Payroll History</div>
                <div 
                  v-for="record in displayedPayrollHistory" 
                  :key="record.month"
                  class="payroll-list-item"
                >
                  <img src="@/assets/images/history-circle.svg" alt="history">
                  <div>{{ record.month }} {{ record.year }}</div>
                </div>

                <div class="payroll-load-more-div" v-if="hasMoreHistory">
                  <button 
                    class="payroll-load-more-btn submit-btn sec-bg"
                    @click="loadMoreHistory"
                    :disabled="isLoading"
                  >
                    {{ isLoading ? 'Loading...' : 'Load More ...' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty Payroll Table -->
          <div class="container pt-container" :class="{ 'hide': hasPayrollData }">
            <PayrollTable1/>
            <div id="payroll-table-loader" v-if="isLoading">
              <img src="@/assets/images/loader-1.png" alt="loader" class="loader-img">
            </div>
          </div>

          <!-- Filled Payroll Table -->
          <div class="container pt-container" :class="{ 'hide': !hasPayrollData }">
            <PayrollTable2/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SideNav from "@/components/SideNav.vue"
import TopNav from "@/components/TopNav.vue"
import PayrollTable1 from "@/components/PayrollTable(empty).vue"
import PayrollTable2 from "@/components/PayrollTable(filled).vue"

// State
const accountNumber = ref('902839829002')
const balance = ref(528182)
const isLoading = ref(false)
const page = ref(1)
const itemsPerPage = 4

const payrollHistory = ref([
  { month: 'JUNE', year: '2021' },
  { month: 'MAY', year: '2021' },
  { month: 'APRIL', year: '2021' },
  { month: 'MARCH', year: '2021' },
  { month: 'FEBRUARY', year: '2021' },
  { month: 'JANUARY', year: '2021' },
  { month: 'DECEMBER', year: '2020' },
  { month: 'NOVEMBER', year: '2020' }
])

const hasPayrollData = ref(true) // Toggle this based on your data state

// Computed
const displayedPayrollHistory = computed(() => {
  return payrollHistory.value.slice(0, page.value * itemsPerPage)
})

const hasMoreHistory = computed(() => {
  return page.value * itemsPerPage < payrollHistory.value.length
})

// Methods
const formatMoney = (amount) => {
  return amount.toLocaleString('en-NG')
}

const loadMoreHistory = async () => {
  try {
    isLoading.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    page.value++
  } catch (error) {
    console.error('Error loading more history:', error)
  } finally {
    isLoading.value = false
  }
}

// Optional: Auto-load data on mount
// onMounted(async () => {
//   try {
//     isLoading.value = true
//     // Fetch initial data
//     await new Promise(resolve => setTimeout(resolve, 1000))
//     hasPayrollData.value = true
//   } catch (error) {
//     console.error('Error loading payroll data:', error)
//   } finally {
//     isLoading.value = false
//   }
// })
</script>

<style scoped src="@/assets/css/payroll.css"></style>

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

/* Animation for loader */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader-img {
  animation: spin 1s linear infinite;
}

/* Container styles */
.main-cont {
  height: 100vh;
}

.main-cont > .row {
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

/* Transition for loading states */
.payroll-load-more-btn {
  transition: opacity 0.3s ease;
}

.payroll-load-more-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>