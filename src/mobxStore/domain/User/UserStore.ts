import { IPatchUserRequestPayload, IUser } from "@/src/models/user/user.interface";
import { fetchUserById, patchUser } from "@/src/services/user/user.service";
import { action, makeObservable, observable } from "mobx";
import RootStore from "../../RootStore";

export class UserStore {
    rootStore: typeof RootStore
    @observable isFetchingUser: boolean = false
    @observable user: IUser | null = null;
    @observable isNewUser: boolean = false

    constructor(rootStore: typeof RootStore) {
        makeObservable(this);
        this.rootStore = rootStore
    }

    @action
    async fetchUser(id: number) {
        this.isFetchingUser = true;
        try {
            const response = await fetchUserById(id);
            if (response.data?.data) {
                this.user = response.data.data;
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            this.user = null;
        } finally {
            this.isFetchingUser = false;
        }
    }

    @action
    async updateUser(id: number, payload: IPatchUserRequestPayload) {
        this.isFetchingUser = true;
        try {
            const response = await patchUser(id, payload);
            if (response.data?.data) {
                this.user = response.data.data;
            }
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            this.isFetchingUser = false;
        }
    }

    @action
    onLogout() {
        this.isFetchingUser = false
        this.user = null;
    }
}