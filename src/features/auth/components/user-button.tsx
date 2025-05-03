'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useBilling } from '@/features/subscriptions/api/use-billing'
import { useAuth } from '@/hooks/use-auth'
import { CreditCard, Loader2, LogOut, UserCircle } from 'lucide-react'

export const UserButton = () => {
  const mutation = useBilling()
  const { currentUser, logout, isLoading } = useAuth()

  const onClick = () => {
    mutation.mutate()
  }

  if (isLoading) {
    return <Loader2 className="size-4 animate-spin text-muted-foreground" />
  }

  if (!currentUser) {
    return null
  }

  const name = currentUser.username || ''
  const email = currentUser.email || ''
  const imageUrl = currentUser.image || ''

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="size-10 cursor-pointer ring-2 ring-offset-2 ring-offset-background transition hover:ring-primary">
          <AvatarImage alt={name} src={imageUrl} />
          <AvatarFallback className="flex items-center justify-center bg-sky-500 font-medium text-white">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="space-y-1">
          {/* <Link href="/my-profile/settings"> */}
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent">
            <UserCircle className="size-4" />
            My Profile
          </DropdownMenuItem>
          {/* </Link> */}
        </div>
        <div className="space-y-1">
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
            onClick={onClick}
          >
            <CreditCard className="size-4" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem
            className="group flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm  hover:!bg-red-100 hover:!text-red-700"
            onClick={() => logout()}
          >
            <LogOut className="size-4 group-hover:text-red-700" />
            Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
