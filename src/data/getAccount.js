import { checkToken } from "@/utils/checkAuth";



export const getUser = async ()=>{
    try{
        const {data} = await checkToken()
        const res = await fetch("http://localhost:4000/api/user/user",{
            headers:{
                "id":data.user.id
            },
            method:"GET"
        })
        const result = await res.json()
        return result
        
    }catch(error){
        console.log(error);
    }
}

