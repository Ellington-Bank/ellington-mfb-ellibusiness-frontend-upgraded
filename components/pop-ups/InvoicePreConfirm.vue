<template>
  <!-- Modal Structure -->
  <div id="invoice-pre-send" class="modal">
    <div class="modal-content center">
      <div class="request-wrapper center">
        <div class="request-icon-div">
          <img src="~/assets/images/processing-request.svg" alt="processing" />
        </div>
        <div class="request-desc">
          <p>
            You are about to send this invoice to <b>ellie.dia@gmail.com</b>.
          </p>
        </div>

        <div class="form-btn-wrapper">
          <div class="grid-split-2">
            <!-- Use the "modal-close" class to close the modal -->
            <button class="sec-btn cancel-btn modal-close">Cancel</button>
            <button class="submit-btn sec-bg modal-close" data-target="invoice-confirmed">
              Send
            </button>
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
