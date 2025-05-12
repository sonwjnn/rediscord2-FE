import { Slider } from '@/components/ui/slider'
import { Editor } from '@/features/editor/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ZoomSliderProps {
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
  { label: 'Fit', value: -1 },
  // { label: 'Fill', value: -2 },
]

export const ZoomSlider = ({ editor }: ZoomSliderProps) => {
  if (!editor) return null

  const zoomLevel = editor.getZoomLevel()

  const handleZoomChange = (values: number[]) => {
    if (!editor) return
    editor.zoomTo(values[0])
  }

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
    <div className="flex items-center gap-2 w-[200px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-xs w-14 h-8 px-2 border rounded flex items-center justify-center hover:bg-gray-50">
            {zoomLevel}%
          </button>
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
      <Slider
        value={[zoomLevel]}
        min={10}
        max={200}
        step={1}
        onValueChange={handleZoomChange}
      />
    </div>
  )
}
