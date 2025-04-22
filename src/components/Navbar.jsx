    import { Calendar, Home, Inbox, Search, Settings, UserSquare2Icon } from "lucide-react"
    
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
        url: "#",
        icon: UserSquare2Icon,
    }
    ]
    
    export function AppSidebar() {
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