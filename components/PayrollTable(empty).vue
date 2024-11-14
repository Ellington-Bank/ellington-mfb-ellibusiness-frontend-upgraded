<template>
  <div class="payroll-table">
    <!-- Title Section -->
    <div class="table-title">Title</div>

    <!-- Empty Table Notice -->
    <div class="empty-table-notice center">
      <div class="empty-img">
        <img src="@/assets/images/sleeping-dog.png" alt="sleeping-dog" class="sleeping-dog">
      </div>
      <div class="empty-notice-title">No existing upload for payments</div>
      <div class="empty-notice-txt">
        <p>Click on the add icon to upload your payroll files</p>
      </div>
    </div>

    <!-- Upload Button -->
    <div class="upload-payroll-btn-div">
      <button class="upload-payroll-btn">
        <input type="file" id="upload-payroll-input" @change="handleFileChange" />
        <img src="@/assets/images/upload-circle.svg" alt="upload-icon">
      </button>
    </div>

    <!-- Loader (shown conditionally) -->
    <div v-if="showLoader" id="payroll-table-loader" class="loader">
      Uploading...
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive variable to control the loader visibility
const showLoader = ref(false)

// Handle file upload change event
const handleFileChange = (event) => {
  if (event.target.files.length > 0) {
    showLoader.value = true
    console.log("File selected:", event.target.files[0])
    // Simulate a delay for demonstration purposes
    setTimeout(() => {
      showLoader.value = false
      alert("File uploaded successfully!")
    }, 2000)
  }
}
</script>

<style scoped src="../assets/css/payroll.css"></style>

<style scoped>
.payroll-table {
  text-align: center;
  padding: 20px;
}
.empty-table-notice {
  margin-top: 30px;
}
.sleeping-dog {
  width: 150px;
  margin-bottom: 10px;
}
.upload-payroll-btn {
  background: none;
  border: none;
  cursor: pointer;
}
.upload-payroll-btn input[type="file"] {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.loader {
  margin-top: 20px;
  font-size: 16px;
  color: #888;
}
</style>
