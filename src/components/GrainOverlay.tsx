'use client'

export default function GrainOverlay() {
  return (
    <div className="grain-overlay" aria-hidden="true">
      <svg>
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.04" />
      </svg>
    </div>
  )
}
