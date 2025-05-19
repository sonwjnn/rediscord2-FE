import type { IconType } from 'react-icons'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface ShapeImageToolProps {
  onClick: () => void
  imageSrc: string
  imageClassName?: string
}

export const ShapeImageTool = ({
  onClick,
  imageSrc,
  imageClassName,
}: ShapeImageToolProps) => {
  return (
    <button onClick={onClick} className="aspect-square border rounded-md p-5">
      <img
        src={imageSrc}
        alt=""
        className={cn('h-full w-full', imageClassName)}
      />
    </button>
  )
}
