<template>
  <!-- Modal Structure -->
  <div id="wallet-statement" class="modal">
    <div class="modal-content center">
        <div class="request-wrapper center">
            <div class="request-desc">
                <h5 class="request-title">Wallet Statement</h5>
                <p>
                    You have requested for a wallet statment between 20th of Nov, 2021 to 20th of Dec, 2021
                </p>
            </div>

            <div class="form-btn-wrapper">
                <div class="grid-split-2">
                    <!--=== Note: Use the "modal-close" class to close the modal ===-->
                    <button class="sec-btn cancel-btn modal-close">Cancel</button>
                    <button class="submit-btn sec-bg modal-close">Download</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped src="@/assets/css/form-styles.css"></style>

<style scoped>
.modal {
    width: 25%;
    max-width: 300px;
    min-width: 150px;
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
    grid-template-columns: calc(50% - 8px) calc(50% - 8px);
    grid-gap: 20px;
}
</style>

<style scoped>
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
button.request-cta-btn.sec-btn:focus, button.request-cta-btn.sec-btn:hover {
    color: white;
    background-color: var(--sec-color);
}
.request-wrapper.center {
    margin: 20px 0;
}
</style>