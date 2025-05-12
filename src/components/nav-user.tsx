'use client'

import { ChevronsUpDown, CreditCard, LogOut, Settings2Icon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { useS3Image } from '@/hooks/use-s3-image'
import { useBilling } from '@/features/subscriptions/api/use-billing'
import { usePaywall } from '@/features/subscriptions/hooks/use-paywall'

export function NavUser() {
  const { currentUser, logout } = useAuth()
  const { imageUrl } = useS3Image(currentUser?.image?.path)
  const { isMobile } = useSidebar()
  const billingMutation = useBilling()
  const { shouldBlock, triggerPaywall } = usePaywall()

  if (!currentUser) {
    return null
  }

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall()
      return
    }

    billingMutation.mutate()
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarFallback className="rounded-full font-medium bg-primary text-primary-foreground text-xs">
                  {currentUser.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentUser.username}
                </span>
                <span className="truncate text-xs">{currentUser.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={imageUrl} alt={currentUser.username} />
                  <AvatarFallback className="rounded-full font-medium bg-primary text-primary-foreground text-xs">
                    {currentUser.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {currentUser.username}
                  </span>
                  <span className="truncate text-xs">{currentUser.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup></DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/account-settings" className="w-full cursor-pointer">
                <DropdownMenuItem>
                  <Settings2Icon />
                  Settings
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem onClick={onClick}>
                <CreditCard />
                Billing
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => logout()}
              className="text-destructive hover:!text-destructive hover:!bg-rose-100 transition"
            >
              <LogOut className="size-4 text-destructive" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
