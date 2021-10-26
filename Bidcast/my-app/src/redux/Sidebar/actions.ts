

export function menuIconClick (
isCollapse:boolean
) {
    return {
        type: "@@sidebar/MENU_ONCLICK" as const,
        isCollapse
    }
}

export type SidebarActions = ReturnType<typeof menuIconClick>
