'use client'

import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { ZoomControls } from './ZoomControls'
import styles from './SimpleCanvas.module.css'

export const SimpleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [zoomLevel, setZoomLevel] = useState(100)

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return

    // Create canvas instance
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#f5f5f5',
      preserveObjectStacking: true,
    })

    // Add some sample objects
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: '#0d6efd',
      stroke: '#0a58ca',
      strokeWidth: 2,
    })

    const circle = new fabric.Circle({
      left: 300,
      top: 200,
      radius: 50,
      fill: '#dc3545',
      stroke: '#b02a37',
      strokeWidth: 2,
    })

    const text = new fabric.Text('Fabric.js Canvas', {
      left: 250,
      top: 350,
      fontFamily: 'Arial',
      fontSize: 24,
      fill: '#212529',
    })

    fabricCanvas.add(rect, circle, text)
    setCanvas(fabricCanvas)

    // Cleanup
    return () => {
      fabricCanvas.dispose()
    }
  }, [])

  // Handle zoom with mouse wheel + ctrl
  useEffect(() => {
    if (!containerRef.current || !canvas) return

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()

        // Calculate new zoom level
        const delta = e.deltaY
        const zoomStep = 5
        const newZoomLevel =
          delta < 0
            ? Math.min(zoomLevel + zoomStep, 200) // Zoom in (max 200%)
            : Math.max(zoomLevel - zoomStep, 20) // Zoom out (min 20%)

        // Get mouse position
        const pointer = canvas.getPointer(e)
        const point = new fabric.Point(pointer.x, pointer.y)

        // Apply zoom
        zoomToPoint(point, newZoomLevel)
      }
    }

    const container = containerRef.current
    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [canvas, zoomLevel])

  // Zoom to a specific point
  const zoomToPoint = (point: fabric.Point, newZoomLevel: number) => {
    if (!canvas) return

    const zoomRatio = newZoomLevel / zoomLevel
    const zoom = canvas.getZoom() * zoomRatio

    canvas.zoomToPoint(point, zoom)
    canvas.requestRenderAll()

    setZoomLevel(newZoomLevel)
  }

  // Zoom to a specific level (centered)
  const zoomTo = (level: number) => {
    if (!canvas) return

    const center = canvas.getCenter()
    const centerPoint = new fabric.Point(center.left, center.top)

    zoomToPoint(centerPoint, level)
  }

  // Reset zoom to 100%
  const resetZoom = () => {
    zoomTo(100)
  }

  // Fit canvas to view
  const zoomToFit = () => {
    if (!canvas || !containerRef.current) return

    const container = containerRef.current
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    const canvasWidth = canvas.getWidth()
    const canvasHeight = canvas.getHeight()

    const scaleX = containerWidth / canvasWidth
    const scaleY = containerHeight / canvasHeight
    const scale = Math.min(scaleX, scaleY) * 0.9 // 90% of the container

    const newZoomLevel = Math.round(scale * 100)
    zoomTo(newZoomLevel)
  }

  return (
    <div className={styles.canvasContainer}>
      <div className={styles.toolbar}>
        <ZoomControls
          zoomLevel={zoomLevel}
          onZoomChange={zoomTo}
          onReset={resetZoom}
          onZoomToFit={zoomToFit}
        />
      </div>
      <div ref={containerRef} className={styles.canvasWrapper}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}
