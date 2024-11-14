<template>
  <section class="main-container" id="reg-page">
    <div class="row">
      <div class="picture-side col s12 m6 pad0">
        <div class="picture-bg"></div>
      </div>
      <div class="icon-div">
        <img src="@/assets/images/ellignton-pay-logo-black.png" alt="ElligntonPay">
      </div>
      <div class="form-side col s12 m6">
        <div class="auth-wrapper col s12 m8">
          <div class="greeting-div col s12">
            <h4 class="pry-color">
              Create an Account
              <img src="@/assets/images/rocket-emoji.svg" alt="morning" class="greet-img">
            </h4>
          </div>
          <div class="form-wrapper col s12">
            <form @submit.prevent="handleSubmit">
              <div class="input-field col s12 pad0">
                <div class="input-field col s12 m6 pad0-left">
                  <input 
                    id="first_name" 
                    type="text" 
                    class="inp-field"
                    v-model="formData.firstName"
                    :class="{ 'has-error': errors.firstName }"
                    @blur="validateField('firstName')"
                  >
                  <label for="first_name">FIRST NAME</label>
                  <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
                </div>
                <div class="input-field col s12 m6 pad0-right">
                  <input 
                    id="last_name" 
                    type="text" 
                    class="inp-field"
                    v-model="formData.lastName"
                    :class="{ 'has-error': errors.lastName }"
                    @blur="validateField('lastName')"
                  >
                  <label for="last_name">LAST NAME</label>
                  <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
                </div>
              </div>
              <div class="input-field col s12 pad0">
                <input 
                  id="email" 
                  type="email" 
                  class="inp-field"
                  v-model="formData.email"
                  :class="{ 'has-error': errors.email }"
                  @blur="validateField('email')"
                >
                <label for="email">EMAIL</label>
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>
              <div class="input-field col s12 pad0">
                <input 
                  id="password" 
                  :type="showPassword ? 'text' : 'password'"
                  class="inp-field"
                  v-model="formData.password"
                  :class="{ 'has-error': errors.password }"
                  @blur="validateField('password')"
                >
                <label for="password">PASSWORD</label>
                <span class="field-icon toggle-password" @click="togglePassword">
                  <img 
                    src="@/assets/images/opened-eye.svg" 
                    alt="opened-eye-icon" 
                    class="opened-eye-icon"
                    :class="{ 'hidden': showPassword }"
                  >
                  <img 
                    src="@/assets/images/closed-eye.svg" 
                    alt="closed-eye-icon" 
                    class="closed-eye-icon"
                    :class="{ 'hidden': !showPassword }"
                  >
                </span>
                <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
              </div>
              <div class="input-field col s12 pad0">
                <input 
                  id="confirm-password" 
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="inp-field"
                  v-model="formData.confirmPassword"
                  :class="{ 'has-error': errors.confirmPassword }"
                  @blur="validateField('confirmPassword')"
                >
                <label for="confirm-password">CONFIRM PASSWORD</label>
                <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
              </div>
              <div class="button-div col s12 pad0">
                <button 
                  type="submit" 
                  class="submit-btn sec-bg"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'SIGNING UP...' : 'SIGN UP' }}
                </button>
              </div>
              <div class="col s12 center reg-lnk-div">
                Already have an account? 
                <NuxtLink to="/login" class="sec-lnk">Sign in</NuxtLink>
              </div>
              <div class="col s12 center terms-policy-div">
                By signing in, you agree to our <br> 
                <div>
                  <NuxtLink to="/terms" class="underlined">Terms of Use</NuxtLink> and 
                  <NuxtLink to="/privacy" class="underlined">Privacy Policy</NuxtLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const isSubmitting = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const validateField = (field) => {
  errors[field] = ''
  
  switch (field) {
    case 'firstName':
      if (!formData.firstName) errors.firstName = 'First name is required'
      break
    case 'lastName':
      if (!formData.lastName) errors.lastName = 'Last name is required'
      break
    case 'email':
      if (!formData.email) {
        errors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email'
      }
      break
    case 'password':
      if (!formData.password) {
        errors.password = 'Password is required'
      } else if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters'
      }
      break
    case 'confirmPassword':
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password'
      } else if (formData.confirmPassword !== formData.password) {
        errors.confirmPassword = 'Passwords do not match'
      }
      break
  }
}

const validateForm = () => {
  validateField('firstName')
  validateField('lastName')
  validateField('email')
  validateField('password')
  validateField('confirmPassword')
  return !Object.values(errors).some(error => error)
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  try {
    isSubmitting.value = true
    // Here you would typically make an API call to register the user
    console.log('Form submitted:', formData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Navigate to next step
    navigateTo('/register-biz')
    
  } catch (error) {
    console.error('Registration error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style src="@/assets/css/auth.css"></style>

<style scoped>
.submit-btn {
    font-weight: 500;
}
.input-field > .input-field {
    margin: 0;
}
.icon-div {
    position: fixed;
    right: 50px;
    top: 20px;
}
.greeting-div h4 {
    font-size: 2.2rem;
}
img.greet-img {
    width: 33px;
}

/* Additional functionality styles */
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

.hidden {
    display: none;
}

.field-icon {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}

button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
</style>