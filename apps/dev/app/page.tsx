'use client'

import { useEffect } from 'react'

import { hello } from '@lr-run/example-package'

export default function Home() {
  useEffect(() => {
    hello()
  }, [])

  return (
    <main className="flex items-center justify-center">
      <h1>Hello World</h1>
    </main>
  )
}
