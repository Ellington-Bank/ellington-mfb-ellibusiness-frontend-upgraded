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
                <div class="center">
                  <img src="@/assets/images/ussd.svg" alt="icon" class="title-icon">
                </div>
                <p>
                  Share your USSD dial code details below with your clients to receive payments.
                </p>
              </div>
              <div class="window-form">
                <div 
                  class="copy-paste-div" 
                  @click="copyToClipboard"
                  :class="{ 'copied': isCopied }"
                >
                  <div class="cpd-title">USSD Information</div>
                  <div class="cpd-img-div">
                    <img src="@/assets/images/copy-paste-icon.svg" alt="copy-paste">
                  </div>
                  <div id="ussd-details">
                    <span class="account-number">*595*100*56789132#</span>
                  </div>
                </div>
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

    <!-- Toast Notification -->
    <div 
      class="toast-notification"
      :class="{ 'show': showToast }"
    >
      USSD code copied
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SideNav from '@/components/SideNav.vue'

const showToast = ref(false)
const isCopied = ref(false)

const copyToClipboard = async () => {
  const ussdCode = '*595*100*56789132#'
  
  try {
    await navigator.clipboard.writeText(ussdCode)
    isCopied.value = true
    showToast.value = true
    
    // Reset copy state after animation
    setTimeout(() => {
      isCopied.value = false
    }, 200)
    
    // Hide toast after 2 seconds
    setTimeout(() => {
      showToast.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text:', err)
  }
}
</script>

<style scoped src="@/assets/css/transfer.css"></style>

<style scoped>
.content-window {
  width: 46%;
}

h5.window-title {
  font-size: 1.5rem;
  font-weight: 600;
}

img.title-icon {
  width: 70px;
}

.copy-paste-div {
  position: relative;
  background-color: #E2E8FA;
  padding: 25px;
  border-radius: 12px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.copy-paste-div:hover {
  transform: scale(1.05);
}

.copy-paste-div.copied {
  background-color: #d1dafc;
}

span.account-number {
  font-size: 18px;
  font-weight: 800;
}

.cpd-title {
  margin-bottom: 5px;
}

.cpd-img-div {
  position: absolute;
  right: 25px;
  top: 25px;
}

.cpd-img-div img {
  width: 21px;
  transition: transform 0.3s ease;
}

.copy-paste-div:hover .cpd-img-div img {
  transform: scale(1.1);
}

/* Main container styles */
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

/* Toast Notification */
.toast-notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background-color: #323232;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 14px;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1000;
}

.toast-notification.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

/* Adding ripple effect */
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
</style>