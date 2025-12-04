import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth',{
    state:()=>({
        isLoggedIn:false,
        user:null
    }),
    actions:{
        async login(userData){
            this.isLoggedIn = true;
            this.user = userData
        },
        async logout(){
            //// logount
        }
    }
})