<template>
  <!-- Modal Structure -->
  <div id="invoice-reminder" class="modal">
    <div class="modal-content center">
      <div class="request-wrapper center">
        <div class="request-desc">
          <h5 class="request-title">Invoice Reminder</h5>
          <p>
            You are about to send a reminder to <b>ABC Ventures</b>. This is to remind them of the pending transaction of 
            <b>N120,000,000.00</b>
          </p>
        </div>

        <div class="form-btn-wrapper">
          <div class="grid-split-2">
            <!-- Button to close the modal -->
            <button class="sec-btn cancel-btn modal-close">Cancel</button>
            <button class="submit-btn sec-bg modal-close">Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped src="~/assets/css/form-styles.css"></style>

<style scoped>
.modal {
  width: 25%;
  max-width: 300px;
  min-width: 150px;
}
.form-btn-wrapper {
  margin: 40px 0 20px;
}
button.submit-btn,
button.cancel-btn {
  height: 42px;
  font-size: 13px;
  border-radius: 4px;
}
.grid-split-2 {
  display: grid;
  grid-template-columns: calc(50% - 8px) calc(50% - 8px);
  grid-gap: 20px;
}
.request-icon-div img {
  width: 65px;
  margin-bottom: 20px;
}
.request-desc {
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
}
h5.request-title {
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
}
button.cancel-btn:hover,
button.cancel-btn:focus {
  background-color: var(--sec-color);
  border-color: var(--sec-color) !important;
}
.request-wrapper.center {
  margin: 20px 0;
}
</style>
