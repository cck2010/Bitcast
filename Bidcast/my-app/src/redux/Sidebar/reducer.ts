import produce from "immer";
import { SidebarActions } from "./actions";


export interface SidebarState {
    menuCollapse: boolean
}

const initialState: SidebarState = {
    menuCollapse: true
}

export function sidebarReducer (
    state: SidebarState = initialState,
    action: SidebarActions
): SidebarState {
    return produce(state, (newState) => {
        switch (action.type) {
            case "@@sidebar/MENU_ONCLICK":
                newState.menuCollapse = action.isCollapse
                break;
        }
    })
}