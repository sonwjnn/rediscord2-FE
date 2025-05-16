import { useCallback, useRef } from 'react'
import { fabric } from 'fabric'

interface UseZoomProps {
  canvas: fabric.Canvas | null
  container?: HTMLDivElement | null
}

export const useZoom = ({ canvas, container }: UseZoomProps) => {
  const zoomingRef = useRef(false)

  const zoomTo = useCallback(
    (level: number) => {
      if (!canvas || zoomingRef.current) return

      zoomingRef.current = true

      canvas.renderOnAddRemove = false

      const newZoom = level / 100
      const center = canvas.getCenter()

      requestAnimationFrame(() => {
        canvas.zoomToPoint(new fabric.Point(center.left, center.top), newZoom)

        canvas.renderOnAddRemove = true

        // canvas.fire('zoom:changed')
        canvas.requestRenderAll()
        zoomingRef.current = false
      })
    },
    [canvas],
  )

  const zoomIn = useCallback(() => {
    if (!canvas) return

    let zoomRatio = canvas.getZoom()
    zoomRatio += 0.05
    const center = canvas.getCenter()
    canvas.zoomToPoint(
      new fabric.Point(center.left, center.top),
      zoomRatio > 2 ? 2 : zoomRatio,
    )
  }, [canvas])

  const zoomOut = useCallback(() => {
    if (!canvas) return

    let zoomRatio = canvas.getZoom()
    zoomRatio -= 0.05
    const center = canvas.getCenter()
    canvas.zoomToPoint(
      new fabric.Point(center.left, center.top),
      zoomRatio < 0.2 ? 0.2 : zoomRatio,
    )
  }, [canvas])

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
    canvas.renderAll()

    localWorkspace.clone((cloned: fabric.Rect) => {
      canvas.clipPath = cloned
      canvas.requestRenderAll()
    })
  }, [canvas, container])

  const resetZoom = useCallback(() => {
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

    const zoom = zoomRatio * 1

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
    canvas.renderAll()

    localWorkspace.clone((cloned: fabric.Rect) => {
      canvas.clipPath = cloned
      canvas.requestRenderAll()
    })
  }, [canvas, container])

  return {
    zoomTo,
    zoomIn,
    zoomOut,
    resetZoom,
    autoZoom,
  }
}
