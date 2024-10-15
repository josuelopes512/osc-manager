'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAdShownHook } from '@/hooks/useAdShown'

export function RouteChangeListener() {
  const pathname = usePathname()
  const [previousPathname, setPreviousPathname] = useState('')
  const { setAdShown } = useAdShownHook()

  useEffect(() => {
    if (previousPathname !== pathname) {
      setPreviousPathname(pathname)
      setAdShown(true)
    }
  }, [pathname, previousPathname, setAdShown])

  return null
}
