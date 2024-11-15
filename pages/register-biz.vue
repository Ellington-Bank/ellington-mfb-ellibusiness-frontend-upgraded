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
        <div class="auth-wrapper col s12 m11">
          <div class="greeting-div col s12">
            <h4 class="pry-color">
              Tell us about your business
            </h4>
            <span>A few more things to help us set up your dashboard</span>
          </div>
          <div class="form-wrapper col s12">
            <form @submit.prevent="handleSubmit">
              <div class="input-field col s12 pad0">
                <div class="input-field col s12 m6 pad0-left">
                  <input 
                    id="biz_name" 
                    type="text" 
                    class="inp-field"
                    v-model="formData.businessName"
                    :class="{ 'has-error': errors.businessName }"
                    @blur="validateField('businessName')"
                  >
                  <label for="biz_name">Business/Company Name</label>
                  <span v-if="errors.businessName" class="error-message">{{ errors.businessName }}</span>
                </div>
                <div class="input-field col s12 m6 pad0-right">
                  <div class="form-notice">
                    <img src="@/assets/images/alert(fill).svg" alt="alert" /> <br />
                    <span>
                      If your business is registered, please ensure that the business 
                      name provided is the same name on your registration documents.
                    </span>
                  </div>
                </div>
              </div>

              <div class="input-field col s12 pad0">
                <div class="fs-title">What type of business do you run?</div>
                <div class="col s12 pad0">
                  <div 
                    class="project-type col s12 m10"
                    :class="{ 'selected': formData.businessType === 'Individual' }"
                  >
                    <div class="checkbox">
                      <input 
                        type="radio" 
                        id="individual-biz" 
                        name="type-of-biz" 
                        value="Individual"
                        v-model="formData.businessType"
                      >
                      <label for="individual-biz" class="radio-div">
                        <div class="radio-img-icon">
                          <img src="@/assets/images/individual.svg" alt="individual">
                        </div>
                        <div class="radio-opt-desc">
                          <span>Individual</span> <br />
                          <small>An unregistered business e.g freeelancers and sole traders.</small>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col s12 pad0">
                  <div 
                    class="project-type col s12 m10"
                    :class="{ 'selected': formData.businessType === 'Registered' }"
                  >
                    <div class="checkbox">
                      <input 
                        type="radio" 
                        id="registered-biz" 
                        name="type-of-biz" 
                        value="Registered"
                        v-model="formData.businessType"
                      >
                      <label for="registered-biz" class="radio-div">
                        <div class="radio-img-icon">
                          <img src="@/assets/images/registered.svg" alt="registered">
                        </div>
                        <div class="radio-opt-desc">
                          <span>Registered</span> <br />
                          <small>A registered business with a corporate bank account.</small>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <span v-if="errors.businessType" class="error-message">{{ errors.businessType }}</span>
              </div>

              <div class="input-field col s12"></div>

              <div class="input-field col s12 pad0">
                <div class="input-field col s12 m6 pad0-left">
                  <select 
                    id="country-base"
                    v-model="formData.country"
                    @blur="validateField('country')"
                  >
                    <option value="" disabled>Select country</option>
                    <option v-for="country in countries" :key="country.value" :value="country.value">
                      {{ country.label }}
                    </option>
                  </select>
                  <label for="country-base">What country are you based in?</label>
                  <span v-if="errors.country" class="error-message">{{ errors.country }}</span>
                </div>
                <div class="input-field col s12 m6 pad0-right">
                  <select 
                    id="business-size"
                    v-model="formData.businessSize"
                    @blur="validateField('businessSize')"
                  >
                    <option value="" disabled>Select size</option>
                    <option v-for="size in businessSizes" :key="size.value" :value="size.value">
                      {{ size.label }}
                    </option>
                  </select>
                  <label for="business-size">Business Size</label>
                  <span v-if="errors.businessSize" class="error-message">{{ errors.businessSize }}</span>
                </div>
              </div>

              <div class="input-field col s12 pad0">
                <div class="input-field col s12 m6 pad0-left">
                  <select 
                    id="are-u-a-dev"
                    v-model="formData.isDeveloper"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  <label for="are-u-a-dev">Are you a software developer?</label>
                </div>
                <div class="input-field col s12 m6 pad0-right">
                  <input 
                    id="referral" 
                    type="text" 
                    class="inp-field"
                    v-model="formData.referralCode"
                  >
                  <label for="referral">Referral Code</label>
                </div>
              </div>

              <div class="button-div col s12 pad0 m8 offset-m2">
                <button 
                  type="submit" 
                  class="submit-btn sec-bg"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'SUBMITTING...' : 'SUBMIT' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const formData = reactive({
  businessName: '',
  businessType: '',
  country: '',
  businessSize: '',
  isDeveloper: 'no',
  referralCode: ''
})

const errors = reactive({
  businessName: '',
  businessType: '',
  country: '',
  businessSize: ''
})

const isSubmitting = ref(false)

const countries = [
  { value: '1', label: 'Nigeria' },
  { value: '2', label: 'Ghana' },
  { value: '3', label: 'Togo' },
  { value: '4', label: 'South Africa' },
  { value: '5', label: 'Kenya' }
]

const businessSizes = [
  { value: '1', label: '0-10 employees' },
  { value: '2', label: '11-20 employees' },
  { value: '3', label: '21-30 employees' },
  { value: '4', label: '31+ employees' }
]

const validateField = (field) => {
  errors[field] = ''
  
  switch (field) {
    case 'businessName':
      if (!formData.businessName) errors.businessName = 'Business name is required'
      break
    case 'businessType':
      if (!formData.businessType) errors.businessType = 'Please select a business type'
      break
    case 'country':
      if (!formData.country) errors.country = 'Please select your country'
      break
    case 'businessSize':
      if (!formData.businessSize) errors.businessSize = 'Please select your business size'
      break
  }
}

const validateForm = () => {
  validateField('businessName')
  validateField('businessType')
  validateField('country')
  validateField('businessSize')
  return !Object.values(errors).some(error => error)
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  try {
    isSubmitting.value = true
    console.log('Form submitted:', formData)
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Handle successful submission
  } catch (error) {
    console.error('Submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  // Initialize selects if needed
})
</script>

<style src="@/assets/css/register-biz.css"></style>

<style>
.dropdown-content li>a, .dropdown-content li>span{
    color: var(--pry-color) !important;
}
.select-wrapper input.select-dropdown {
    border: 1px solid #D0D7E6 !important;
    border-radius: 10px !important;
    height: 48px !important;
    padding: 0 5px !important;
    width: calc(100% - 10px) !important;
}
.input-field.col>.select-wrapper+label{
    top: -34px;
    font-size: 13px;
    font-weight: 500;
}
.input-field.pad0-right.col>.select-wrapper+label, .input-field.pad0-right.col>label.active{
    left: 0.75rem !important;
}
.input-field.pad0-left.col>.select-wrapper+label {
    left: 0 !important;
}

/* Additional styles for functionality */
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
</style>

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
.auth-wrapper {
    margin-top: 20px;
}

.form-notice {
    font-size: 11px;
    line-height: 1.3;
    background-color: #F8F9FA;
    padding: 9px;
    border-radius: 6px;
    margin-top: -15px;
}
</style>