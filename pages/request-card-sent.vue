<template>
  <div class="main-cont">
      <div class="row">
          <div class="col s12 m3 pad0 side-nav-wrapper">
            <SideNav />
          </div>
          <div class="col s12 m9 pad0 content-side-wrapper">
              <TopNav />

              <div class="content-container">
                    <div class="welcome-intro">
                        <NuxtLink href="/wallet">
                            <div class="go-back pointer">
                                <img src="../../assets/images/back.svg" alt="bo-back">
                            </div>
                        </NuxtLink>
                        <h4>
                            <span>Request a Business Debit Card </span>
                        </h4>
                        <p>Reserve your card & get the benefits.</p>
                    </div>
                    <div class="container center">
                        <div class="conf-req-wrapper">
                            <div class="conf-req-div">
                                <div class="req-img-div">
                                    <img src="@/assets/images/request-sent.svg" alt="icon" class="req-img">
                                </div>
                                <div class="req-ht">Request Sent</div>
                                <div class="req-txt">
                                    <p>We have received your request, you’ll receive your card soon.</p>
                                </div>
                            </div>

                            <div class="center btn-div">
                                <NuxtLink href="/wallet">
                                    <button class="conf-request-btn sec-bg submit-btn">Got it</button>
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

<style scoped src="@/assets/css/request-card.css"></style>

<style scoped>
.welcome-intro {
    width: 95%;
    margin: auto;
    margin-bottom: 20px;
}
.welcome-intro h4 {
    margin-bottom: 0;
    font-size: 24px;
}
.welcome-intro p {
    margin-top: 5px;
    opacity: 0.8;
}

.content-container > .container {
    border: none;
    padding: 0;
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