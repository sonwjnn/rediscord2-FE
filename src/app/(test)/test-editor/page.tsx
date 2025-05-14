'use client'

import { SimpleCanvas } from './SimpleCanvas'

export default function SimpleCanvasPage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Simple Fabric.js Canvas with Zoom</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="h-full">
          <SimpleCanvas />
        </div>
      </main>

      <footer className="p-4 bg-gray-100 text-center text-sm text-gray-600">
        <p>Use Ctrl + Mouse Wheel to zoom in/out</p>
      </footer>
    </div>
  )
}
