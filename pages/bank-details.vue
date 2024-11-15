<template>
  <div class="main-cont">
    <div class="row">
      <div class="col s12 m3 pad0 side-nav-wrapper">
        <SideNav />
      </div>
      <div class="col s12 m9 pad0 content-side-wrapper">
        <TopNav />

        <div class="content-container">
          <div class="container">
            <div class="welcome-intro center">
              <h4>
                <span>Bank Details</span>
              </h4>
              <p>This is the primary bank account we send your settlements to.</p>
            </div>
            <div 
              class="container copy-paste-div" 
              @click="copyToClipboard"
              :class="{ 'copied': isCopied }"
            >
              <div class="cpd-title">Account Information</div>
              <div class="cpd-img-div">
                <img src="@/assets/images/copy-paste-icon.svg" alt="copy-paste">
              </div>
              <div id="bank-details">
                <span class="account-number">3710063986 / </span>
                <span class="bank-name">Bluewhales Microfinance Bank</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SideNav from "@/components/SideNav.vue"
import TopNav from "@/components/TopNav.vue"
import M from 'materialize-css'

const isCopied = ref(false)

const copyToClipboard = async () => {
  const bankDetails = '3710063986 / Bluewhales Microfinance Bank'
  
  try {
    await navigator.clipboard.writeText(bankDetails)
    isCopied.value = true
    
    // Show Materialize toast
    M.toast({ html: 'Account info copied', displayLength: 2000 })
    
    // Reset copy state after animation
    setTimeout(() => {
      isCopied.value = false
    }, 200)
  } catch (err) {
    console.error('Failed to copy:', err)
    M.toast({ html: 'Failed to copy account info', classes: 'red', displayLength: 2000 })
  }
}
</script>

<style scoped>
.welcome-intro.center {
  margin-top: 7%;
}

.container.copy-paste-div {
  position: relative;
  background-color: #E2E8FA;
  width: 50%;
  padding: 30px;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 50px;
  transition: all 0.3s ease;
}

.copy-paste-div:hover {
  transform: scale(1.05);
}

.copy-paste-div.copied {
  background-color: #d1dafc;
}

span.account-number {
  font-size: 21px;
  font-weight: 800;
}

.cpd-title {
  margin-bottom: 5px;
}

.cpd-img-div {
  position: absolute;
  right: 30px;
  top: 30px;
}

.cpd-img-div img {
  width: 21px;
  transition: transform 0.3s ease;
}

.copy-paste-div:hover .cpd-img-div img {
  transform: scale(1.1);
}

/* Add ripple effect */
.copy-paste-div::after {
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

.copy-paste-div:active::after {
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

.content-container > .container {
  min-height: calc(100vh - 64px - 3em);
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