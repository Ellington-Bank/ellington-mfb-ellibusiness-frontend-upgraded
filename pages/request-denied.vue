<template>
  <div class="main-cont">
      <div class="row">
          <div class="col s12 m3 pad0 side-nav-wrapper">
            <SideNav />
          </div>
          <div class="col s12 m9 pad0 content-side-wrapper">
              <TopNav />

              <div class="content-container">
                    <div class="container">
                        <div class="request-wrapper center">
                            <div class="request-icon-div">
                                <img src="@/assets/images/request-denied.svg" alt="processing" />
                            </div>
                            <div class="request-desc">
                                <h5 class="request-title">Live Request Denied</h5>
                                <p>
                                    We’re sorry, your request to go live was not approved, 
                                    please make sure all your documents are valid and try again.
                                </p>
                            </div>
                            <div class="request-cta-btn-div">
                                <button class="request-cta-btn sec-bg">Try Again</button>
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

<style scoped>
.request-icon-div img {
    width: 70px;
    margin-bottom: 20px;
}
.request-desc {
    font-size: 14px;
}
h5.request-title {
    font-size: 1.6rem;
    font-weight: 600;
}
.request-cta-btn-div {
    margin: 30px 0;
}
button.request-cta-btn.sec-bg {
    padding: 15px 45px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    min-width: 225px;
}
button.request-cta-btn.sec-bg:focus, button.request-cta-bt.sec-bg:hover {
    /* color: white; */
    background-color: var(--pry-color);
}
.request-wrapper.center {
    position: absolute;
    width: 50%;
    left: 0;
    right: 0;
    margin: auto;
    top: 40%;
    transform: translateY(-50%);
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
.center-form-div.container {
    width: 50%;
}
.content-container {
    margin-top: calc(64px + 1.2rem);
}
.content-container > .container{
    min-height: calc(100vh - 64px - 3em);
    position: relative;
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