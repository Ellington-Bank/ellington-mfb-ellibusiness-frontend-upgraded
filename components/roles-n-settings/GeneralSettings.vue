<template>
  <div>
    <div class="content-container">
      <!-- Personal Information Section -->
      <div class="container personal--info rel">
        <div class="row">
          <form @submit.prevent="savePersonalInfo">
            <div class="sect-title-header flex-div col s12">
              <h5 class="sect-title fg-1">Personal Information</h5>
              <div>
                <button type="submit" class="sec-bg submit-btn">SAVE</button>
              </div>
            </div>
            <div class="col s12 m9">
              <div class="input-field col s12 m6 pad0">
                <input id="first--name" type="text" v-model="personalInfo.firstName" class="inp-field" required>
                <label for="first--name">FIRST NAME</label>
              </div>
              <div class="input-field col s12 m6 pad0">
                <input id="last--name" type="text" v-model="personalInfo.lastName" class="inp-field" required>
                <label for="last--name">LAST NAME</label>
              </div>
              <div class="input-field col s12 m6 pad0">
                <input id="user--email" type="email" v-model="personalInfo.email" class="inp-field" required>
                <label for="user--email">EMAIL</label>
              </div>
              <div class="input-field col s12 m6 pad0">
                <input id="phone--number" type="tel" v-model="personalInfo.phone" class="inp-field" required>
                <label for="phone--number">PHONE</label>
              </div>

              <div class="col s12 pad0">
                <h6 class="password-title">PASSWORD</h6>
              </div>
              <div class="input-field col s12 m6 password-sec pad0" v-show="showPasswordSection">
                <input id="new-password" type="password" v-model="personalInfo.newPassword" class="inp-field">
                <label for="new-password">New Password</label>
              </div>
              <div class="input-field col s12 m6 password-sec pad0" v-show="showPasswordSection">
                <input id="confirm-new-password" type="password" v-model="personalInfo.confirmPassword" class="inp-field">
                <label for="confirm-new-password">Confirm Password</label>
              </div>
              <div class="input-field col s12 pad0">
                <button type="button" @click="togglePasswordSection" class="change-password-btn">CHANGE PASSWORD</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Business Information Section -->
      <div class="container bizness--info rel">
        <div class="row">
          <form @submit.prevent="saveBusinessInfo">
            <div class="sect-title-header flex-div col s12">
              <h5 class="sect-title fg-1">Business Information</h5>
              <div>
                <button type="submit" class="sec-bg submit-btn">SAVE</button>
              </div>
            </div>
            <div class="col s12 m9">
              <div class="input-field col s12 m6 pad0">
                <input id="business--name" type="text" v-model="businessInfo.name" class="inp-field" required>
                <label for="business--name">BUSINESS NAME</label>
              </div>
              <div class="input-field col s12 m6 pad0">
                <input id="business--phone" type="tel" v-model="businessInfo.phone" class="inp-field">
                <label for="business--phone">BUSINESS PHONE NUMBER</label>
              </div>
              <div class="input-field col s12 m6 pad0">
                <input id="business--email" type="email" v-model="businessInfo.email" class="inp-field">
                <label for="business--email">BUSINESS EMAIL</label>
              </div>
              <div class="input-field col s12 m6 pad0">
                <input id="business--address" type="text" v-model="businessInfo.address" class="inp-field">
                <label for="business--address">BUSINESS ADDRESS</label>
              </div>
            </div>
            <div class="col s12 m3">
              <div class="center">
                <div class="input-field bizess-avatar-div">
                  <img :src="businessInfo.logo" alt="business avatar" class="bizness-avatar">
                  <p>Change business logo</p>
                  <div class="file-field input-field">
                    <div class="btn">
                      <span><i class="material-icons">add_box</i> Select File</span>
                      <input type="file" @change="handleFileChange">
                    </div>
                    <div class="file-path-wrapper">
                      <input class="file-path validate inp-field" type="text">
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
import { ref } from 'vue'

const personalInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  newPassword: '',
  confirmPassword: '',
})

const businessInfo = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  logo: '/assets/images/jr.png',
})

const showPasswordSection = ref(false)

const togglePasswordSection = () => {
  showPasswordSection.value = !showPasswordSection.value
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      businessInfo.value.logo = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const savePersonalInfo = () => {
  console.log('Personal Info:', personalInfo.value)
}

const saveBusinessInfo = () => {
  console.log('Business Info:', businessInfo.value)
}
</script>

<style scoped>
.content-container {
  padding: 20px 30px 10px;
  border: none;
  box-shadow: 0px 5px 24px rgb(12 37 86 / 15%);
}
.change-password-btn {
  cursor: pointer;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  background: rgba(208, 215, 230, 0.7);
}
.password-sec {
  display: none;
}
.password-sec[style*="display: block"] {
  display: block;
}
.file-field .file-path-wrapper {
  display: none;
}
.file-field .btn {
  background-color: rgb(197, 197, 197 / 30%);
}
</style>
