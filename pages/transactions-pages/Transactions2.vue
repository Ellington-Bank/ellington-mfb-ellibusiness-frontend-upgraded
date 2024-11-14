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
                      <div id="transactions-sect" class="tranx-sect">
                          <h4 class="tab-title" id="tranx-title">Transactions</h4>

                          <div class="row">
                                <div class="col s12 tab-row">
                                    <ul class="tabs">
                                        <li class="tab col s3">
                                            <a href="#all-tranx" class="active">All</a>
                                        </li>
                                        <li class="tab col s3">
                                            <a href="#successful-tranx">Successful</a>
                                        </li>
                                        <li class="tab col s3">
                                            <a href="#pending-tranx">Pending</a>
                                        </li>
                                        <li class="tab col s3">
                                            <a href="#failed-tranx">Failed</a>
                                        </li>
                                    </ul>
                                </div>
                                <div id="all-tranx" class="col s12 rel">
                                    <h5 class="tab-title pry-color">All Transactions</h5>
                                    <TransactionsTable />
                                </div>
                                <div id="successful-tranx" class="col s12 rel">
                                    <h5 class="tab-title green-text">Successful Transactions</h5>
                                    <TransactionsTable />
                                </div>
                                <div id="pending-tranx" class="col s12 rel">
                                    <h5 class="tab-title gold-text">Pending Transactions</h5>
                                    <TransactionsTable />
                                </div>
                                <div id="failed-tranx" class="col s12 rel">
                                    <h5 class="tab-title red-text">Failed Transactions</h5>
                                    <TransactionsTable />
                                </div>
                          </div>
                      </div>
                      <div id="refund-sect" class="">
                          <h4 class="tab-title pry-color" id="refunds-title">All Refunds</h4>
                          <RefundsTable />
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

import TransactionsTable from "@/components/TransactionsTable.vue"
import RefundsTable from "@/components/RefundsTable.vue"

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
.gold-text {
    color: goldenrod;
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
div#refund-sect {
    margin-top: 10px;
}
</style>