<template>
  <!-- Modal Structure -->
  <div id="transfer-popup" class="modal">
    <div class="modal-content center">
      <div class="request-wrapper center">
        <div class="request-icon-div">
          <img src="@/assets/images/processing-request.svg" alt="processing" />
        </div>
        <div class="request-desc">
          <h5 class="request-title">Transfer Successful!</h5>
          <p>
            Your transfer to <b>Eleana Diadem</b> has been successful. 
          </p>
        </div>

        <div class="form-btn-wrapper">
          <div class="grid-split-2">
            <!--=== Note: Use the "modal-close" class to close the modal ===-->
            <button class="sec-btn cancel-btn modal-close">Close</button>
            <button class="submit-btn sec-bg modal-close">Download Receipt</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style src="@/assets/css/form-styles.css" scoped></style>

<style scoped>
div#transfer-popup {
  width: 30%;
  max-width: 380px;
  min-width: 200px;
}

.form-btn-wrapper {
  margin: 40px 0 20px;
}

button.submit-btn, button.cancel-btn {
  height: 42px;
  font-size: 13px;
  border-radius: 4px;
}

.modal-content h4 {
  font-size: 1.7rem;
}

.grid-split-2 {
  grid-template-columns: calc(50% - 12px) calc(50% - 12px);
}

/* Merged second style block */
.request-icon-div img {
  width: 65px;
  margin-bottom: 20px;
}

.request-desc {
  font-size: 14px;
}

h5.request-title {
  font-size: 1.6rem;
  font-weight: 600;
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

button.request-cta-btn.sec-btn:focus, button.request-cta-btn.sec-btn:hover {
  color: white;
  background-color: var(--sec-color);
}

.request-wrapper.center {
  margin: 20px 0;
}
</style>