import { IoTriangle } from 'react-icons/io5'
import { FaDiamond } from 'react-icons/fa6'
import { FaCircle, FaSquare, FaSquareFull } from 'react-icons/fa'

import { ActiveTool, Editor } from '@/features/editor/types'
import { ShapeTool } from '@/features/editor/components/shape-tool'
import { ToolSidebarClose } from '@/features/editor/components/tool-sidebar-close'
import { ToolSidebarHeader } from '@/features/editor/components/tool-sidebar-header'

import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { shapesSrc } from '@/data/shapes'
import { ShapeImageTool } from './shape-image-tool'

interface ShapeSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const ShapeSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ShapeSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool('select')
  }

  return (
    <aside
      className={cn(
        'bg-[#16181d] ring ring-[#25272c] rounded-md relative z-[40] w-[320px] mr-2 h-full flex flex-col',
        activeTool === 'shapes' ? 'visible' : 'hidden',
      )}
    >
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      />
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="grid grid-cols-3 gap-4 p-4">
            <ShapeTool onClick={() => editor?.addCircle()} icon={FaCircle} />
            <ShapeTool
              onClick={() => editor?.addSoftRectangle()}
              icon={FaSquare}
            />
            <ShapeTool
              onClick={() => editor?.addRectangle()}
              icon={FaSquareFull}
            />
            <ShapeTool
              onClick={() => editor?.addTriangle()}
              icon={IoTriangle}
            />
            <ShapeTool
              onClick={() => editor?.addInverseTriangle()}
              icon={IoTriangle}
              iconClassName="rotate-180"
            />
            <ShapeTool onClick={() => editor?.addDiamond()} icon={FaDiamond} />
            {shapesSrc.map((src, index) => (
              <ShapeImageTool
                key={index}
                onClick={() => editor?.addImageShape(src)}
                imageSrc={src}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  )
}
