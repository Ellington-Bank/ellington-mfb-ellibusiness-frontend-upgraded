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
              <div class="window-title-div">
                <h5 class="window-title">How can we help?</h5>
                <p>Reach out to our support team and we'll get back to you shortly</p>
              </div>
              <div class="window-form">
                <form @submit.prevent="handleSubmit">
                  <div class="input-field">
                    <input 
                      id="support-user-name" 
                      type="text" 
                      class="inp-field"
                      :class="{ 'has-error': errors.name }"
                      v-model="formData.name"
                      @blur="validateField('name')"
                    >
                    <label for="support-user-name">Name</label>
                    <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
                  </div>
                  <div class="input-field">
                    <input 
                      id="support-user-email" 
                      type="email" 
                      class="inp-field validate"
                      :class="{ 'has-error': errors.email }"
                      v-model="formData.email"
                      @blur="validateField('email')"
                    >
                    <label for="support-user-email">Email</label>
                    <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                  </div>
                  <div class="input-field">
                    <textarea 
                      id="support-message" 
                      class="materialize-textarea inp-field"
                      :class="{ 'has-error': errors.message }"
                      v-model="formData.message"
                      @blur="validateField('message')"
                    ></textarea>
                    <label for="support-message">Message / Request</label>
                    <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
                  </div>
                  <div class="file-field input-field">
                    <label for="" class="active">
                      Upload relevant document / Screenshot
                    </label>
                    <div class="fpw">
                      <div class="btn">
                        <span>
                          <i class="material-icons">cloud_upload</i>
                          Browse
                        </span>
                        <input 
                          type="file"
                          @change="handleFileChange"
                          accept="image/*,.pdf,.doc,.docx"
                        >
                      </div>
                      <div class="file-path-wrapper">
                        <input class="file-path validate inp-field" type="text" v-model="selectedFileName" readonly>
                      </div>
                    </div>
                  </div>
                  <div class="submit-btn-div">
                    <button 
                      type="submit" 
                      class="submit-btn sec-bg"
                      :disabled="isSubmitting"
                    >
                      {{ isSubmitting ? 'SENDING...' : 'SEND' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import SideNav from '@/components/SideNav.vue'

const formData = reactive({
  name: '',
  email: '',
  message: '',
  file: null
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const selectedFileName = ref('')

const validateField = (field) => {
  errors[field] = ''
  
  switch (field) {
    case 'name':
      if (!formData.name) errors.name = 'Name is required'
      break
    case 'email':
      if (!formData.email) {
        errors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email'
      }
      break
    case 'message':
      if (!formData.message) errors.message = 'Message is required'
      break
  }
}

const validateForm = () => {
  validateField('name')
  validateField('email')
  validateField('message')
  return !errors.name && !errors.email && !errors.message
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    formData.file = file
    selectedFileName.value = file.name
  }
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  try {
    isSubmitting.value = true
    
    // Create FormData for submission
    const submitData = new FormData()
    submitData.append('name', formData.name)
    submitData.append('email', formData.email)
    submitData.append('message', formData.message)
    if (formData.file) {
      submitData.append('file', formData.file)
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Form submitted:', submitData)
    
    // Reset form
    formData.name = ''
    formData.email = ''
    formData.message = ''
    formData.file = null
    selectedFileName.value = ''
    
  } catch (error) {
    console.error('Submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped src="@/assets/css/form-styles.css"></style>
<style scoped src="@/assets/css/support.css"></style>

<style scoped>
.content-window {
    width: 46%;
}
h5.window-title {
    font-size: 1.5rem;
    font-weight: 600;
}

.main-cont{
    height: 100vh;
}
.main-cont > .row{
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

/* Additional styles for form functionality */
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

.submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.input-field label.active {
    transform: translateY(-14px) scale(0.8);
}

/* File upload button hover state */
.file-field .btn:hover {
    opacity: 0.9;
}

/* Textarea auto-resize */
.materialize-textarea {
    min-height: 100px;
    resize: vertical;
}
</style>