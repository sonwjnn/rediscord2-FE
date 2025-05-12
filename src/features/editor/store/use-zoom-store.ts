import { create } from 'zustand'

interface ZoomStore {
  zoomLevel: number
  setZoomLevel: (zoomLevel: number) => void
}

export const useZoomStore = create<ZoomStore>()(set => ({
  zoomLevel: 100,
  setZoomLevel: zoomLevel => set({ zoomLevel }),
}))
