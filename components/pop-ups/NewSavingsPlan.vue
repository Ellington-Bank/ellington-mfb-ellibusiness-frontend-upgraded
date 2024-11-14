<template>
  <!-- Modal Structure -->
  <div id="new-savings-plan" class="modal">
    <div class="modal-content">
      <div class="request-wrapper">
        <div class="request-desc">
          <h5 class="request-title">New Savings Plan</h5>
        </div>

        <form @submit.prevent>
          <div class="">
            <!-- Savings Name Input -->
            <div class="input-field">
              <input id="savings-name" type="text" class="inp-field" v-model="savingsName" />
              <label for="savings-name">Savings Name</label>
            </div>

            <!-- Savings Plan Select -->
            <div class="input-field">
              <select id="savings-plan" v-model="selectedPlan">
                <option value="1">1 month</option>
                <option value="2">3 months</option>
                <option value="3">6 months</option>
                <option value="4">1 year</option>
                <option value="5">2 years</option>
              </select>
              <label for="savings-plan">Savings Plan</label>
            </div>

            <!-- Transaction Pin Input -->
            <div class="input-field">
              <input id="transaction-pin" type="password" class="inp-field" v-model="transactionPin" />
              <label for="transaction-pin">Transaction Pin</label>
            </div>

            <!-- Terms and Conditions Checkbox -->
            <div class="check-field">
              <label>
                <input type="checkbox" class="filled-in" v-model="agreedToTerms" />
                <span>
                  By signing up on our savings feature, you have agreed to the
                  <a href="/" target="_blank" class="sec-color underlined" rel="noopener noreferrer">Terms and Conditions</a>
                  on the AiroBusiness Savings platform
                </span>
              </label>
            </div>
          </div>

          <!-- Buttons -->
          <div class="form-btn-wrapper">
            <div class="grid-split-2">
              <button class="sec-btn cancel-btn modal-close" type="button">Cancel</button>
              <button class="submit-btn sec-bg modal-close" type="button" @click="handleSubmit">Done</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import M from 'materialize-css'

// State variables
const savingsName = ref('')
const selectedPlan = ref('1')
const transactionPin = ref('')
const agreedToTerms = ref(false)

// Handle form submission
const handleSubmit = () => {
  if (agreedToTerms.value) {
    console.log('Form submitted:', { savingsName: savingsName.value, selectedPlan: selectedPlan.value, transactionPin: transactionPin.value })
  } else {
    alert('You need to agree to the terms and conditions.')
  }
}

// Initialize Materialize CSS components
onMounted(() => {
  M.AutoInit()
})
</script>

<style scoped src="~/assets/css/form-styles.css"></style>

<style scoped>
.modal {
  max-height: 80%;
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
  grid-template-columns: calc(50% - 5px) calc(50% - 5px);
  grid-gap: 10px;
}
button.submit-btn, button.cancel-btn {
  width: 100%;
}
.select-wrapper+label {
  left: 0 !important;
  top: -34px;
  font-size: 11px;
  font-weight: 500;
}
.input-field>label.active {
  font-size: 14px;
  font-weight: 500;
}
.check-field label span {
  font-size: 12px !important;
}
h5.request-title {
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  margin-top: 10px;
}
.dropdown-content li>a, .dropdown-content li>span {
  font-size: 14px;
  padding: 12px 14px;
}
</style>
