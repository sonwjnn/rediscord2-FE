import { fabric } from 'fabric'
import { useEffect } from 'react'
import { useZoom } from './use-zoom'

interface UseAutoResizeProps {
  canvas: fabric.Canvas | null
  container: HTMLDivElement | null
}

export const useAutoResize = ({ canvas, container }: UseAutoResizeProps) => {
  const { autoZoom } = useZoom({ canvas, container })

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null
    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => {
        autoZoom()
      })

      resizeObserver.observe(container)
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [canvas, container, autoZoom])

  return { autoZoom }
}
