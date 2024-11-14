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
          <NuxtLink to="/" exact-active-class="active">
            <img src="@/assets/images/getting-started.svg" alt="nav-icon" />
            <span>Getting Started</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/home" exact-active-class="active">
            <img src="@/assets/images/dashboard.svg" alt="nav-icon" />
            <span>Dashboard</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/transactions" exact-active-class="active">
            <img src="@/assets/images/transactions.svg" alt="nav-icon" />
            <span>Transactions</span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Tier 2 Links -->
      <ul class="side-nav-list sn-padded tier-2">
        <li class="side-nav-item">
          <NuxtLink to="/wallet" exact-active-class="active">
            <img src="@/assets/images/wallet.svg" alt="nav-icon" />
            <span>Wallet & Card</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/invoice" exact-active-class="active">
            <img src="@/assets/images/invoicing.svg" alt="nav-icon" />
            <span>Invoicing</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/payroll" exact-active-class="active">
            <img src="@/assets/images/payroll.svg" alt="nav-icon" />
            <span>Payroll</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/loans" exact-active-class="active">
            <img src="@/assets/images/loan-icon.svg" alt="nav-icon" />
            <span>Loan</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/collections" exact-active-class="active">
            <img src="@/assets/images/collections.svg" alt="nav-icon" />
            <span>Collections</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/save-and-invest" exact-active-class="active">
            <img src="@/assets/images/save-invest.svg" alt="nav-icon" />
            <span>Save & Invest</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/transfer" exact-active-class="active">
            <img src="@/assets/images/invoicing.svg" alt="nav-icon" />
            <span>Transfer</span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Tier 3 Links -->
      <ul class="side-nav-list sn-padded tier-3">
        <li class="side-nav-item">
          <NuxtLink to="/roles-and-settings" exact-active-class="active">
            <img src="@/assets/images/settings.svg" alt="nav-icon" />
            <span>Roles & Settings</span>
          </NuxtLink>
        </li>
        <li class="side-nav-item">
          <NuxtLink to="/support" exact-active-class="active">
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

<script>
export default {
  name: 'SideNav'
}
</script>

<style scoped>
/* General Styling */
#side-nav {
  width: 250px;
  background-color: #1a202c;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.user-div {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.user-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.user-name {
  color: #edf2f7;
  font-weight: bold;
}

/* Navigation List */
.nav-list-div {
  flex-grow: 1;
  overflow-y: auto;
}

.side-nav-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.side-nav-item {
  margin: 0.5rem 0;
}

.side-nav-item a {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #cbd5e0;
  transition: background 0.3s;
  border-radius: 8px;
}

.side-nav-item a:hover,
.side-nav-item a.active {
  background-color: #2d3748;
  color: #ffffff;
}

.side-nav-item img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

/* Footer Styling */
.side-nav-footer {
  text-align: center;
  padding: 1rem;
  font-size: 0.875rem;
  color: #a0aec0;
}

.side-nav-footer img {
  width: 120px;
  margin-bottom: 0.5rem;
}
</style>
