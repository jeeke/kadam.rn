import { ApiClient } from "@/src/apiClient/ApiWrapper"

export const sendOtp = ()=>{
    return ApiClient.get('')
}