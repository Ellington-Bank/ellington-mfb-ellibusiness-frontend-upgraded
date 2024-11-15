<template>
  <div class="main-cont">
    <div class="row">
      <div class="col s12 m3 pad0 side-nav-wrapper">
        <SideNav />
      </div>
      <div class="col s12 m9 pad0 content-side-wrapper">
        <TopNav />

        <div class="content-container">
          <div class="container tab-cont">
            <div class="col s12 tab-row pad0">
              <ul class="tabs">
                <li class="tab col s6">
                  <a 
                    href="#savings-sect" 
                    :class="{ active: activeTab === 'savings' }"
                    @click="setActiveTab('savings')"
                  >
                    Savings
                  </a>
                </li>
                <li class="tab col s6 disabled">
                  <a 
                    href="#investment-sect"
                    :class="{ active: activeTab === 'investments' }"
                    @click="setActiveTab('investments')"
                  >
                    Investments
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="container rel">
            <div 
              id="savings-sect" 
              :class="{ 'active': activeTab === 'savings' }"
            >
              <div class="savings-grid">
                <div 
                  class="add-savings-card sec-color modal-trigger" 
                  data-target="new-savings-plan"
                  @click="openNewSavingsPlan"
                >
                  <div class="center">
                    <b class="material-icons">add</b>
                    <span>Create a new savings plan</span>
                  </div>
                </div>

                <div 
                  v-for="plan in savingsPlans" 
                  :key="plan.id"
                  class="savings-card"
                  @click="viewPlanDetails(plan)"
                >
                  <div class="calendar-tag">
                    <img src="@/assets/images/calendar3.svg" alt="calendar" />
                    <span>{{ formatDate(plan.date) }}</span>
                  </div>
                  <div class="savings-title">{{ plan.title }}</div>
                  <div class="savings-money-div flex-div">
                    <h5 class="savings-amount fg-1">
                      <sup>₦</sup>
                      <span>{{ formatMoney(plan.amount) }}</span>
                      <small>.00</small>
                    </h5>
                    <div class="savings-interests right-align">
                      <h4 class="">{{ plan.interest }}<small>%</small></h4>
                      <span>Interest</span> <span>p.a</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              id="investment-sect" 
              class="empty-notice center"
              :class="{ 'active': activeTab === 'investments' }"
            >
              <div class="empty-notice-img">
                <img src="@/assets/images/investment.png" alt="vector image">
              </div>
              <div class="empty-notice-txt">
                <h4>No Investments yet.</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <NewSavingsPlan 
        ref="newSavingsPlanRef"
        @plan-created="handlePlanCreated" 
      />
      <ConfirmSavings 
        ref="confirmSavingsRef"
        @confirmed="handleSavingsConfirmed" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SideNav from "@/components/SideNav.vue"
import TopNav from "@/components/TopNav.vue"
import NewSavingsPlan from "@/components/pop-ups/NewSavingsPlan.vue"
import ConfirmSavings from "@/components/pop-ups/ConfirmSavings.vue"
import M from 'materialize-css'

const activeTab = ref('savings')
const newSavingsPlanRef = ref(null)
const confirmSavingsRef = ref(null)

// Sample data - replace with your actual data source
const savingsPlans = ref([
  {
    id: 1,
    title: 'New Pumping Machine',
    amount: 1000,
    interest: 6,
    date: '2021-09-18'
  },
  {
    id: 2,
    title: 'New Pumping Machine',
    amount: 1000,
    interest: 6,
    date: '2021-09-18'
  }
])

onMounted(() => {
  // Initialize Materialize components
  const tabs = document.querySelectorAll('.tabs')
  M.Tabs.init(tabs, {
    swipeable: false,
    onShow: (tab) => {
      activeTab.value = tab.id.replace('-sect', '')
    }
  })
})

const setActiveTab = (tab) => {
  activeTab.value = tab
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB')
}

const formatMoney = (amount) => {
  return amount.toLocaleString('en-NG')
}

const openNewSavingsPlan = () => {
  const modal = M.Modal.getInstance(document.querySelector('#new-savings-plan'))
  modal.open()
}

const viewPlanDetails = (plan) => {
  // Add logic to view plan details
  console.log('Viewing plan:', plan)
}

const handlePlanCreated = (newPlan) => {
  savingsPlans.value.unshift({
    id: Date.now(),
    ...newPlan,
    date: new Date().toISOString().split('T')[0]
  })
  
  // Show confirmation modal
  const modal = M.Modal.getInstance(document.querySelector('#confirm-savings'))
  modal.open()
}

const handleSavingsConfirmed = () => {
  M.toast({ html: 'Savings plan created successfully!', classes: 'green' })
}
</script>

<style scoped src="@/assets/css/save-invest.css"></style>

<style>
.tabs .indicator {
  background-color: var(--sec-color) !important;
}

/* Add smooth transitions */
.savings-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.savings-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.add-savings-card {
  transition: all 0.3s ease;
}

.add-savings-card:hover {
  background-color: var(--sec-color);
  color: white;
}

/* Base styles */
.main-cont {
  height: 100vh;
}

.main-cont > .row {
  width: 100%;
  margin: 0;
}

.content-container {
  margin-top: calc(64px + 1.2rem);
}

.content-container > .container.tab-cont {
  border: none;
  width: 100%;
  position: relative;
  height: 60px;
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

/* Animation for new savings plans */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.savings-card {
  animation: slideIn 0.3s ease;
}
</style>