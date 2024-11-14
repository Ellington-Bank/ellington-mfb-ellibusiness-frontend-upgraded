<template>
  <!-- Modal Structure -->
  <div id="loan-popup" class="modal">
    <div class="modal-content center">
      <div class="request-wrapper center">
        <div class="request-icon-div">
          <img src="~/assets/images/processing-request.svg" alt="processing" />
        </div>
        <div class="request-desc">
          <h5 class="request-title">Loan Application Submitted</h5>
          <p>
            We have received your loan request and will get back to you in 24 hours.
          </p>
        </div>
        <div class="request-cta-btn-div">
          <button class="request-cta-btn sec-btn modal-close">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped src="~/assets/css/form-styles.css"></style>

<style scoped>
#loan-popup {
  width: 30%;
  max-width: 380px;
  min-width: 200px;
}
.form-btn-wrapper {
  margin: 40px 0 20px;
}
button.submit-btn,
button.cancel-btn {
  height: 42px;
}
.modal-content h4 {
  font-size: 2rem;
}
.request-icon-div img {
  width: 65px;
  margin-bottom: 20px;
}
.request-desc {
  font-size: 13px;
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
button.request-cta-btn.sec-btn:focus,
button.request-cta-btn.sec-btn:hover {
  color: white;
  background-color: var(--sec-color);
}
.request-wrapper.center {
  margin: 20px 0;
}
</style>
