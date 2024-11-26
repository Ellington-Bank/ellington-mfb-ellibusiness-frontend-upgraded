<template>
  <div id="top-nav">
    <div class="row">
      <div class="col s12 pad0">
        <!-- Search Form -->
        <form class="col s12 m4">
          <div class="input-field flex-div">
            <img src="@/assets/images/search-icon.svg" alt="search icon" class="search-icon" />
            <input type="search" id="search-input" placeholder="Search something..." />
          </div>
        </form>

        <!-- Right Section with Icons and Logout -->
        <div class="col s12 m8">
          <ul class="flex-div right tn-list">
            <li>
              <a href="#">
                <img src="@/assets/images/help.svg" alt="help" class="top-nav-icon" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/bell.svg" alt="bell" class="top-nav-icon" />
              </a>
            </li>
            <li>
              <div class="switch">
                <span class="red-text">You are in test mode</span>
                <label>
                  <!-- Disabled Switch -->
                  <input type="checkbox" disabled />
                  <span class="lever"></span>
                </label>
              </div>
            </li>
            <li  v-if="authenticated">
              <nuxt-link @click="logout" class="logout-btn">Logout</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">  
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const router = useRouter();

export default {
    name: 'TopNav',

   /* data() {
      return {authenticated: authenticated}
    }*/
    setup() {
          const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
          const { logUserOut } = useAuthStore();
          const logout = function(){
                            logUserOut()
                            console.log("got here ....")
                            router.push('/login');
                         } 
          return {
            authenticated: authenticated,
            logout: logout
          }
     }

}
</script>

<style scoped src="@/assets/css/topnav.css"></style>
