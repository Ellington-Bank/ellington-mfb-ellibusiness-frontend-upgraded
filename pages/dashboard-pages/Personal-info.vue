<template>
  <div class="main-cont">
    <div class="row">
      <div class="col s12 m3 pad0 side-nav-wrapper">
        <SideNav />
      </div>
      <div class="col s12 m9 pad0 content-side-wrapper">
        <TopNav />

        <div class="content-container">
          <div class="container">
            <div class="welcome-intro center">
              <h4>
                <span>Personal Information</span>
              </h4>
            </div>
            <div class="center-form-div container">
              <form class="s12 pad0" @submit.prevent="handleSubmit">
                <div class="input-field">
                  <input 
                    id="bvn" 
                    type="tel" 
                    class="inp-field"
                    v-model="formData.bvn"
                    :class="{ 'invalid': errors.bvn }"
                  >
                  <label for="bvn">BVN</label>
                  <small class="sec-color">To get your BVN dial *565*0# on your registered mobile number.</small>
                  <span v-if="errors.bvn" class="error-text">{{ errors.bvn }}</span>
                </div>

                <div class="grid-split-2 input-field">
                  <div class="input-field m6 mag0">
                    <input 
                      id="first_name" 
                      type="text" 
                      class="inp-field"
                      v-model="formData.firstName"
                      :class="{ 'invalid': errors.firstName }"
                    >
                    <label for="first_name">First Name</label>
                    <span v-if="errors.firstName" class="error-text">{{ errors.firstName }}</span>
                  </div>
                  <div class="input-field m6 mag0">
                    <input 
                      id="last_name" 
                      type="text" 
                      class="inp-field"
                      v-model="formData.lastName"
                      :class="{ 'invalid': errors.lastName }"
                    >
                    <label for="last_name">Last Name</label>
                    <span v-if="errors.lastName" class="error-text">{{ errors.lastName }}</span>
                  </div>
                </div>

                <div class="input-field">
                  <input 
                    id="phone" 
                    type="tel" 
                    class="inp-field"
                    v-model="formData.phone"
                    :class="{ 'invalid': errors.phone }"
                  >
                  <label for="phone">Phone Number</label>
                  <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
                </div>

                <div class="input-field">
                  <input 
                    id="dob" 
                    type="text" 
                    class="datepicker inp-field"
                    ref="datepicker"
                    v-model="formData.dob"
                    :class="{ 'invalid': errors.dob }"
                  >
                  <label for="dob">Date of Birth</label>
                  <span v-if="errors.dob" class="error-text">{{ errors.dob }}</span>
                </div>

                <div class="file-field input-field">
                  <label class="active">Upload ID</label>
                  <div class="fpw">
                    <div class="btn">
                      <span>Browse</span>
                      <input 
                        type="file" 
                        @change="handleFileUpload"
                        accept="image/*"
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
                  <small class="pry-color file-field-desc">
                    Please upload a valid means of identification: 
                    the file must be an image (.jpg, .png etc) less that 5MB.
                  </small>
                  <span v-if="errors.idFile" class="error-text">{{ errors.idFile }}</span>
                </div>

                <div class="form-btn-wrapper">
                  <div class="grid-split-2">
                    <button 
                      type="button"
                      class="sec-btn cancel-btn modal-trigger" 
                      data-target="confirm-cancel"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      class="submit-btn sec-bg"
                      :disabled="isSubmitting"
                    >
                      {{ isSubmitting ? 'Saving...' : 'Save' }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-wrapper">
      <ConfirmPopup />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import SideNav from "@/components/SideNav.vue"
import TopNav from "@/components/TopNav.vue"
import ConfirmPopup from '@/components/pop-ups/ConfirmPopup.vue'
import M from 'materialize-css'

const formData = reactive({
  bvn: '',
  firstName: '',
  lastName: '',
  phone: '',
  dob: '',
  idFile: null
})

const errors = reactive({
  bvn: '',
  firstName: '',
  lastName: '',
  phone: '',
  dob: '',
  idFile: ''
})

const isSubmitting = ref(false)
const selectedFileName = ref('')
const datepicker = ref(null)

onMounted(() => {
  // Initialize Materialize components
  const elemsModal = document.querySelectorAll('.modal')
  M.Modal.init(elemsModal)

  // Initialize datepicker with custom options
  const dpElem = document.querySelector('.datepicker')
  M.Datepicker.init(dpElem, {
    format: 'yyyy-mm-dd',
    yearRange: 100,
    maxDate: new Date(Date.now() - (18 * 365 * 24 * 60 * 60 * 1000)), // 18 years ago
    onSelect: (date) => {
      formData.dob = M.Datepicker.getInstance(dpElem).toString()
    }
  })
})

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')
  
  if (!formData.bvn) {
    errors.bvn = 'BVN is required'
    isValid = false
  } else if (!/^\d{11}$/.test(formData.bvn)) {
    errors.bvn = 'BVN must be 11 digits'
    isValid = false
  }

  if (!formData.firstName) {
    errors.firstName = 'First name is required'
    isValid = false
  }

  if (!formData.lastName) {
    errors.lastName = 'Last name is required'
    isValid = false
  }

  if (!formData.phone) {
    errors.phone = 'Phone number is required'
    isValid = false
  } else if (!/^\d{11}$/.test(formData.phone)) {
    errors.phone = 'Invalid phone number'
    isValid = false
  }

  if (!formData.dob) {
    errors.dob = 'Date of birth is required'
    isValid = false
  }

  if (!formData.idFile) {
    errors.idFile = 'ID file is required'
    isValid = false
  }

  return isValid
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (!file.type.startsWith('image/')) {
      errors.idFile = 'Please upload an image file'
      event.target.value = ''
      return
    }
    
    if (file.size > 5000000) { // 5MB
      errors.idFile = 'File size should be less than 5MB'
      event.target.value = ''
      return
    }
    
    formData.idFile = file
    selectedFileName.value = file.name
    errors.idFile = ''
  }
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
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Form submitted:', Object.fromEntries(submitData.entries()))
    
    M.toast({ html: 'Personal information saved successfully!', classes: 'green' })
    
  } catch (error) {
    console.error('Submission error:', error)
    M.toast({ html: 'Error saving information', classes: 'red' })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped src="@/assets/css/form-styles.css"></style>

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