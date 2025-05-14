import { fabric } from 'fabric'
import { useEvent } from 'react-use'
import { useZoom } from './use-zoom'
import { useEffect } from 'react'

interface UseHotkeysProps {
  container: HTMLDivElement | null
  canvas: fabric.Canvas | null
  undo: () => void
  redo: () => void
  save: (skip?: boolean) => void
  copy: () => void
  paste: () => void
}

export const useHotkeys = ({
  container,
  canvas,
  undo,
  redo,
  save,
  copy,
  paste,
}: UseHotkeysProps) => {
  const { zoomTo } = useZoom({ canvas })

  useEvent('keydown', event => {
    const isCtrlKey = event.ctrlKey || event.metaKey
    const isBackspace = event.key === 'Backspace'
    const isInput = ['INPUT', 'TEXTAREA'].includes(
      (event.target as HTMLElement).tagName,
    )

    if (isInput) return

    // delete key
    if (event.keyCode === 46) {
      canvas?.getActiveObjects().forEach(Object => canvas?.remove(Object))
      canvas?.discardActiveObject()
      canvas?.renderAll()
    }

    if (isBackspace) {
      canvas?.remove(...canvas.getActiveObjects())
      canvas?.discardActiveObject()
    }

    if (isCtrlKey && event.key === 'z') {
      event.preventDefault()
      undo()
    }

    if (isCtrlKey && event.key === 'y') {
      event.preventDefault()
      redo()
    }

    if (isCtrlKey && event.key === 'c') {
      event.preventDefault()
      copy()
    }

    if (isCtrlKey && event.key === 'v') {
      event.preventDefault()
      paste()
    }

    if (isCtrlKey && event.key === 's') {
      event.preventDefault()
      save(true)
    }

    if (isCtrlKey && event.key === 'a') {
      event.preventDefault()
      canvas?.discardActiveObject()

      const allObjects = canvas
        ?.getObjects()
        .filter(object => object.selectable)

      canvas?.setActiveObject(
        new fabric.ActiveSelection(allObjects, { canvas }),
      )
      canvas?.renderAll()
    }
  })

  useEffect(() => {
    const preventBrowserZoom = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        return false
      }
    }

    if (container) {
      container.addEventListener('wheel', preventBrowserZoom, {
        passive: false,
      })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', preventBrowserZoom)
      }
    }
  }, [container])

  useEvent('wheel', (event: WheelEvent) => {
    if (!canvas || !container) return

    if (!container.contains(event.target as Node)) return

    if (event.ctrlKey || event.metaKey) {
      event.preventDefault()

      const zoomLevel = canvas.getZoom() * 100

      const delta = event.deltaY

      const zoomStep = 1
      const newZoomLevel =
        delta < 0
          ? Math.min(zoomLevel + zoomStep, 200)
          : Math.max(zoomLevel - zoomStep, 10)

      zoomTo(newZoomLevel)

      return false
    }
  })
}
