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
                                    <li class="tab col s4">
                                        <a href="#general-settings" class="active">General</a>
                                    </li>
                                    <li class="tab col s4">
                                        <a href="#users-settings">Users</a>
                                    </li>
                                    <li class="tab col s4">
                                        <a href="#account-settings">Account</a>
                                    </li>
                                </ul>
                            </div>
                            <div id="general-settings" class="col s12">
                                <GeneralSettings />
                            </div>
                            <div id="users-settings" class="col s12">
                                <UsersSettings />
                            </div>
                            <div id="account-settings" class="col s12">
                                <AccountSettings />
                            </div>
                      </div>
                  </div>
              </div>
          </div>
          <AddUserPopup />
      </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import SideNav from "@/components/SideNav.vue"
import TopNav from "@/components/TopNav.vue"
import GeneralSettings from "@/components/roles-n-settings/GeneralSettings.vue"
import UsersSettings from '@/components/roles-n-settings/UsersSettings.vue'
import AccountSettings from '@/components/roles-n-settings/AccountSettings.vue'
import AddUserPopup from '@/components/roles-n-settings/AddUserPopup.vue'

import M from "materialize-css"

onMounted(() => {
  // Initialize Materialize components
  M.AutoInit()
})
</script>

<style scoped src="../../assets/css/form-styles.css"></style>
<style scoped src="../../assets/css/roles-settings.css"></style>

<style>
.tabs .indicator {
    background-color: rgba(12, 37, 86, 0.5) !important;
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