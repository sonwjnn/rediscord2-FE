import { Expand, Minimize, ZoomIn, ZoomOut } from 'lucide-react'

import { Editor } from '@/features/editor/types'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
interface FooterProps {
  editor: Editor | undefined
}

const ZOOM_PRESETS = [
  { label: '200%', value: 200 },
  { label: '125%', value: 125 },
  { label: '100%', value: 100 },
  { label: '75%', value: 75 },
  { label: '50%', value: 50 },
  { label: '25%', value: 25 },
  { label: '10%', value: 10 },
  { label: 'Reset', value: -1 },
  // { label: 'Fill', value: -2 },
]

export const Footer = ({ editor }: FooterProps) => {
  const handlePresetSelect = (value: number) => {
    if (!editor) return

    if (value === -1) {
      // Fit
      editor.autoZoom()
    } else if (value === -2) {
      // Fill - zoom to fill the viewport
      editor.zoomTo(100) // Default to 100% for now
    } else {
      editor.zoomTo(value)
    }
  }

  return (
    <footer className="h-[50px] bg-transparent fixed right-0 bottom-0 w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-1 shrink-0 px-4 flex-row-reverse">
      <Hint label="Reset" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.autoZoom()}
          size="icon"
          variant="tools"
          className="h-full"
        >
          <Minimize className="size-4" />
        </Button>
      </Hint>
      <Hint label="Fill" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomToFill()}
          size="icon"
          variant="tools"
          className="h-full"
        >
          <Expand className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom in" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomIn()}
          size="icon"
          variant="tools"
          className="h-full"
        >
          <ZoomIn className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom out" side="top" sideOffset={10}>
        <Button
          onClick={() => editor?.zoomOut()}
          size="icon"
          variant="tools"
          className="h-full"
        >
          <ZoomOut className="size-4" />
        </Button>
      </Hint>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="tools" className="text-xs h-8 px-2">
            Zoom to
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-24">
          {ZOOM_PRESETS.map(preset => (
            <DropdownMenuItem
              key={preset.value}
              onClick={() => handlePresetSelect(preset.value)}
              className="flex items-center justify-between"
            >
              {preset.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </footer>
  )
}
