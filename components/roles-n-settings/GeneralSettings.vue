<template>
  <div>
    <div class="content-container">
      <!-- Personal Information Form -->
      <div class="container personal--info rel">
        <div class="row">
          <form @submit.prevent="savePersonalInfo">
            <div class="sect-title-header flex-div col s12">
              <h5 class="sect-title fg-1">Personal Information</h5>
              <div>
                <button 
                  type="submit" 
                  class="sec-bg submit-btn"
                  :disabled="isSavingPersonal"
                >
                  {{ isSavingPersonal ? 'SAVING...' : 'SAVE' }}
                </button>
              </div>
            </div>
            <div class="col s12 m9">
              <div class="input-field col s12 m6 pad0">
                <input 
                  id="first--name" 
                  type="text" 
                  class="inp-field"
                  v-model="personalInfo.firstName"
                  :class="{ 'invalid': errors.firstName }"
                >
                <label for="first--name">FIRST NAME</label>
                <span v-if="errors.firstName" class="helper-text red-text">{{ errors.firstName }}</span>
              </div>
              <div class="input-field col s12 m6 pad0">
                <input 
                  id="last--name" 
                  type="text" 
                  class="inp-field"
                  v-model="personalInfo.lastName"
                  :class="{ 'invalid': errors.lastName }"
                >
                <label for="last--name">LAST NAME</label>
                <span v-if="errors.lastName" class="helper-text red-text">{{ errors.lastName }}</span>
              </div>
              <div class="input-field col s12 m6 pad0">
                <input 
                  id="user--email" 
                  type="email" 
                  class="inp-field"
                  v-model="personalInfo.email"
                  :class="{ 'invalid': errors.email }"
                >
                <label for="user--email">EMAIL</label>
                <span v-if="errors.email" class="helper-text red-text">{{ errors.email }}</span>
              </div>
              <div class="input-field col s12 m6 pad0">
                <input 
                  id="phone--number" 
                  type="tel" 
                  class="inp-field"
                  v-model="personalInfo.phone"
                  :class="{ 'invalid': errors.phone }"
                >
                <label for="phone--number">PHONE</label>
                <span v-if="errors.phone" class="helper-text red-text">{{ errors.phone }}</span>
              </div>

              <div class="col s12 pad0">
                <h6 class="password-title">PASSWORD</h6>
              </div>
              <transition name="fade">
                <div v-show="showPasswordFields">
                  <div class="input-field col s12 m6 password-sec pad0">
                    <input 
                      id="new-password" 
                      :type="showPassword ? 'text' : 'password'"
                      class="inp-field"
                      v-model="personalInfo.newPassword"
                      :class="{ 'invalid': errors.newPassword }"
                    >
                    <label for="new-password">New Password</label>
                    <span v-if="errors.newPassword" class="helper-text red-text">{{ errors.newPassword }}</span>
                  </div>
                  <div class="input-field col s12 m6 password-sec pad0">
                    <input 
                      id="confirm-new-password" 
                      :type="showPassword ? 'text' : 'password'"
                      class="inp-field"
                      v-model="personalInfo.confirmPassword"
                      :class="{ 'invalid': errors.confirmPassword }"
                    >
                    <label for="confirm-new-password">Confirm Password</label>
                    <span v-if="errors.confirmPassword" class="helper-text red-text">{{ errors.confirmPassword }}</span>
                  </div>
                </div>
              </transition>
              <div class="input-field col s12 pad0">
                <button 
                  id="change-password-btn" 
                  type="button"
                  v-show="!showPasswordFields"
                  @click="togglePasswordFields"
                >
                  CHANGE PASSWORD
                </button>
              </div>
            </div>
            <div class="col s12 m3"></div>
          </form>
        </div>
      </div>

      <!-- Business Information Form -->
      <div class="container bizness--info rel">
        <div class="row">
          <form @submit.prevent="saveBusinessInfo">
            <div class="sect-title-header flex-div col s12">
              <h5 class="sect-title fg-1">Business Information</h5>
              <div>
                <button 
                  type="submit" 
                  class="sec-bg submit-btn"
                  :disabled="isSavingBusiness"
                >
                  {{ isSavingBusiness ? 'SAVING...' : 'SAVE' }}
                </button>
              </div>
            </div>
            <div class="col s12 m9">
              <div class="input-field col s12 m6 pad0">
                <input 
                  id="business--name" 
                  type="text" 
                  class="inp-field"
                  v-model="businessInfo.name"
                  :class="{ 'invalid': errors.businessName }"
                >
                <label for="business--name">BUSINESS NAME</label>
                <span v-if="errors.businessName" class="helper-text red-text">{{ errors.businessName }}</span>
              </div>
              <div class="input-field col s12 m6 pad0">
                <input 
                  id="business--phone" 
                  type="tel" 
                  class="inp-field"
                  v-model="businessInfo.phone"
                  :class="{ 'invalid': errors.businessPhone }"
                >
                <label for="business--phone">BUSINESS PHONE NUMBER</label>
                <span v-if="errors.businessPhone" class="helper-text red-text">{{ errors.businessPhone }}</span>
              </div>
              <div class="input-field col s12 m6 pad0">
                <input 
                  id="business--email" 
                  type="email" 
                  class="inp-field"
                  v-model="businessInfo.email"
                  :class="{ 'invalid': errors.businessEmail }"
                >
                <label for="business--email">BUSINESS EMAIL</label>
              </div>
              <div class="input-field col s12 m6 pad0">
                <input 
                  id="business--address" 
                  type="text" 
                  class="inp-field"
                  v-model="businessInfo.address"
                  :class="{ 'invalid': errors.businessAddress }"
                >
                <label for="business--address">BUSINESS ADDRESS</label>
              </div>
              <div class="input-field col s12 m6 pad0">
                <input 
                  id="support--email" 
                  type="email" 
                  class="inp-field"
                  v-model="businessInfo.supportEmail"
                  :class="{ 'invalid': errors.supportEmail }"
                >
                <label for="support--email">SUPPORT EMAIL</label>
              </div>
              <div class="input-field col s12 m6 pad0">
                <input 
                  id="support--phone" 
                  type="tel" 
                  class="inp-field"
                  v-model="businessInfo.supportPhone"
                  :class="{ 'invalid': errors.supportPhone }"
                >
                <label for="support--phone">SUPPORT PHONE NUMBER</label>
              </div>
            </div>
            <div class="col s12 m3">
              <div class="center">
                <div class="input-field bizess-avatar-div">
                  <img 
                    :src="logoPreview || '/images/jr.png'" 
                    alt="business avatar" 
                    class="bizness-avatar"
                  >
                  <p>Change business logo</p>
                  <div class="file-field input-field">
                    <div class="btn">
                      <span>
                        <i class="material-icons">add_box</i>
                        Select File
                      </span>
                      <input 
                        type="file"
                        @change="handleLogoUpload"
                        accept="image/*"
                      >
                    </div>
                    <div class="file-path-wrapper">
                      <input class="file-path validate inp-field" type="text" readonly>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import M from 'materialize-css'

// State
const showPasswordFields = ref(false)
const showPassword = ref(false)
const isSavingPersonal = ref(false)
const isSavingBusiness = ref(false)
const logoPreview = ref(null)

const personalInfo = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  newPassword: '',
  confirmPassword: ''
})

const businessInfo = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
  supportEmail: '',
  supportPhone: '',
  logo: null
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  newPassword: '',
  confirmPassword: '',
  businessName: '',
  businessPhone: '',
  supportEmail: '',
  supportPhone: ''
})

// Methods
const togglePasswordFields = () => {
  showPasswordFields.value = !showPasswordFields.value
}

const handleLogoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (!file.type.startsWith('image/')) {
      M.toast({ html: 'Please select an image file', classes: 'red' })
      return
    }
    
    if (file.size > 5000000) {
      M.toast({ html: 'File size should be less than 5MB', classes: 'red' })
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      logoPreview.value = e.target.result
      businessInfo.logo = file
    }
    reader.readAsDataURL(file)
  }
}

const validatePersonalInfo = () => {
  let isValid = true
  errors.firstName = !personalInfo.firstName ? 'First name is required' : ''
  errors.lastName = !personalInfo.lastName ? 'Last name is required' : ''
  errors.email = !personalInfo.email ? 'Email is required' : ''
  errors.phone = !personalInfo.phone ? 'Phone number is required' : ''
  
  if (showPasswordFields.value) {
    if (personalInfo.newPassword) {
      if (personalInfo.newPassword.length < 8) {
        errors.newPassword = 'Password must be at least 8 characters'
        isValid = false
      } else if (personalInfo.newPassword !== personalInfo.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
        isValid = false
      }
    }
  }
  
  return isValid && !Object.values(errors).some(error => error)
}

const savePersonalInfo = async () => {
  if (!validatePersonalInfo()) return
  
  try {
    isSavingPersonal.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    M.toast({ html: 'Personal information saved successfully!', classes: 'green' })
  } catch (error) {
    console.error('Error:', error)
    M.toast({ html: 'Failed to save changes', classes: 'red' })
  } finally {
    isSavingPersonal.value = false
  }
}

const saveBusinessInfo = async () => {
  try {
    isSavingBusiness.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    M.toast({ html: 'Business information saved successfully!', classes: 'green' })
  } catch (error) {
    console.error('Error:', error)
    M.toast({ html: 'Failed to save changes', classes: 'red' })
  } finally {
    isSavingBusiness.value = false
  }
}
</script>

<style scoped src="@/assets/css/roles-settings.css"></style>

<style scoped>
.content-container > .container.rel {
  min-height: initial;
  padding: 20px 30px 10px;
  border: none;
  box-shadow: 0px 5px 24px rgb(12 37 86 / 15%);
  margin: 0 auto;
  width: 100%;
}
button#change-password-btn {
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
  padding: 10px 40px;
  border-radius: 8px;
  border: none;
  background: rgba(208, 215, 230, 0.7);
  color: var(--pry-txt-color);
  cursor: pointer;
}
.container.bizness--info.rel {
    margin-top: 40px;
}
.file-field .file-path-wrapper {
  display: none;
}
.file-field .btn {
    position: relative;
    width: 150px;
    font-size: 14px;
    line-height: 17px;
    float: none;
    background-color: rgb(197 197 197 / 30%);
    color: #252B33;
}
.btn i.material-icons {
    position: relative;
    top: 4px;
    line-height: 2;
}
</style>

<style>
.password-sec {
  transition: all 0.3s ease-in-out;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.helper-text.red-text {
  font-size: 12px;
  margin-top: 4px;
}
</style>