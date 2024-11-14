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
                <span>Business Information</span>
              </h4>
            </div>
            <div class="center-form-div container">
              <form class="s12 pad0" @submit.prevent="handleSubmit">
                <div class="input-field">
                  <input 
                    id="biz-purpose" 
                    type="text" 
                    class="inp-field"
                    v-model="formData.businessPurpose"
                  >
                  <label for="biz-purpose">What do you do at Thrift9ja?</label>
                  <small class="">
                    For example: Soles n Shades sells different types of shoes, 
                    slippers, sandals and sun glasses on instagram and our website.
                  </small>
                </div>

                <div class="input-field m6 mag0">
                  <input 
                    id="biz-email" 
                    type="email" 
                    class="inp-field"
                    v-model="formData.email"
                  >
                  <label for="biz-email">Business Email</label>
                </div>

                <div class="input-field">
                  <input 
                    id="biz-phone" 
                    type="tel" 
                    class="inp-field"
                    v-model="formData.phone"
                  >
                  <label for="biz-phone">Business Phone number</label>
                </div>

                <div class="input-field">
                  <input 
                    id="biz-address" 
                    type="text" 
                    class="inp-field"
                    v-model="formData.address"
                  >
                  <label for="biz-address">Business Address</label>
                </div>

                <div class="grid-split-2 input-field">
                  <div class="input-field m6 mag0">
                    <select id="biz-state" v-model="formData.state">
                      <option value="" disabled selected>Select State</option>
                      <option value="2">Lagos</option>
                      <option value="3">Ogun</option>
                      <option value="4">Anambra</option>
                      <option value="5">Abuja</option>
                    </select>
                    <label for="biz-state">State</label>
                  </div>
                  <div class="input-field m6 mag0">
                    <input 
                      id="biz-city" 
                      type="text" 
                      class="inp-field"
                      v-model="formData.city"
                    >
                    <label for="biz-city">City</label>
                  </div>
                </div>

                <div class="input-field">
                  <input 
                    id="cac-num" 
                    type="text" 
                    class="inp-field"
                    v-model="formData.cacNumber"
                  >
                  <label for="cac-num">Business CAC Number</label>
                </div>

                <div class="input-field">
                  <select id="biz-category" v-model="formData.category">
                    <option value="" disabled selected>Select Category</option>
                    <option value="2">Agriculture</option>
                    <option value="3">Information and Communication Technology</option>
                    <option value="4">Retail</option>
                    <option value="5">Branding and Advertising</option>
                    <option value="6">Marketing</option>
                  </select>
                  <label for="biz-category">Business Category</label>
                </div>

                <div class="file-field input-field">
                  <label class="active">Business Logo (optional)</label>
                  <div class="fpw">
                    <div class="btn">
                      <span>
                        <img src="@/assets/images/select-file.png" alt="select-file" class="select-file-img">
                      </span>
                      <input 
                        type="file" 
                        @change="handleFileChange"
                        accept="image/*"
                      >
                    </div>
                    <div class="file-path-wrapper hide">
                      <input class="file-path validate inp-field" type="text">
                    </div>
                    <small class="pry-color file-field-desc">
                      We use your logo on payment pages to increase the credibility for your 
                      customers. Please upload a square image of your logo not larger than 0MB.
                    </small>
                  </div>
                </div>

                <div class="input-field">
                  <input 
                    id="fb-biz-page" 
                    type="text" 
                    class="inp-field"
                    v-model="formData.facebookLink"
                  >
                  <label for="fb-biz-page">Facebook Business Page Link (optional)</label>
                </div>

                <div class="input-field">
                  <input 
                    id="ig-biz-page" 
                    type="text" 
                    class="inp-field"
                    v-model="formData.instagramLink"
                  >
                  <label for="ig-biz-page">Instagram Business Page Link (optional)</label>
                </div>

                <div class="input-field">
                  <input 
                    id="tw-biz-page" 
                    type="text" 
                    class="inp-field"
                    v-model="formData.twitterLink"
                  >
                  <label for="tw-biz-page">Twitter Business Page Link (optional)</label>
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
  businessPurpose: '',
  email: '',
  phone: '',
  address: '',
  state: '',
  city: '',
  cacNumber: '',
  category: '',
  logo: null,
  facebookLink: '',
  instagramLink: '',
  twitterLink: ''
})

const isSubmitting = ref(false)

// Initialize Materialize
onMounted(() => {
  M.AutoInit()
  
  const elemsDP = document.querySelectorAll('.datepicker')
  const elemsModal = document.querySelectorAll('.modal')
  const elemsSelect = document.querySelectorAll('select')
  
  M.Datepicker.init(elemsDP)
  M.Modal.init(elemsModal)
  M.FormSelect.init(elemsSelect)
  
  // Update form data when selects change
  elemsSelect.forEach(select => {
    select.addEventListener('change', (e) => {
      const field = e.target.id.replace('biz-', '')
      formData[field] = e.target.value
    })
  })
})

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 5000000) { // 5MB limit
      M.toast({ html: 'File size should be less than 5MB', classes: 'red' })
      event.target.value = ''
      return
    }
    formData.logo = file
  }
}

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    
    // Create FormData for submission
    const submitData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value) submitData.append(key, value)
    })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Form submitted:', Object.fromEntries(submitData.entries()))
    
    M.toast({ html: 'Business information saved successfully!', classes: 'green' })
    
  } catch (error) {
    console.error('Error submitting form:', error)
    M.toast({ html: 'Error saving information', classes: 'red' })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped src="@/assets/css/form-styles.css"></style>

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
    color: rgba(0, 0, 0, 0.6);
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

label[for="biz-state"], label[for="biz-category"] {
    top: -34px;
    font-size: 13px;
    font-weight: 500;
    left: 0 !important;
}
.hide{
    display: none;
}
.file-field.input-field {
    margin: 32px 0;
}
.fpw {
    width: 100%;
    height: auto;
    padding: 0;
    display: flex;
    border: none;
}
.file-field .fpw .btn {
    background-color: transparent;
    float: left;
    height: auto;
    line-height: 0;
    padding: 0;
    width: 80px;
    border-radius: 0;
    box-shadow: none;
}
small.pry-color.file-field-desc {
    position: relative;
    /* top: -20px; */
    padding: 10px;
    padding-top: 4%;
}
img.select-file-img {
    width: 100%;
    margin-right: 10px;
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 1px 5px 0 rgb(0 0 0 / 20%);
}
</style>