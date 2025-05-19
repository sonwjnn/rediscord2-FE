'use client'

import {
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Settings,
  Shapes,
  Sparkles,
  Type,
} from 'lucide-react'

import { ActiveTool } from '@/features/editor/types'
import { SidebarItem } from '@/features/editor/components/sidebar-item'

interface SidebarProps {
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const Sidebar = ({ activeTool, onChangeActiveTool }: SidebarProps) => {
  return (
    <aside className="bg-[#16181d] rounded-md border-r border-[#171719] ring ring-[#25272c] mr-2 flex flex-col w-[60px] h-full overflow-y-auto">
      <ul className="flex flex-col gap-y-[10px] mt-5">
        <SidebarItem
          icon={LayoutTemplate}
          label="Design"
          isActive={activeTool === 'templates'}
          onClick={() => onChangeActiveTool('templates')}
        />
        <SidebarItem
          icon={ImageIcon}
          label="Image"
          isActive={activeTool === 'images'}
          onClick={() => onChangeActiveTool('images')}
        />
        <SidebarItem
          icon={Type}
          label="Text"
          isActive={activeTool === 'text'}
          onClick={() => onChangeActiveTool('text')}
        />
        <SidebarItem
          icon={Shapes}
          label="Shapes"
          isActive={activeTool === 'shapes'}
          onClick={() => onChangeActiveTool('shapes')}
        />
        <SidebarItem
          icon={Pencil}
          label="Draw"
          isActive={activeTool === 'draw'}
          onClick={() => onChangeActiveTool('draw')}
        />
        <SidebarItem
          icon={Sparkles}
          label="AI"
          isActive={activeTool === 'ai'}
          onClick={() => onChangeActiveTool('ai')}
        />
        <SidebarItem
          icon={Settings}
          label="Settings"
          isActive={activeTool === 'settings'}
          onClick={() => onChangeActiveTool('settings')}
        />
      </ul>
    </aside>
  )
}
