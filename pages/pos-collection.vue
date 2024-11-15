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
                <div class="">
                  <img src="@/assets/images/pos.svg" alt="icon" class="title-icon">
                </div>
                <p>
                  Click the button below to get your POS
                </p>
              </div>
              <div class="window-form">
                <div class="request-pos-btn-div">
                  <button 
                    class="request-pos-btn sec-bg submit-btn"
                    @click="handlePosRequest"
                    :disabled="isRequesting"
                  >
                    {{ isRequesting ? 'Processing...' : 'Request a POS' }}
                  </button>
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

    <!-- Success Modal -->
    <div 
      class="modal-overlay"
      v-if="showSuccessModal"
      @click="closeModal"
    >
      <div 
        class="modal-content"
        @click.stop
      >
        <div class="modal-icon">
          <img src="@/assets/images/pos.svg" alt="success" class="success-icon">
        </div>
        <h3>Request Received!</h3>
        <p>We've received your POS request. Our team will contact you shortly with next steps.</p>
        <button 
          class="modal-close-btn sec-bg submit-btn"
          @click="closeModal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SideNav from '@/components/SideNav.vue'

const isRequesting = ref(false)
const showSuccessModal = ref(false)

const handlePosRequest = async () => {
  try {
    isRequesting.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    showSuccessModal.value = true
  } catch (error) {
    console.error('Error requesting POS:', error)
  } finally {
    isRequesting.value = false
  }
}

const closeModal = () => {
  showSuccessModal.value = false
}
</script>

<style scoped src="@/assets/css/transfer.css"></style>

<style scoped>
/* Your original styles */
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

/* Enhanced button styles */
.request-pos-btn {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.request-pos-btn:hover {
  transform: translateY(-2px);
}

.request-pos-btn:active {
  transform: translateY(1px);
}

.request-pos-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  animation: slideIn 0.3s ease;
}

.modal-icon {
  margin-bottom: 1rem;
}

.success-icon {
  width: 60px;
}

.modal-content h3 {
  margin-bottom: 1rem;
  color: var(--pry-color);
}

.modal-content p {
  margin-bottom: 1.5rem;
  line-height: 1.5;
  color: #666;
}

.modal-close-btn {
  min-width: 120px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>