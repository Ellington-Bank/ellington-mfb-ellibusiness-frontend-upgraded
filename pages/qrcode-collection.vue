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
              <div class="window-title-div center">
                <div>
                  <img src="@/assets/images/qr-code.svg" alt="icon" class="title-icon">
                </div>
                <p>
                  Share your account details with your clients to receive payments.
                </p>
              </div>
              <div class="window-form">
                <div class="qr-code-div center">
                  <img 
                    ref="qrCodeRef"
                    src="@/assets/images/qr-code.png" 
                    alt="qr-code" 
                    class="qr-code"
                  >
                </div>
                <div 
                  class="download-qr-code"
                  @click="downloadQRCode"
                  :class="{ 'downloading': isDownloading }"
                >
                  <span class="dqr-1">
                    {{ isDownloading ? 'Downloading...' : 'Download QR Code' }}
                  </span>
                  <span class="dqr-2">
                    <img src="@/assets/images/download.svg" alt="download" />
                  </span>
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
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SideNav from '@/components/SideNav.vue'

const qrCodeRef = ref(null)
const isDownloading = ref(false)
const showToast = ref(false)
const toastMessage = ref('')

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const downloadQRCode = async () => {
  try {
    isDownloading.value = true
    
    const response = await fetch(qrCodeRef.value.src)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'ellignton-pay-qr-code.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    showToastMessage('QR Code downloaded successfully!')
  } catch (error) {
    console.error('Error downloading QR code:', error)
    showToastMessage('Failed to download QR Code. Please try again.')
  } finally {
    isDownloading.value = false
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

.window-form {
  margin-top: 30px;
}

.window-title-div p {
  margin: 20px 0;
}

img.qr-code {
  width: 40%;
  min-width: 150px;
}

.download-qr-code {
  display: flex;
  background-color: #E2E8FA;
  border-radius: 12px;
  padding: 15px;
  margin: 20px 0 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.download-qr-code:hover {
  transform: scale(1.07);
}

.download-qr-code.downloading {
  opacity: 0.7;
  cursor: wait;
}

span.dqr-1 {
  line-height: 3;
  flex-grow: 1;
}

span.dqr-2 img {
  width: 32px;
  position: relative;
  top: 10px;
  transition: transform 0.3s ease;
}

.download-qr-code:hover span.dqr-2 img {
  transform: translateY(2px);
}

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

/* Toast notification styles */
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
</style>