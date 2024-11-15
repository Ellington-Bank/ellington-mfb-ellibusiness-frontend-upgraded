<template>
  <div class="main-cont">
    <div class="row">
      <div class="col s12 m3 pad0 side-nav-wrapper">
        <SideNav />
      </div>
      <div class="col s12 m9 pad0 content-side-wrapper">
        <TopNav />

        <div class="content-container">
          <!-- Welcome Section -->
          <div class="welcome-intro">
            <h4 class="modal-trigger" data-target="session-expired">
              <b class="greeting">{{ greeting }}, </b>
              <span class="first_name">Eniola </span>
              <img src="@/assets/images/sun-icon.svg" alt="sun-icon" v-if="!isNightTime">
              <img src="@/assets/images/half-moon1.svg" alt="moon-icon" v-else>
            </h4>
          </div>

          <!-- Currency and Top-up Section -->
          <div class="container h-container-1">
            <div class="sub-nav">
              <div class="currency-tab fg-1">
                <ul class="currency-list">
                  <li v-for="currency in currencies" :key="currency">
                    <a 
                      href="#" 
                      :class="{ 'active-currency': selectedCurrency === currency }"
                      @click.prevent="selectedCurrency = currency"
                    >
                      {{ currency }}
                    </a>
                  </li>
                </ul>
              </div>
              <div class="center tp-balance">
                <button class="sec-color modal-trigger" data-target="top-up"> 
                  <i class="material-icons">add</i> Top up balance
                </button>
              </div>
              <div class="center tp-range">
                <button class='dropdown-trigger' data-target='dropdown1'>
                  {{ selectedRange }} <i class="material-icons">keyboard_arrow_down</i>
                </button>

                <ul id='dropdown1' class='dropdown-content'>
                  <li v-for="range in timeRanges" :key="range">
                    <a href="#!" @click.prevent="handleRangeSelect(range)">{{ range }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Account Details Section -->
          <div class="container h-container-2">
            <div class="account-detials-grid">
              <div class="account-details-item">
                <div class="adi-heading">AVAILABLE BALANCE</div>
                <div class="adi-amount">{{ selectedCurrency }} {{ formatMoney(120000.00) }}</div>
              </div>
              <div class="account-details-item">
                <div class="adi-heading">BANK ACCOUNT</div>
                <div class="adi-acct-num" id="adi-acct-num">20749289341</div>
                <div class="adi-bank-name">BLUEWHALES MICROFINANCE BANK</div>
                <div class="copy-paste-icon-div" @click="copyAccountNumber">
                  <img src="@/assets/images/copy-paste-icon2.svg" alt="copy-paste-icon">
                </div>
              </div>
            </div>
          </div>

          <!-- Revenue Section -->
          <div class="container h-container-3">
            <div class="revenue-grid">
              <div class="revenue-graph">
                <div class="rg-header">
                  <div class="rg-title fg-1"> 
                    <h5>Revenue History</h5>
                    <span>Total of balance </span>
                  </div>
                  <div class="rg-buttons">
                    <button 
                      v-for="period in ['DAILY', 'WEEKLY', 'MONTHLY']" 
                      :key="period"
                      class="rg-update-btn"
                      :class="{ 'update-active': activePeriod === period }"
                      @click="updateChart(period.toLowerCase())"
                    >
                      <template v-if="period === 'MONTHLY'">
                        <img src="@/assets/images/calendar2.svg" alt="calendar-icon" class="cal-green">
                        <img src="@/assets/images/calendar-3.svg" alt="calendar-icon" class="cal-white">
                        April, 2021
                      </template>
                      <template v-else>
                        {{ period }}
                      </template>
                    </button>
                  </div>
                </div>
                <area-chart
                  :data="chartData"
                  :colors="['#ADC959', '#022c81']"
                ></area-chart>
              </div>
              <div class="revenue-blocks">
                <div class="r-block" v-for="block in revenueBlocks" :key="block.title">
                  <div class="r-tile">{{ block.title }}</div>
                  <h4>{{ block.amount }}</h4>
                  <div :class="['gain-loss', block.trend >= 0 ? 'success-color' : 'fail-color']">
                    <span>{{ block.description }}</span>
                    <i v-if="block.showTrend" class="material-icons">
                      {{ block.trend >= 0 ? 'trending_up' : 'trending_down' }}
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-wrapper">
      <SessionExpired/>
      <TopUp/>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SideNav from "@/components/SideNav.vue"
import TopNav from "@/components/TopNav.vue"
import SessionExpired from "@/components/pop-ups/SessionExpired.vue"
import TopUp from "@/components/pop-ups/TopUp.vue"
import M from 'materialize-css'

// State
const selectedCurrency = ref('NGN')
const selectedRange = ref('This Year')
const activePeriod = ref('DAILY')
const chartData = ref({
  "18/04": 1900,
  "19/04": 1000,
  "20/04": 180,
  "21/04": 1200,
  "22/04": 200,
  "23/04": 1500,
})

// Constants
const currencies = ['NGN', 'GHC', 'EUR', 'GDP', 'RWF', 'UGX', 'TZX']
const timeRanges = ['This Year', 'This Month', 'This Week', 'Today']

const revenueBlocks = [
  {
    title: 'REVENUE',
    amount: '₦182.271',
    trend: 18.01,
    description: '+18.01%',
    showTrend: true
  },
  {
    title: 'EXPENSES',
    amount: '₦181.1',
    trend: -18.01,
    description: '-18.01%',
    showTrend: true
  },
  {
    title: 'LOAN PORTFOLIO',
    amount: '₦50,000,000',
    description: 'REPAYMENT: N120,000.00',
    showTrend: false
  }
]

// Computed
const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
})

const isNightTime = computed(() => {
  const hours = new Date().getHours()
  return hours < 6 || hours >= 18
})

// Methods
const formatMoney = (amount) => {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const copyAccountNumber = async () => {
  try {
    const accountNumber = document.getElementById('adi-acct-num').innerText
    await navigator.clipboard.writeText(accountNumber)
    M.toast({ html: 'Account number copied', displayLength: 2000 })
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const handleRangeSelect = (range) => {
  selectedRange.value = range
}

const updateChart = (period) => {
  activePeriod.value = period.toUpperCase()
  
  const chartUpdates = {
    daily: {
      "18/04": 1000, "19/04": 900, "20/04": 800,
      "21/04": 700, "22/04": 600, "23/04": 500,
    },
    weekly: {
      "18/04": 2000, "19/04": 800, "20/04": 1200,
      "21/04": 1700, "22/04": 800, "23/04": 900,
    },
    monthly: {
      "18/04": 1900, "19/04": 1000, "20/04": 180,
      "21/04": 1200, "22/04": 200, "23/04": 1500,
    }
  }
  
  chartData.value = chartUpdates[period]
}

// Initialize Materialize components
onMounted(() => {
  const elemsDropdown = document.querySelectorAll('.dropdown-trigger')
  const elemsModal = document.querySelectorAll('.modal')
  
  M.Dropdown.init(elemsDropdown)
  M.Modal.init(elemsModal)
})
</script>

<style scoped src="@/assets/css/home.css"></style>

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

<style>
div#chart-1 {
    margin-top: 30px;
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