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
                                    <a href="#transactions-sect" class="active">Transactions</a>
                                </li>
                                <li class="tab col s6">
                                    <a href="#refund-sect">Refunds</a>
                                </li>
                            </ul>
                      </div>
                  </div>
                  <div class="container rel">
                      <div id="transactions-sect" class="empty-notice center">
                          <div class="empty-notice-img">
                              <img src="@/assets/images/payment-1.png" alt="vector image">
                          </div>
                          <div class="empty-notice-txt">
                              <h4>You do not have any transactions yet.</h4>
                              <p>Go to any of the modules to make your first transaction</p>
                          </div>
                      </div>
                      <div id="refund-sect" class="empty-notice center">
                          <div class="empty-notice-img">
                              <img src="@/assets/images/payment-2.png" alt="vector image">
                          </div>
                          <div class="empty-notice-txt">
                              <h4>No refunds have been done yet.</h4>
                              <p>Refunds will show here if any is done</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import SideNav from "@/components/SideNav.vue"
import TopNav from "@/components/TopNav.vue"

import M from 'materialize-css'

onMounted(() => {
  M.AutoInit()
})
</script>

<style scoped src="@/assets/css/transactions.css"></style>

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