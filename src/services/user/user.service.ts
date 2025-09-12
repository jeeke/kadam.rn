import { IPatchUserRequestPayload } from "@/src/models/user/user.interface";
import { trpc } from "@/src/trpc/trpcClient";

export const fetchUserById = (id: number) => {
    return trpc.user.getById.query({ id })
};

export const patchUser = (id: number, payload: IPatchUserRequestPayload) => {
    return trpc.user.update.mutate({ id, data: payload });
};
