<template>
  <div class="main-cont">
    <div class="row">
      <div class="col s12 m3 pad0 side-nav-wrapper">
        <SideNav />
      </div>
      <div class="col s12 m9 pad0 content-side-wrapper">
        <TopNav />

        <div class="content-container">
          <div class="welcome-intro flex-div">
            <div class="fg-1">
              <h4><span>Wallet & Card</span></h4>
              <p>See your data</p>
            </div>
            <NuxtLink href="/request-card" class="submit-btn sec-bg">
              Request a Card
            </NuxtLink>
          </div>
          <div class="container">
            <div class="wallet-grid">
              <!-- Wallet Details Card -->
              <div class="wallet-grid-item">
                <div class="flex-div grid-item-title">
                  <div class="grid-title-h fg-1">WALLET DETAILS</div>
                  <div class="date-block">
                    <img src="@/assets/images/calendar.svg" alt="icon" />
                    <span class="date">18/09/2020</span>
                  </div>
                </div>

                <div class="balance-info bi-pad">
                  <span class="item-sub-title">Current Balance</span>
                  <div class="balance-amt">₦528,182</div>
                </div>

                <div class="flex-div bi-pad">
                  <div class="balance-info fg-1">
                    <span class="item-sub-title">Income</span>
                    <div class="balance-amt">₦342,182</div>
                  </div>
                  <div class="balance-info">
                    <span class="item-sub-title">Debit</span>
                    <div class="balance-amt">₦342,182</div>
                  </div>
                </div>
                <div class="flex-div download-statement-div">
                  <div class="fg-1">Wallet Statement</div>
                  <button
                    class="download-statement-btn submit-btn sec-bg modal-trigger"
                    data-target="wallet-statement"
                  >
                    Download
                  </button>
                </div>
              </div>

              <!-- Invoice Section -->
              <div class="wallet-grid-item rel">
                <div class="flex-div grid-item-title">
                  <div class="grid-title-h fg-1">BILLS</div>
                  <div class="date-block">
                    <img src="@/assets/images/calendar.svg" alt="icon" />
                    <span class="date">18/09/2020</span>
                  </div>
                </div>

                <div class="bi-pad">
                  <p class="gi-p">
                    You have 56 unpaid invoices this month. Follow up with your client to receive funds.
                  </p>
                </div>
                <div class="bi-pad short-invoice-list">
                  <div class="invoice-item flex-div">
                    <div class="fg-1">
                      <div class="invoice-title">A&B Limited</div>
                      <div class="invoice-amount">₦32,182</div>
                    </div>
                    <button
                      class="send-reminder-btn submit-btn sec-bg modal-trigger"
                      data-target="invoice-reminder"
                    >
                      Send Reminder
                    </button>
                  </div>
                </div>
                <NuxtLink href="/all-invoices" class="sec-color">See All Invoices</NuxtLink>
              </div>

              <!-- Loan Portfolio Section -->
              <div class="wallet-grid-item rel">
                <div class="flex-div grid-item-title">
                  <div class="grid-title-h fg-1">LOAN PORTFOLIO</div>
                  <div class="next-date-block">
                    <span class="sec-color">NEXT PAYMENT: 14 DAYS</span>
                  </div>
                </div>

                <div class="bi-pad loan-brief center">
                  <div class="loan-brief-amt">₦10,428,182</div>
                  <div class="loan-brief-txt">
                    <p>
                      <span class="red-text">₦120,000</span> will be debited from the registered debit card below.
                    </p>
                  </div>
                </div>
                <div class="card-div">
                  <div class="card-des sec-bg">
                    <img src="@/assets/images/visa-logo.svg" alt="visa" class="card-type" />
                    <div class="card-num">4857 **** **** 3544</div>
                    <div class="card-sec-num">2878</div>
                    <div class="card-name">Harry Osborn</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-wrapper">
      <WalletStatementPopup />
      <InvoiceReminderPopup />
    </div>
  </div>
</template>

<script>
import SideNav from "@/components/SideNav.vue";
import TopNav from "@/components/TopNav.vue";
import WalletStatementPopup from "@/components/pop-ups/WalletStatementPopup.vue";
import InvoiceReminderPopup from "@/components/pop-ups/InvoiceReminderPopup.vue";

export default {
  name: "Wallet",
  components: {
    SideNav,
    TopNav,
    WalletStatementPopup,
    InvoiceReminderPopup,
  },
  mounted() {
    if (process.client) {
      const M = require("materialize-css");
      const elemsModal = document.querySelectorAll(".modal");
      M.Modal.init(elemsModal);
    }
  },
};
</script>

<style scoped src="@/assets/css/wallet.css"></style>

<style scoped>
.welcome-intro {
  width: 95%;
  margin: auto;
  margin-bottom: 20px;
}
.welcome-intro h4 {
  margin-bottom: 0;
}
.welcome-intro p {
  margin-top: 5px;
  opacity: 0.8;
}
.main-cont {
  height: 100vh;
}
</style>
