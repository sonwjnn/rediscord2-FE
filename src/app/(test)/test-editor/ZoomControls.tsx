import { useState } from 'react'
import styles from './SimpleCanvas.module.css'

interface ZoomControlsProps {
  zoomLevel: number
  onZoomChange: (level: number) => void
  onReset: () => void
  onZoomToFit: () => void
}

export const ZoomControls = ({
  zoomLevel,
  onZoomChange,
  onReset,
  onZoomToFit,
}: ZoomControlsProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleZoomIn = () => {
    onZoomChange(Math.min(zoomLevel + 10, 200))
  }

  const handleZoomOut = () => {
    onZoomChange(Math.max(zoomLevel - 10, 20))
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const zoomPresets = [
    { label: '200%', value: 200 },
    { label: '150%', value: 150 },
    { label: '100%', value: 100 },
    { label: '75%', value: 75 },
    { label: '50%', value: 50 },
    { label: '25%', value: 25 },
    { label: 'Fit', value: -1 },
  ]

  const handlePresetSelect = (value: number) => {
    if (value === -1) {
      onZoomToFit()
    } else {
      onZoomChange(value)
    }
    setIsDropdownOpen(false)
  }

  return (
    <div className={styles.zoomControls}>
      <button
        className={styles.zoomButton}
        onClick={handleZoomOut}
        aria-label="Zoom out"
      >
        -
      </button>

      <div className={styles.zoomDropdown}>
        <button className={styles.zoomValue} onClick={toggleDropdown}>
          {zoomLevel}%
        </button>

        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            {zoomPresets.map(preset => (
              <button
                key={preset.value}
                className={styles.dropdownItem}
                onClick={() => handlePresetSelect(preset.value)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        className={styles.zoomButton}
        onClick={handleZoomIn}
        aria-label="Zoom in"
      >
        +
      </button>

      <button className={styles.resetButton} onClick={onReset}>
        Reset
      </button>
    </div>
  )
}
