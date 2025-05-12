import { fabric } from 'fabric'
import { useCallback, useEffect } from 'react'
import { useZoomStore } from '../store/use-zoom-store'

interface UseAutoResizeProps {
  canvas: fabric.Canvas | null
  container: HTMLDivElement | null
}

export const useAutoResize = ({ canvas, container }: UseAutoResizeProps) => {
  const { setZoomLevel } = useZoomStore()

  const autoZoom = useCallback(() => {
    if (!canvas || !container) return

    const width = container.offsetWidth
    const height = container.offsetHeight

    canvas.setWidth(width)
    canvas.setHeight(height)

    const center = canvas.getCenter()

    const zoomRatio = 0.85
    const localWorkspace = canvas
      .getObjects()
      .find(object => object.name === 'clip')

    // @ts-ignore
    const scale = fabric.util.findScaleToFit(localWorkspace, {
      width: width,
      height: height,
    })

    const zoom = zoomRatio * scale
    setZoomLevel(Math.round(zoom * 100))

    canvas.setViewportTransform(fabric.iMatrix.concat())
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom)

    if (!localWorkspace) return

    const workspaceCenter = localWorkspace.getCenterPoint()
    const viewportTransform = canvas.viewportTransform

    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    ) {
      return
    }

    viewportTransform[4] =
      canvas.width / 2 - workspaceCenter.x * viewportTransform[0]

    viewportTransform[5] =
      canvas.height / 2 - workspaceCenter.y * viewportTransform[3]

    canvas.setViewportTransform(viewportTransform)

    localWorkspace.clone((cloned: fabric.Rect) => {
      canvas.clipPath = cloned
      canvas.requestRenderAll()
    })
  }, [canvas, container, setZoomLevel])

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
