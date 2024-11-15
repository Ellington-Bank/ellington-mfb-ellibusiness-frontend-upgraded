<template>
  <div class="main-cont">
      <div class="row">
          <div class="col s12 m3 pad0 side-nav-wrapper">
            <SideNav />
          </div>
          <div class="col s12 m9 pad0 content-side-wrapper">
              <TopNav />

              <div class="content-container">
                  <div class="container tab-cont">
                      <div class="col s12 tab-row pad0">
                            <ul class="tabs">
                                <li class="tab col s6">
                                    <a href="#savings-sect" class="active">Savings</a>
                                </li>
                                <li class="tab col s6 disabled">
                                    <a href="#investment-sect">Investments</a>
                                </li>
                            </ul>
                      </div>
                  </div>
                  <div class="container rel">
                      <div id="savings-sect" class="empty-notice center">
                          <div class="empty-notice-img">
                              <img src="@/assets/images/payment-1a.png" alt="vector image">
                          </div>
                          <div class="empty-notice-txt">
                              <h4>You do not have any savings plan yet.</h4>
                          </div>
                          <div class="empty-notice-btn">
                              <button class="submit-btn sec-bg modal-trigger" data-target="new-savings-plan">
                                Create your first Savings Plan
                              </button>
                          </div>
                      </div>
                      <div id="investment-sect" class="empty-notice center">
                          <div class="empty-notice-img">
                              <img src="@/assets/images/investment.png" alt="vector image">
                          </div>
                          <div class="empty-notice-txt">
                              <h4>No Investments yet.</h4>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <NewSavingsPlan />
          <ConfirmSavings />
      </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import SideNav from "@/components/SideNav.vue"
import TopNav from "@/components/TopNav.vue"
import NewSavingsPlan from "@/components/pop-ups/NewSavingsPlan.vue"
import ConfirmSavings from "@/components/pop-ups/ConfirmSavings.vue"

import M from 'materialize-css'

onMounted(() => {
  M.AutoInit()
})
</script>

<style scoped src="@/assets/css/save-invest.css"></style>

<style>
.tabs .indicator {
    background-color: var(--sec-color) !important;
}
</style>

<style scoped>
.main-cont{
    height: 100vh;
}
.main-cont > .row{
    width: 100%;
    margin: 0;
}
.content-container {
    margin-top: calc(64px + 1.2rem);
}
.content-container > .container.tab-cont {
    border: none;
    width: 100%;
    position: relative;
    height: 60px;
}
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
</style>