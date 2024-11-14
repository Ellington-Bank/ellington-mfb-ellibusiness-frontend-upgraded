<template>
  <section class="main-container" id="reset-page">
    <div class="row">
      <div class="picture-side col s12 m6 pad0">
        <div class="picture-bg"></div>
      </div>
      <div class="form-side col s12 m6">
        <div class="auth-wrapper col s12 m7">
          <div class="icon-div col s12">
            <img src="@/assets/images/ellignton-pay-logo-black.png" alt="ElligntonPay">
          </div>
          <div class="greeting-div col s12">
            <h4 class="pry-color">
              Reset Password
              <img src="@/assets/images/fix-emoji.svg" alt="morning" class="greet-img">
            </h4>
          </div>
          <div class="form-wrapper col s12">
            <form @submit.prevent="handleSubmit" id="reset-form">
              <div class="reset-form-div" v-show="!emailSent">
                <div class="input-field col s12 pad0">
                  <input 
                    id="email" 
                    type="email" 
                    class="inp-field"
                    v-model="email"
                    :class="{ 'has-error': error }"
                    @blur="validateEmail"
                  >
                  <label for="email" :class="{ 'active': email }">EMAIL</label>
                  <span v-if="error" class="error-message">{{ error }}</span>
                </div>
                <div class="button-div col s12 pad0">
                  <button 
                    type="submit" 
                    class="submit-btn sec-bg" 
                    id="reset-btn"
                    :disabled="isSubmitting"
                  >
                    {{ isSubmitting ? 'SENDING...' : 'SEND PASSWORD RESET EMAIL' }}
                  </button>
                </div>
              </div>
              
              <div class="center reset-notice" :class="{ 'show': emailSent }">
                An email is on its way to you. Follow the instructions to reset your password.
              </div>
              
              <div class="col s12 center reg-lnk-div">
                Remember your password?
                <NuxtLink to="/login" class="sec-lnk">Sign in</NuxtLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const error = ref('')
const emailSent = ref(false)
const isSubmitting = ref(false)

const validateEmail = () => {
  error.value = ''
  if (!email.value) {
    error.value = 'Email is required'
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    error.value = 'Please enter a valid email'
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!validateEmail()) return
  
  try {
    isSubmitting.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    emailSent.value = true
    
    // Optional: You can reset the form here
    email.value = ''
    error.value = ''
    
  } catch (err) {
    error.value = 'Failed to send reset email. Please try again.'
    console.error('Reset password error:', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style src="@/assets/css/auth.css"></style>

<style scoped>
img.greet-img {
  width: 25px;
  top: 0;
}

.reset-notice {
  margin: 20px 0;
  font-size: 14px;
  display: none;
}

/* Additional functionality styles */
.reset-notice.show {
  display: block;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.has-error {
  border-color: red !important;
  box-shadow: 0 1px 0 0 red !important;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.input-field label.active {
  transform: translateY(-14px) scale(0.8);
  transform-origin: 0 0;
}

/* Transition for form/notice visibility */
.reset-form-div,
.reset-notice {
  transition: opacity 0.3s ease;
}
</style>