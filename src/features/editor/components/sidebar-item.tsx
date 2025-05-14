import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Hint } from '@/components/hint'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  isActive?: boolean
  onClick: () => void
}

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Hint label={label} side="right" sideOffset={12}>
      <Button
        variant="ghost"
        onClick={onClick}
        className={cn(
          'group size-[44px] mx-2 rounded-md flex flex-col hover:bg-[#0099cc] relative',
          'before:content-[""] before:block before:h-0 before:w-[8px] before:rounded-[8px]',
          'before:absolute before:left-[-12px] before:top-1/2 before:-translate-y-1/2',
          'before:transition-all before:duration-150 before:ease-linear ',
          isActive &&
            'bg-[#36383d] text-white before:bg-[#0099cc] before:h-[70%] hover:bg-[#36383d] hover:text-white',
        )}
      >
        <Icon
          className={cn(
            'size-6 stroke-2 shrink-0 text-white/60 group-hover:text-white',
            isActive && 'text-white',
          )}
        />
      </Button>
    </Hint>
  )
}
