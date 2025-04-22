    import { Calendar, Home, Inbox, Search, Settings, UserSquare2Icon } from "lucide-react"
    import GroupNotifications from "./GroupNotifs"
    
    import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    } from "@/components/ui/sidebar"
import LogoutButton from "./Logout"
    
    // Menu items.
    const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Social",
        url: "/social",
        icon: Inbox,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: UserSquare2Icon,
    }
    ]
    
    export function AppSidebar() {
    const hasNewGroup = GroupNotifications()
    return (
        <Sidebar>
        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupLabel>FindMyTeam</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        {item.title === "Social" && hasNewGroup && (
                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                        )}
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                <LogoutButton />
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        </Sidebar>
    )
    }

    export default AppSidebar