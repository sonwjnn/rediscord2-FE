import { Minimize, ZoomIn, ZoomOut } from 'lucide-react'

import { Editor } from '@/features/editor/types'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { ZoomSlider } from './zoom-slider'

interface FooterProps {
  editor: Editor | undefined
}

export const Footer = ({ editor }: FooterProps) => {
  return (
    <footer className="h-[52px] border-t bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-1 shrink-0 px-4 flex-row-reverse">
      <ZoomSlider editor={editor} />
    </footer>
  )
}
