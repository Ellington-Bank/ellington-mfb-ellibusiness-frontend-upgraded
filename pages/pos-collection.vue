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
                    class="request-pos-btn sec-bg submit-btn modal-trigger"
                    data-target="success-modal"
                    :disabled="isRequesting"
                    @click="handlePosRequest"
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

    <!-- Materialize Modal -->
    <div id="pos-success-modal" class="modal">
      <div class="modal-content center">
        <div class="modal-icon">
          <img src="@/assets/images/pos.svg" alt="success" class="success-icon">
        </div>
        <h3>Request Received!</h3>
        <p>We've received your POS request. Our team will contact you shortly with next steps.</p>

        <button class="modal-close sec-bg submit-btn ">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SideNav from '@/components/SideNav.vue'
import M from 'materialize-css'

const isRequesting = ref(false)

onMounted(() => {
  const modalElement = document.querySelector('#pos-success-modal')
  M.Modal.init(modalElement, {
    dismissible: true,
    opacity: 0.5,
    inDuration: 300,
    outDuration: 200
  })
})

const handlePosRequest = async () => {
  try {
    isRequesting.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Open modal using Materialize
    const modal = M.Modal.getInstance(document.querySelector('#pos-success-modal'))
    modal.open()
    
  } catch (error) {
    console.error('Error requesting POS:', error)
    M.toast({ html: 'Failed to submit request', classes: 'red' })
  } finally {
    isRequesting.value = false
  }
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

/* Modal styles overrides for Materialize */
#pos-success-modal .submit-btn {
  margin-top: 30px;
}
.modal {
  max-width: 400px;
  border-radius: 12px;
}

.modal .modal-content {
  padding: 2rem;
}

.modal-icon {
  margin-bottom: 1rem;
}

.success-icon {
  width: 60px;
}

.modal h3 {
  margin-bottom: 1rem;
  color: var(--pry-color);
  font-size: 1.5rem;
}

.modal p {
  margin-bottom: 1.5rem;
  line-height: 1.5;
  color: #666;
}

.modal .modal-footer {
  text-align: center;
  padding: 1rem;
}

.modal .modal-footer .btn-flat {
  float: none;
  margin: 0 auto;
}
</style>