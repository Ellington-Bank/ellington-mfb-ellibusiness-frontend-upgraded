<template>
  <div class="content-container">
    <form class="container rel" @submit.prevent="handleSubmit">
      <div class="sect-title-header flex-div col s12">
        <h5 class="sect-title fg-1">Preferences</h5>
        <div>
          <button 
            type="submit" 
            class="sec-bg submit-btn"
            :disabled="isSaving"
          >
            {{ isSaving ? 'SAVING...' : 'SAVE' }}
          </button>
        </div>
      </div>

      <div class="prefrences-wrapper col s12">
        <!-- Transaction Fees -->
        <div class="col s12 pad0 preference-block">
          <div class="col s12 m6 question-side">
            <b>Who should pay the transaction fees?</b>
          </div>
          <div class="col s12 m6 options-side">
            <label>
              <input 
                type="radio" 
                name="tranx-fees" 
                class="with-gap"
                value="customer"
                v-model="preferences.transactionFees"
              />
              <span>Make customers pay for the transaction fee</span>
            </label>
            <label>
              <input 
                type="radio" 
                name="tranx-fees" 
                class="with-gap"
                value="business"
                v-model="preferences.transactionFees"
              />
              <span>Charge me for the transaction fee</span>
            </label>
          </div>
        </div>

        <!-- Transaction Emails -->
        <div class="col s12 pad0 preference-block">
          <div class="col s12 m6 question-side">
            <b>Transaction Emails</b>
          </div>
          <div class="col s12 m6 options-side">
            <label>
              <input 
                type="checkbox" 
                class="filled-in"
                v-model="preferences.emailMeTransactions"
              />
              <span>Email me for every transaction</span>
            </label>
          </div>
        </div>

        <!-- Customer Transaction Emails -->
        <div class="col s12 pad0 preference-block">
          <div class="col s12 m6 question-side">
            <b>Transaction Emails (Customers)</b>
          </div>
          <div class="col s12 m6 options-side">
            <label>
              <input 
                type="checkbox" 
                class="filled-in"
                v-model="preferences.emailCustomersTransactions"
              />
              <span>Email customers for every transaction</span>
            </label>
          </div>
        </div>

        <!-- Notification Emails -->
        <div class="col s12 pad0 preference-block">
          <div class="col s12 m6 question-side">
            <b>Send notification Emails to other users</b>
          </div>
          <div class="col s12 m6 options-side">
            <label>
              <input 
                type="radio" 
                name="notify-email" 
                class="with-gap"
                value="business"
                v-model="preferences.notificationEmails"
              />
              <span>Send to the business email address only</span>
            </label>
            <label>
              <input 
                type="radio" 
                name="notify-email" 
                class="with-gap"
                value="all"
                v-model="preferences.notificationEmails"
              />
              <span>Send to all dashboard users</span>
            </label>
            <label>
              <input 
                type="radio" 
                name="notify-email" 
                class="with-gap"
                value="specific"
                v-model="preferences.notificationEmails"
              />
              <span>Send to specific users only</span>
            </label>
          </div>
        </div>

        <!-- Two Factor Auth -->
        <div class="col s12 pad0 preference-block">
          <div class="col s12 m6 question-side">
            <b>Two Factor Authentication for Transfers</b>
          </div>
          <div class="col s12 m6 options-side">
            <label>
              <input 
                type="checkbox" 
                class="filled-in"
                v-model="preferences.twoFactorAuth"
              />
              <span>Enable Two Factor Authentication for Transfers</span>
            </label>
          </div>
        </div>

        <!-- Subscription Settings -->
        <div class="col s12 pad0 preference-block">
          <div class="col s12 m6 question-side">
            <b>Subscription Emails</b>
          </div>
          <div class="col s12 m6 options-side">
            <label>
              <input 
                type="checkbox" 
                class="filled-in"
                v-model="preferences.allowCancelSubscription"
              />
              <span>Allow customers cancel subscriptions</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import M from 'materialize-css'

const isSaving = ref(false)

// Initial preferences state
const preferences = reactive({
  transactionFees: 'business',
  emailMeTransactions: true,
  emailCustomersTransactions: true,
  notificationEmails: 'business',
  twoFactorAuth: true,
  allowCancelSubscription: true
})

// Keep track of original values for change detection
const originalPreferences = { ...preferences }

const hasChanges = computed(() => {
  return Object.keys(preferences).some(key => 
    preferences[key] !== originalPreferences[key]
  )
})

const handleSubmit = async () => {
  if (!hasChanges.value) {
    M.toast({ html: 'No changes to save', classes: 'orange' })
    return
  }

  try {
    isSaving.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update original values after successful save
    Object.assign(originalPreferences, { ...preferences })
    
    M.toast({ html: 'Preferences saved successfully!', classes: 'green' })
  } catch (error) {
    console.error('Error saving preferences:', error)
    M.toast({ html: 'Failed to save preferences', classes: 'red' })
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  // Initialize any Materialize components if needed
  M.updateTextFields()
})
</script>

<style scoped src="@/assets/css/roles-settings.css"></style>

<style scoped>
.content-container {
  margin-top: 10px !important;
}

.content-container > .container.rel {
  min-height: calc(100vh - 134px - 3em);
  padding: 20px 30px 10px;
  border: none;
  box-shadow: 0px 5px 24px rgb(12 37 86 / 15%);
  margin: 0 auto;
  width: 100%;
  float: left;
}

.sect-title-header {
  margin-bottom: 20px;
}

[type="radio"]+span:before, [type="radio"]+span:after {
  margin-left: 0;
}

[type="checkbox"]+span:not(.lever) {
  padding-left: 35px !important;
}

[type="radio"]:not(:checked)+span:before, [type="radio"]:not(:checked)+span:after {
  border: 2px solid var(--sec-color);
}

[type="radio"]:checked+span:after, [type="radio"].with-gap:checked+span:before, [type="radio"].with-gap:checked+span:after {
  border: 2px solid var(--sec-color);
}

[type="radio"]:checked+span:after, [type="radio"].with-gap:checked+span:after {
  background-color: var(--sec-color);
}

/* Additional styles for better UX */
.submit-btn {
  transition: opacity 0.3s ease;
  min-width: 100px;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.preference-block {
  transition: background-color 0.3s ease;
  padding: 15px 0;
}

.preference-block:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

label {
  transition: opacity 0.3s ease;
}

label:hover {
  opacity: 0.8;
}
</style>