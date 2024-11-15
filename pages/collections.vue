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
                <h5 class="window-title">HOW DO YOU WANT TO RECEIVE PAYMENTS?</h5>
              </div>
              <div class="window-form">
                <NuxtLink 
                  to="/bank-transfer-collection" 
                  class="flex-div option-div"
                >
                  <div class="option-icon-div">
                    <img src="@/assets/images/bank.svg" alt="icon" class="option-icon" />
                  </div>
                  <div class="option-desc-div">
                    <span>By Bank Transfers</span>
                  </div>
                  <div class="next-icon-div">
                    <img src="@/assets/images/next-arr.svg" alt="icon" class="arr-icon" />
                  </div>
                </NuxtLink>

                <NuxtLink 
                  to="/pos-collection" 
                  class="flex-div option-div"
                >
                  <div class="option-icon-div">
                    <img src="@/assets/images/pos.svg" alt="icon" class="option-icon" />
                  </div>
                  <div class="option-desc-div">
                    <span>By POS</span>
                  </div>
                  <div class="next-icon-div">
                    <img src="@/assets/images/next-arr.svg" alt="icon" class="arr-icon" />
                  </div>
                </NuxtLink>

                <NuxtLink 
                  to="/ussd-collection" 
                  class="flex-div option-div"
                >
                  <div class="option-icon-div">
                    <img src="@/assets/images/ussd.svg" alt="icon" class="option-icon" />
                  </div>
                  <div class="option-desc-div">
                    <span>By USSD</span>
                  </div>
                  <div class="next-icon-div">
                    <img src="@/assets/images/next-arr.svg" alt="icon" class="arr-icon" />
                  </div>
                </NuxtLink>

                <NuxtLink 
                  to="/qrcode-collection" 
                  class="flex-div option-div"
                >
                  <div class="option-icon-div">
                    <img src="@/assets/images/qr-code.svg" alt="icon" class="option-icon" />
                  </div>
                  <div class="option-desc-div">
                    <span>By QR Code</span>
                  </div>
                  <div class="next-icon-div">
                    <img src="@/assets/images/next-arr.svg" alt="icon" class="arr-icon" />
                  </div>
                </NuxtLink>
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
  </div>
</template>

<script setup>
import SideNav from '@/components/SideNav.vue'

// Add hover effect for better interaction feedback
const options = [
  {
    path: '/bank-transfer-collection',
    icon: 'bank.svg',
    text: 'By Bank Transfers'
  },
  {
    path: '/pos-collection',
    icon: 'pos.svg',
    text: 'By POS'
  },
  {
    path: '/ussd-collection',
    icon: 'ussd.svg',
    text: 'By USSD'
  },
  {
    path: '/qrcode-collection',
    icon: 'qr-code.svg',
    text: 'By QR Code'
  }
]
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

/* Enhanced hover effects */
.option-div {
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.option-div:hover {
  transform: translateX(8px);
  background-color: var(--hover-bg-color, #f5f5f5);
}

.next-icon-div {
  transition: transform 0.2s ease;
}

.option-div:hover .next-icon-div {
  transform: translateX(4px);
}

/* Focus styles for accessibility */
.option-div:focus {
  outline: 2px solid var(--sec-color);
  outline-offset: 2px;
}

/* Active state */
.option-div:active {
  transform: translateX(4px);
}
</style>