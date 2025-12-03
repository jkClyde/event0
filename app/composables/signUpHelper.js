
export const signUpHelper = async(formData,type)=>{
    const { fetch:refreshSession } = useUserSession();
    const toast = useToast();
    let response;

    try{
        if(type === 'sign-up'){
            response = await $fetch('/api/auth/sign-up',{
                method:'POST',
                body: formData
            });
        } else {

        }
        /// PINIA.....
        console.log(response.user)
        toast.add({
            title:'Congratulation',
            description:'Welcome !!!',
            color:'success'
        })
        await refreshSession();// IMPORTANT !!!!
        await navigateTo('/')
        return true;
    } catch(error){


        toast.add({
            title:'Oops',
            description: error.data?.statusMessage || 'Sorry, something happened',
            color:'error'
        })
        return false;
    }   
}