"use client"

import React from 'react'

interface DottedSurfaceProps {
  className?: string
}

export function DottedSurface({ className }: DottedSurfaceProps) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: `radial-gradient(#e5e7eb 1px, transparent 1px)`,
        backgroundSize: '16px 16px',
      }}
    />
  )
}
