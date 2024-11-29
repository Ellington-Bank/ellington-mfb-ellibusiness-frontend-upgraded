import { defineStore } from 'pinia';

interface UserPayloadInterface {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    userDetails: null,
    profile: null,
    userId: null,
    isBusinessRegistered: false
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      console.log(email, password)
      const { data, pending }: any = await useFetch('http://localhost:3006/api/v1/auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password,
        },
      });

      console.log("datax", data.value)
     // console.log("data", data.value, data._rawValue, data._rawValue.auth_token)
      this.loading = pending;

      if (data.value) {
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = data?.value; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
        console.log(data?.value?.profile.userId);
        this.userDetails = data?.value?.profile;
        this.profile = data?.value?.profile;
        this.userId = data?.value?.profile?.userId
      }
    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
    getUserDetails(){
      return this.userDetails;
    },
    setBusinssStatus(status: boolean){
      this.isBusinessRegistered = status;
    }

  },
});