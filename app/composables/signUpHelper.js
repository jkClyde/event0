
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
        if(error.statusCode === 400 && error.data?.data){
            const validationErrors = error.data.data.errorsArray;
            validationErrors.forEach(err=>{
                 toast.add({
                    title:'Oops',
                    description: err,
                    color:'error'
                })
            })
        } else {
            toast.add({
                title:'Oops',
                description: error.data?.statusMessage || 'Sorry, something happened',
                color:'error'
            })
        }

        return false;
    }   
}