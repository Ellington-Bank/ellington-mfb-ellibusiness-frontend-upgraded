<template>
  <div class="main-cont">
      <div class="row">
          <div class="col s12 m3 pad0 side-nav-wrapper">
            <SideNav />
          </div>
          <div class="col s12 m9 pad0 content-side-wrapper">
              
              <div class="content-container">
                    <div class="content-window">
                        <div class="cont">
                            <div class="window-icon right-align">
                                <img src="@/assets/images/ellignton-pay-logo-black.png" alt="transfer" />
                            </div>
                            <div class="window-title-div">
                                <h5 class="window-title">Choose a Transfer Destination</h5>
                            </div>
                            <div class="window-form">
                                <NuxtLink href="/airopay-transfer">
                                    <div class="flex-div option-div">
                                        <div class="option-icon-div">
                                            <img src="@/assets/images/airopay-user.svg" alt="icon" class="option-icon" />
                                        </div>
                                        <div class="option-desc-div">
                                            <span>To an ElligntonPay User</span>
                                        </div>
                                        <div class="next-icon-div">
                                            <img src="@/assets/images/next-arr.svg" alt="icon" class="arr-icon" />
                                        </div>
                                    </div>
                                </NuxtLink>

                                <NuxtLink href="/bank-transfer">
                                    <div class="flex-div option-div">
                                        <div class="option-icon-div">
                                            <img src="@/assets/images/bank.svg" alt="icon" class="option-icon" />
                                        </div>
                                        <div class="option-desc-div">
                                            <span>To a Bank Account</span>
                                        </div>
                                        <div class="next-icon-div">
                                            <img src="@/assets/images/next-arr.svg" alt="icon" class="arr-icon" />
                                        </div>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>

                        <div class="secured-notice center">
                            <img src="@/assets/images/padlock.svg" alt="padlock-icon" />
                            <span> Secured by ElligntonPay.com</span>
                        </div>
                    </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
 import SideNav from "@/components/SideNav.vue"
</script>

<style scoped src="@/assets/css/transfer.css"></style>

<style scoped>
.main-cont{
    height: 100vh;
}
.main-cont > .row{
    width: 100%;
    margin: 0;
}
/* .center-form-div.container {
    width: 50%;
}
.content-container {
    margin-top: calc(64px + 1.2rem);
}
.content-container > .container{
    min-height: calc(100vh - 64px - 3em);
} */
.side-nav-wrapper.col.m3 {
    width: 20% !important;
    position: relative;
}
.content-side-wrapper.col.m9 {
    width: 80% !important;
    position: relative;
    height: 100vh;
    overflow: auto;
}
.input-field span {
  font-size: 14px;
}
</style>