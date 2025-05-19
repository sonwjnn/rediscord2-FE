import { useState } from 'react'

import { usePaywall } from '@/features/subscriptions/hooks/use-paywall'

import { ActiveTool, Editor } from '@/features/editor/types'
import { ToolSidebarClose } from '@/features/editor/components/tool-sidebar-close'
import { ToolSidebarHeader } from '@/features/editor/components/tool-sidebar-header'

import { useGenerateImage } from '@/features/ai/api/use-generate-image'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'

interface AiSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const AiSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AiSidebarProps) => {
  const { shouldBlock, triggerPaywall } = usePaywall()
  const mutation = useGenerateImage()

  const [value, setValue] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (shouldBlock) {
      triggerPaywall()
      return
    }

    mutation.mutate(
      { prompt: value },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data.image)
        },
      },
    )
  }

  const onClose = () => {
    onChangeActiveTool('select')
  }

  return (
    <aside
      className={cn(
        'bg-[#16181d] ring ring-[#25272c] relative rounded-md z-[40] w-[320px] mr-2 h-full flex flex-col',
        activeTool === 'ai' ? 'visible' : 'hidden',
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate an image using AI" />
      <ScrollArea>
        <form onSubmit={onSubmit} className="p-4 space-y-6">
          <Textarea
            disabled={mutation.isPending}
            placeholder="An astronaut riding a horse on mars, hd, dramatic lighting"
            cols={30}
            rows={10}
            required
            minLength={3}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <Button disabled={false} type="submit" className="w-full">
            Generate
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  )
}
