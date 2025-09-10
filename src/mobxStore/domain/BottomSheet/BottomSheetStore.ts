import { EBottomSheet } from "@/src/models/bottomSheet/bottomSheet.interface";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { action, makeAutoObservable, observable } from "mobx";
import { createRef } from "react";

interface BottomSheetRefs {
    [key: string]: React.RefObject<BottomSheetModal | null>;
}

interface OpenedBottomSheets {
    [key: string]: boolean
}

export class BottomSheetStore {
    @observable activeBottomSheetKey: string | null = null;
    @observable bottomSheetRefs: BottomSheetRefs = {};
    @observable openedBottomSheets: OpenedBottomSheets = {}

    constructor() {
        makeAutoObservable(this);
    }

    @action
    openBottomSheet = (key: EBottomSheet) => {
        this.openedBottomSheets = { ...this.openedBottomSheets, [key]: true }
        this.bottomSheetRefs[key].current?.present()
    }

    @action
    closeBottomSheet = (key: EBottomSheet) => {
        this.openedBottomSheets[key] = false
        this.bottomSheetRefs[key].current?.close()

    }

    @action
    toggleBottomSheet = (key: EBottomSheet) => {
        if (this.activeBottomSheetKey === key) {
            this.closeBottomSheet(key);
        } else {
            this.openBottomSheet(key);
        }
    }

    @action
    createBottomRef(key: EBottomSheet) {
        this.bottomSheetRefs[key] = createRef<BottomSheetModal>()
        return this.bottomSheetRefs[key]
    }

}
