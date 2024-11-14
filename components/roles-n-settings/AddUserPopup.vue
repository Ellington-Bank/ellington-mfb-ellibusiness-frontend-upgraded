<template>
  <!-- Modal Structure -->
  <div id="add-user-modal" class="modal">
    <div class="modal-content center">
      <div class="request-wrapper">
        <div class="request-desc">
          <h5 class="request-title">Invite New User</h5>
          <p>
            Enter the email address of the user you want to invite,
            and choose the role they should have.
          </p>
        </div>

        <form @submit.prevent="handleInviteUser">
          <div class="">
            <div class="input-field">
              <input id="user-email" v-model="userEmail" type="email" class="inp-field" required />
              <label for="user-email">Email</label>
            </div>
            <div class="input-field">
              <select id="user-role" v-model="userRole">
                <option value="1">Owner</option>
                <option value="2">Administrator</option>
                <option value="3">Developer</option>
                <option value="4">Guest</option>
              </select>
              <label for="user-role">Role</label>
            </div>
          </div>
          <div class="form-btn-wrapper">
            <div class="grid-split-2">
              <!--=== Use "modal-close" class to close the modal ===-->
              <button class="sec-btn cancel-btn modal-close" type="button">Cancel</button>
              <button class="submit-btn sec-bg" type="submit">Invite User</button>
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

// Reactive references for user inputs
const userEmail = ref('')
const userRole = ref('1')

// Function to handle form submission
const handleInviteUser = () => {
  if (userEmail.value && userRole.value) {
    console.log(`Inviting user: ${userEmail.value} with role ${userRole.value}`)
    // Reset the form fields after submission
    userEmail.value = ''
    userRole.value = '1'
    M.toast({ html: 'User invited successfully!', displayLength: 2000 })
  } else {
    M.toast({ html: 'Please fill in all fields.', displayLength: 2000 })
  }
}

onMounted(() => {
  // Initialize MaterializeCSS modal
  const modal = document.querySelector('#add-user-modal')
  if (modal) M.Modal.init(modal)

  // Initialize MaterializeCSS select dropdown
  const select = document.querySelector('#user-role')
  if (select) M.FormSelect.init(select)
})
</script>

<style scoped src="../../assets/css/form-styles.css"></style>

<style scoped>
.modal {
  width: 30%;
  max-width: 380px;
  min-width: 200px;
  max-height: 80%;
}
.form-btn-wrapper {
  margin: 30px 0 10px;
}
button.submit-btn,
button.cancel-btn {
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
  gap: 20px;
}
.request-desc {
  font-size: 14px;
  color: #676B71;
  margin-bottom: 40px;
}
h5.request-title {
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: #252B33;
  margin-top: 10px;
}
.input-field>label.active {
  font-size: 14px;
  font-weight: 500;
}
.select-wrapper+label {
  left: 0 !important;
  top: -34px;
  font-size: 11px;
  font-weight: 500;
}
</style>

<style>
#add-user-modal .select-wrapper input.select-dropdown,
#add-user-modal .dropdown-content li>span {
  font-size: 14px;
}
</style>
