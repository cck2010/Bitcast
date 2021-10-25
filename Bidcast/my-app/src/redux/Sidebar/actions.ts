

export function menuIconClick (
isCollapse:boolean
) {
    return {
        type: "@@SIDEBAR/MENU_ONCLICK" as const,
        isCollapse
    }
}

export type SidebarActions = ReturnType<typeof menuIconClick>
