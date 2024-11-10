import { checkToken } from "@/utils/checkAuth";


export const addCampaign = async (body)=>{
    try {
        const res = await fetch("http://localhost:4000/api/campaign",{
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
        

        const res = await fetch("http://localhost:4000/api/campaign",{
            headers:{
                'Content-Type': 'application/json',
                'id': data.user.id
            }
        })
        const result = await res.json()
        console.log(result.campaigns);
        
        return result.campaigns
        
    } catch (error) {
        console.log(error);
    }
}