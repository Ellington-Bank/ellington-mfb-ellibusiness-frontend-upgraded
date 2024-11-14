<template>
  <!-- Modal Structure -->
  <div id="session-expired" class="modal">
    <div class="modal-content center">
      <div class="request-wrapper center">
        <div class="request-icon-div">
          <img src="~/assets/images/time.svg" alt="time-out" />
        </div>
        <div class="request-desc">
          <h5 class="request-title">Session expired due to inactivity</h5>
          <span>Enter your password to continue using the portal</span>
        </div>

        <form @submit.prevent="handleLogin">
          <!-- Email Input -->
          <div class="input-field">
            <input id="login-email" type="email" class="inp-field" v-model="email" required />
            <label for="login-email">Email</label>
          </div>

          <!-- Password Input -->
          <div class="input-field">
            <input id="login-password" type="password" class="inp-field" v-model="password" required />
            <label for="login-password">Password</label>
          </div>

          <!-- Buttons -->
          <div class="form-btn-wrapper">
            <div class="grid-split-2">
              <NuxtLink to="/" class="sec-btn cancel-btn">Exit</NuxtLink>
              <button class="submit-btn sec-bg" type="submit">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'nuxt/app'

const email = ref('')
const password = ref('')
const router = useRouter()

// Handle form submission
const handleLogin = async () => {
  if (email.value && password.value) {
    // Implement your authentication logic here
    console.log('Logging in with:', { email: email.value, password: password.value })
    
    // Redirect to dashboard on successful login
    await router.push('/dashboard')
  } else {
    alert('Please enter both email and password.')
  }
}
</script>

<style scoped src="~/assets/css/form-styles.css"></style>

<style scoped>
#session-expired {
  width: 30%;
  max-width: 380px;
  min-width: 200px;
}
.form-btn-wrapper {
  margin: 30px 0 10px;
}
button.submit-btn, button.cancel-btn {
  height: 42px;
  font-size: 13px;
  border-radius: 4px;
}
.modal-content h4 {
  font-size: 1.7rem;
}
.grid-split-2 {
  display: grid;
  grid-template-columns: calc(50% - 12px) calc(50% - 12px);
}
.modal {
  max-height: 80%;
}
</style>

<style scoped>
.request-icon-div img {
  width: 65px;
  margin-bottom: 20px;
}
.request-desc {
  font-size: 14px;
  color: #676B71;
  margin-bottom: 40px;
}
h5.request-title {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.3px;
  color: #252B33;
  margin-top: 10px;
}
.request-cta-btn-div {
  margin: 30px 0;
}
button.request-cta-btn.sec-btn {
  padding: 15px 45px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}
button.request-cta-btn.sec-btn:focus,
button.request-cta-btn.sec-btn:hover {
  color: white;
  background-color: var(--sec-color);
}
.request-wrapper.center {
  margin: 10px 0;
}
</style>
