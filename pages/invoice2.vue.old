<template>
  <div class="main-cont">
      <div class="row">
          <div class="col s12 m3 pad0 side-nav-wrapper">
            <SideNav />
          </div>
          <div class="col s12 m9 pad0 content-side-wrapper">
              <TopNav />

              <div class="content-container">
                  <div class="container rel">
                      <div class="row">
                            <div class="col s12 tab-row">
                                <ul class="tabs">
                                    <li class="tab col s3">
                                        <a href="#all-invoices" class="active">All Invoices</a>
                                    </li>
                                    <li class="tab col s3">
                                        <a href="#draft-invoices">Draft Invoices</a>
                                    </li>
                                    <li class="tab col s3">
                                        <a href="#paid-invoices">Paid Invoices</a>
                                    </li>
                                    <li class="tab col s3">
                                        <a href="#overdue-invoices">Overdue Invoices</a>
                                    </li>
                                </ul>
                            </div>
                            <div id="all-invoices" class="col s12">
                                <h4 class="tab-title">All Invoices</h4>
                                <InvoiceTables />
                            </div>
                            <div id="draft-invoices" class="col s12">
                                <h4 class="tab-title">Draft Invoices</h4>
                                <InvoiceTables />
                            </div>
                            <div id="paid-invoices" class="col s12">
                                <h4 class="tab-title">Paid Invoices</h4>
                                <InvoiceTables />
                            </div>
                            <div id="overdue-invoices" class="col s12">
                                <h4 class="tab-title">Overdue Invoices</h4>
                                <InvoiceTables />
                            </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import SideNav from "@/components/SideNav.vue"
import TopNav from "@/components/TopNav.vue"
import InvoiceTables from "@/components/InvoiceTables.vue"

import M from 'materialize-css'
// import $ from 'jquery'
onMounted(() => {
  M.AutoInit()
})
</script>

<style scoped src="../../assets/css/invoice.css"></style>

<style>
.tabs .indicator {
    background-color: rgba(12, 37, 86, 0.5) !important;
}
.dataTables_wrapper .dataTables_filter {
    margin-bottom: 20px;
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
.content-container > .container.rel{
    border: none;
    width: 100%;
    height: auto;
}
</style>