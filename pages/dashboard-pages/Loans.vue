<template>
  <div class="main-cont">
    <div class="row">
      <div class="col s12 m3 pad0 side-nav-wrapper">
        <SideNav />
      </div>
      <div class="col s12 m9 pad0 content-side-wrapper">
        <TopNav />

        <div class="content-container">
          <div class="welcome-intro">
            <h4>
              <span>Loans </span>
            </h4>
            <p>Apply for Loan here </p>
          </div>
          <div class="container">
            <div class="loan-applicant flex-div">
              <div class="loan-user-img">
                <img src="@/assets/images/user.svg" alt="user" class="user-pic">
              </div>
              <div class="loan-user-details">
                <b class="loan-user-name">Godson Imule</b> <br>
                <span class="loan-user-bvn">BVN: 2269348902</span>
              </div>
            </div>
            <form class="loan-form-wrapper" id="loan-form" @submit.prevent="handleSubmit">
              <div class="file-field input-field">
                <label class="active">
                  UPLOAD SUPPORTING DOCUMENTS (PDF)
                  <small 
                    class="sec-color pointer"
                    @click="showDocumentRequirements"
                  >
                    SEE REQUIRED DOCUMENTS*
                  </small>
                </label>
                <div class="fpw">
                  <div class="btn">
                    <span>
                      <i class="material-icons">cloud_upload</i>
                      Browse
                    </span>
                    <input 
                      type="file" 
                      @change="handleFileUpload"
                      accept=".pdf"
                    >
                  </div>
                  <div class="file-path-wrapper">
                    <input 
                      class="file-path validate inp-field" 
                      type="text"
                      v-model="selectedFileName"
                      readonly
                    >
                  </div>
                </div>
                <span v-if="errors.file" class="error-text">{{ errors.file }}</span>
              </div>

              <div class="grid-split-2 input-field">
                <div class="input-field m6 mag0">
                  <input 
                    id="how-much" 
                    type="text" 
                    class="inp-field"
                    v-model="formData.amount"
                    @input="formatAmount"
                    :class="{ 'invalid': errors.amount }"
                  >
                  <label for="how-much">HOW MUCH DO YOU WANT?</label>
                  <span v-if="errors.amount" class="error-text">{{ errors.amount }}</span>
                </div>
                <div class="input-field m6 mag0">
                  <input 
                    id="tenor" 
                    type="number" 
                    class="inp-field" 
                    max="24"
                    v-model="formData.tenor"
                    :class="{ 'invalid': errors.tenor }"
                  >
                  <label for="tenor">TENOR (MONTHS)</label>
                  <span v-if="errors.tenor" class="error-text">{{ errors.tenor }}</span>
                </div>
              </div>

              <div class="form-btn-wrapper">
                <button 
                  type="submit" 
                  class="submit-btn sec-bg"
                  :disabled="isSubmitting"
                  data-target="loan-popup"
                >
                  {{ isSubmitting ? 'SUBMITTING...' : 'SUBMIT' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-wrapper">
      <LoanPopup />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import SideNav from "@/components/SideNav.vue"
import TopNav from "@/components/TopNav.vue"
import LoanPopup from '@/components/pop-ups/LoanPopup.vue'
import M from 'materialize-css'

const formData = reactive({
  amount: '',
  tenor: '',
  file: null
})

const errors = reactive({
  amount: '',
  tenor: '',
  file: ''
})

const isSubmitting = ref(false)
const selectedFileName = ref('')

onMounted(() => {
  const elemsModal = document.querySelectorAll('.modal')
  M.Modal.init(elemsModal)
})

const formatAmount = () => {
  // Remove non-numeric characters
  let value = formData.amount.replace(/\D/g, '')
  
  // Format with commas
  if (value) {
    value = Number(value).toLocaleString('en-US')
    formData.amount = value
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  errors.file = ''
  
  if (file) {
    if (file.type !== 'application/pdf') {
      errors.file = 'Please upload a PDF file'
      event.target.value = ''
      return
    }
    
    if (file.size > 5000000) { // 5MB limit
      errors.file = 'File size should be less than 5MB'
      event.target.value = ''
      return
    }
    
    formData.file = file
    selectedFileName.value = file.name
  }
}

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')
  
  if (!formData.amount) {
    errors.amount = 'Please enter loan amount'
    isValid = false
  }
  
  if (!formData.tenor) {
    errors.tenor = 'Please enter loan tenor'
    isValid = false
  } else if (formData.tenor > 24) {
    errors.tenor = 'Maximum tenor is 24 months'
    isValid = false
  }
  
  if (!formData.file) {
    errors.file = 'Please upload supporting documents'
    isValid = false
  }
  
  return isValid
}

const showDocumentRequirements = () => {
  M.toast({ 
    html: `Required documents: Government ID, Bank Statements, Proof of Income`, 
    displayLength: 4000 
  })
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  try {
    isSubmitting.value = true
    
    // Create FormData for submission
    const submitData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value) submitData.append(key, value)
    })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show loan popup
    const modal = M.Modal.getInstance(document.querySelector('#loan-popup'))
    modal.open()
    
  } catch (error) {
    console.error('Submission error:', error)
    M.toast({ html: 'Error submitting loan application', classes: 'red' })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped src="@/assets/css/form-styles.css"></style>

<style scoped>
.welcome-intro {
    width: 95%;
    margin: auto;
    margin-bottom: 20px;
}
.welcome-intro h4 {
    margin-bottom: 0;
}
.welcome-intro p {
    margin-top: 5px;
    opacity: 0.8;
}
.loan-applicant.flex-div {
    padding: 15px 0;
}
.loan-user-img {
    margin-right: 10px;
}
img.user-pic {
    position: relative;
    top: 3px;
}
span.loan-user-bvn {
    opacity: 0.8;
    font-size: 14px;
}
form.loan-form-wrapper {
    margin: 60px 0 20px;
}
.input-field {
    margin: 45px 0;
}
.form-btn-wrapper button.submit-btn.sec-bg {
    width: 40%;
    margin-left: 30%;
}
i.material-icons {
    position: relative;
    line-height: 1;
    top: 5px;
}
</style>

<style scoped>
.main-cont{
    height: 100vh;
}
.main-cont > .row{
    width: 100%;
    margin: 0;
}
.center-form-div.container {
    width: 50%;
}
.content-container {
    margin-top: calc(64px + 1.2rem);
}
.content-container > .container{
    min-height: calc(100vh - 200px);
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
</style>