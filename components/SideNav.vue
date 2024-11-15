<template>
  <div id="side-nav">
    <!-- User Info Section -->
    <div class="user-div sn-padded">
      <img src="@/assets/images/default-user.svg" alt="user" class="user-img" />
      <span class="user-name">Thrift 9ja</span>
    </div>

    <!-- Navigation List -->
    <div class="nav-list-div">
      <!-- Tier 1 Links -->
      <ul class="side-nav-list sn-padded tier-1">
        <li class="side-nav-item">
          <NuxtLink to="/">
            <img src="@/assets/images/getting-started.svg" alt="nav-icon" />
            <span>Getting Started</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/home">
            <img src="@/assets/images/dashboard.svg" alt="nav-icon" />
            <span>Dashboard</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/transactions">
            <img src="@/assets/images/transactions.svg" alt="nav-icon" />
            <span>Transactions</span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Tier 2 Links -->
      <ul class="side-nav-list sn-padded tier-2">
        <li class="side-nav-item">
          <NuxtLink to="/wallet">
            <img src="@/assets/images/wallet.svg" alt="nav-icon" />
            <span>Wallet & Card</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/invoice">
            <img src="@/assets/images/invoicing.svg" alt="nav-icon" />
            <span>Invoicing</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/payroll">
            <img src="@/assets/images/payroll.svg" alt="nav-icon" />
            <span>Payroll</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/loans">
            <img src="@/assets/images/loan-icon.svg" alt="nav-icon" />
            <span>Loan</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/collections">
            <img src="@/assets/images/collections.svg" alt="nav-icon" />
            <span>Collections</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/save-and-invest">
            <img src="@/assets/images/save-invest.svg" alt="nav-icon" />
            <span>Save & Invest</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/transfer">
            <img src="@/assets/images/invoicing.svg" alt="nav-icon" />
            <span>Transfer</span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Tier 3 Links -->
      <ul class="side-nav-list sn-padded tier-3">
        <li class="side-nav-item">
          <NuxtLink to="/roles-and-settings">
            <img src="@/assets/images/settings.svg" alt="nav-icon" />
            <span>Roles & Settings</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/support">
            <img src="@/assets/images/support.svg" alt="nav-icon" />
            <span>Help & Support</span>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Footer Section -->
    <div class="side-nav-footer">
      <img src="@/assets/images/ellignton-pay-logo-white.png" alt="ElligntonPay" />
      <span>© ElligntonPay</span>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped src="@/assets/css/sidenav.css"></style>
<style scoped></style>
