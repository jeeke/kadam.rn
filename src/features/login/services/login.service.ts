import { ApiClient } from "@/src/apiClient/ApiWrapper"
import { ISendOtpRequestPayload, IVerifyOtpRequestPayload, IVerifyOtpResponse } from "../models/login.interface"

export const sendOtp = (payload: ISendOtpRequestPayload) => {
    return ApiClient.post('/users/send-otp', payload)
}

export const verifyOtp = (payload: IVerifyOtpRequestPayload) => {
    return ApiClient.post<IVerifyOtpResponse>('/users/verify-otp', payload)
}