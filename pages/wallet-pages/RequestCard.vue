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
                                <img src="@/assets/images/back.svg" alt="bo-back">
                            </div>
                        </NuxtLink>
                        <h4>
                            <span>Request a Business Debit Card </span>
                        </h4>
                        <p>Reserve your card & get the benefits.</p>
                    </div>
                    <div class="container">
                        <div class="grid-split-2">
                            <div class="some-card-details">
                                <div class="card-benefits-list">
                                    <div class="card-benefit">
                                        <img src="@/assets/images/check-icon.svg" alt="check-icon">
                                        <span>Pay bills earlier, sleep better.</span>
                                    </div>
                                    <div class="card-benefit">
                                        <img src="@/assets/images/check-icon.svg" alt="check-icon">
                                        <span>No monthly fees or minimum balance.</span>
                                    </div>
                                    <div class="card-benefit">
                                        <img src="@/assets/images/check-icon.svg" alt="check-icon">
                                        <span>Send money instantly.</span>
                                    </div>
                                </div>
                            </div>
                            <div class="some-card-details">
                                <div class="center ocd-item">
                                    <div>
                                        <div class="ocd-title">Express Delivery</div>
                                        <div class="ocd-detail">NGN 10,000</div>
                                    </div>
                                </div>
                                <div class="center ocd-item">
                                    <div>
                                        <div class="ocd-title">Estimated time arrival</div>
                                        <div class="ocd-detail">Monday - Nov 29, 2020</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="center btn-div">
                            <NuxtLink href="/request-card-sent">
                                <button class="conf-request-btn sec-bg submit-btn">Confirm Request</button>
                            </NuxtLink>
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