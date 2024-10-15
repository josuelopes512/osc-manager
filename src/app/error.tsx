'use client'
import { Button } from '@nextui-org/react'
import { FaExclamationTriangle } from 'react-icons/fa'

export default function Error() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">Error</h1>
      <FaExclamationTriangle size={50} className="mb-4 text-2xl" />
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <Button
        onClick={() => window.location.reload()}
        color="primary"
        className={'mt-8'}
      >
        Refresh
      </Button>
    </div>
  )
}
