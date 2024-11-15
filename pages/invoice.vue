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
                      <div class="empty-notice center">
                          <div class="empty-notice-img">
                              <img src="@/assets/images/invoice-img.png" alt="vector image">
                          </div>
                          <div class="empty-notice-txt">
                              <p>Send out your first invoice now and get credited immediately.</p>
                          </div>
                          <div class="empty-notice-btn">
                              <NuxtLink href="/new-invoice">
                                <button class="submit-btn sec-bg">Create your first Invoice</button>
                              </NuxtLink>
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
</script>

<style scoped src="@/assets/css/invoice.css"></style>

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
</style>