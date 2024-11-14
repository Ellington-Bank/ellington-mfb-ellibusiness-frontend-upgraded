<template>
  <!-- Modal Structure -->
  <div id="invoice-confirmed" class="modal">
    <div class="modal-content center">
      <div class="request-wrapper center">
        <div class="request-icon-div">
          <img src="~/assets/images/processing-request.svg" alt="processing" />
        </div>
        <div class="request-desc">
          <h5 class="request-title">Invoice Sent</h5>
          <p>Your invoice has been successfully sent to this customer.</p>
        </div>

        <div class="form-btn-wrapper">
          <div>
            <!-- Use the "modal-close" class to close the modal -->
            <button class="sec-btn cancel-btn modal-close">Close</button>
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
.modal-content h4 {
  font-size: 1.7rem;
}
.grid-split-2 {
  grid-template-columns: calc(50% - 8px) calc(50% - 8px);
  grid-gap: 20px;
}
button.cancel-btn:hover,
button.cancel-btn:focus {
  background-color: var(--sec-color);
  border-color: var(--sec-color) !important;
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
.request-cta-btn-div {
  margin: 30px 0;
}
button.request-cta-btn.sec-btn {
  padding: 15px 45px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}
button.request-cta-btn.sec-btn:focus,
button.request-cta-btn.sec-btn:hover {
  color: white;
  background-color: var(--sec-color);
}
.request-wrapper.center {
  margin: 20px 0;
}
</style>
