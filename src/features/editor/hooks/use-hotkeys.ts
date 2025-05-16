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

  useEvent('wheel', (event: WheelEvent) => {
    if (!canvas || !container) return

    if (!container.contains(event.target as Node)) return

    event.preventDefault()

    const delta = event.deltaY
    let zoom = canvas.getZoom()
    zoom *= 0.999 ** delta
    if (zoom > 20) zoom = 20
    if (zoom < 0.01) zoom = 0.01
    const center = canvas.getCenter()
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom)
    event.preventDefault()
    event.stopPropagation()
    return false
  })
}
