import { checkToken } from "@/utils/checkAuth";
import { BaseApiUrl } from "@/utils/constanst";


export const addCampaign = async (body)=>{
    try {
        const res = await fetch(BaseApiUrl+"/api/campaign",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()

        console.log(data);
        
    } catch (error) {
        console.log(error);
    }
}

export const getAllCampaign = async ()=>{
    
    try {
        const {data} = await checkToken()

        console.log(data);
        

        const res = await fetch(BaseApiUrl+"/api/campaign",{
            headers:{
                'Content-Type': 'application/json',
                'id': data.user.id
            }
        })
        const result = await res.json()
        
        return result.campaigns
        
    } catch (error) {
        console.log(error);
    }
}