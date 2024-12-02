<template>
  <section class="main-container">
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
              Welcome Back!
              <img 
                :src="isNightTime ? '/images/half-moon1.svg' : '/images/sun-icon.svg'" 
                :alt="isNightTime ? 'night' : 'morning'" 
                class="greet-img"
              >
            </h4>
          </div>
          <div class="form-wrapper col s12">
            <form @submit.prevent="handleSubmit">
              <div class="input-field col s12 pad0">
                <input 
                  id="email" 
                  type="email" 
                  class="inp-field"
                  v-model="formData.email"
                  :class="{ 'invalid': errors.email && touched.email }"
                  @blur="validateField('email')"
                >
                <label for="email" :class="{ 'active': formData.email }">EMAIL</label>
                <span class="error-text" v-if="errors.email && touched.email">
                  {{ errors.email }}
                </span>
              </div>
              
              <div class="input-field col s12 pad0">
                <input 
                  id="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  class="inp-field"
                  v-model="formData.password"
                  :class="{ 'invalid': errors.password && touched.password }"
                  @blur="validateField('password')"
                >
                <label for="password" :class="{ 'active': formData.password }">PASSWORD</label>
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
                <span class="error-text" v-if="errors.password && touched.password">
                  {{ errors.password }}
                </span>
                
                <div class="right-align f-p-txt">
                  <NuxtLink to="/reset-password">
                    <i>forgot password?</i>
                  </NuxtLink>
                </div>
              </div>
              
              <div class="input-field col s12 pad0">
                <p>
                  <label>
                    <input 
                      type="checkbox" 
                      class="filled-in"
                      v-model="formData.rememberMe"
                    />
                    <span>Remember Me</span>
                  </label>
                </p>
              </div>
              
              <div class="button-div col s12 pad0">
                <button 
                  type="submit" 
                  class="submit-btn sec-bg"
                  :disabled="isSubmitting || hasErrors"
                >
                  {{ isSubmitting ? 'SIGNING IN...' : 'SIGN IN' }}
                </button>
              </div>
              
              <div class="col s12 center reg-lnk-div">
                Don't have an account? 
                <NuxtLink to="/register" class="sec-color">Create One</NuxtLink>
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
import { ref, reactive, computed } from 'vue'

import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';


const { authenticateUser, searchBusiness} = useAuthStore(); // use auth store
const { authenticated, userId, isBusinessRegistered } = storeToRefs(useAuthStore()); // make authenticated state reactive

console.log("UID", userId);

const router = useRouter();

const formData = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  email: '',
  password: ''
})

const touched = reactive({
  email: false,
  password: false
})

const showPassword = ref(false)
const isSubmitting = ref(false)

// Validation functions
const validateEmail = (email) => {
  if (!email) return 'Email is required'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return 'Please enter a valid email'
  return ''
}

const validatePassword = (password) => {
  if (!password) return 'Password is required'
  if (password.length < 8) return 'Password must be at least 8 characters'
  return ''
}

const validateField = (field) => {
  touched[field] = true
  if (field === 'email') {
    errors.email = validateEmail(formData.email)
  }
  if (field === 'password') {
    errors.password = validatePassword(formData.password)
  }
}

const validateForm = () => {
  validateField('email')
  validateField('password')
  return !errors.email && !errors.password
}

const hasErrors = computed(() => {
  return !!errors.email || !!errors.password
})

const isNightTime = computed(() => {
  const hours = new Date().getHours()
  return hours < 6 || hours >= 18
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  try {
    isSubmitting.value = true
    
    // Add your login logic here
    console.log('Login attempt with:', {
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe
    })
    
     await authenticateUser({email: formData.email, password: formData.password});
     const resp = await searchBusiness(formData.email);
     console.log("RESP...",authenticated, resp.length)
     console.log(authenticateUser)
     if (authenticated && resp.length > 0) {
         router.push('/');
     }else if(authenticated && isBusinessRegistered !== true){
         router.push('register-biz');
     }

    // Handle successful login
    // You might want to use useRouter() here to redirect
    
  } catch (error) {
    console.error('Login error:', error)
    // Handle login error
    alert('Login failed');
  } finally {
    isSubmitting.value = false
  }
}




</script>

<style scoped>
.hidden {
  display: none;
}

.invalid {
  border-color: red !important;
  box-shadow: 0 1px 0 0 red !important;
}

.error-text {
  color: red;
  font-size: 12px;
  display: block;
  margin-top: 5px;
}

.field-icon {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 35%;
  transform: translateY(-50%);
  margin-top: 0;
}

.input-field {
  position: relative;
  margin-bottom: 1rem;
}

.input-field label.active {
  transform: translateY(-14px) scale(0.8);
  transform-origin: 0 0;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
