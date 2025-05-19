import { ActiveTool, Editor, fonts } from '@/features/editor/types'
import { ToolSidebarClose } from '@/features/editor/components/tool-sidebar-close'
import { ToolSidebarHeader } from '@/features/editor/components/tool-sidebar-header'

import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

interface FontSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const FontSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FontSidebarProps) => {
  const value = editor?.getActiveFontFamily()

  const onClose = () => {
    onChangeActiveTool('select')
  }

  return (
    <aside
      className={cn(
        'bg-[#16181d] ring ring-[#25272c] rounded-md relative z-[40] w-[320px] mr-2 h-full flex flex-col',
        activeTool === 'font' ? 'visible' : 'hidden',
      )}
    >
      <ToolSidebarHeader title="Font" description="Change the text font" />
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-1 border-b">
            {fonts.map(font => (
              <Button
                key={font}
                variant="secondary"
                size="lg"
                className={cn(
                  'w-full h-16 justify-start text-left',
                  value === font && 'border-2 border-blue-500',
                )}
                style={{
                  fontFamily: font,
                  fontSize: '16px',
                  padding: '8px 16px',
                }}
                onClick={() => editor?.changeFontFamily(font)}
              >
                {font}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  )
}
