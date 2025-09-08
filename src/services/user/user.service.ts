import { ApiClient } from "@/src/apiClient/ApiWrapper"
import { IFetchUserResponse, IPatchUserRequestPayload, IPatchUserResponse } from "@/src/models/user/user.interface"

export const fetchUserById = (id: number) => {
    return ApiClient.get<IFetchUserResponse>(`/users/${id}`)
}

export const patchUser = (id: number, payload: IPatchUserRequestPayload) => {
    return ApiClient.patch<IPatchUserResponse>(`/users/${id}`, payload)
}
