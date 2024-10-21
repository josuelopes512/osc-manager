'use client'
import { useTranslations } from 'next-intl'
import { cn } from '@nextui-org/react'
import Image, { StaticImageData } from 'next/image'
import cryptos from '@/assets/images/cryptos.png'
import React from 'react'

interface HeaderProps {
  namespace: string
  text?: string
  className?: string
  image?: string | StaticImageData
}

export default function HeaderPages({
  namespace,
  text,
  className,
  image,
}: HeaderProps) {
  const t = useTranslations(namespace)

  return (
    <div
      className={cn(
        'my-8 flex w-full items-center justify-center text-center',
        className,
      )}
    >
      {text && (
        <h1 className="flex-grow text-3xl font-bold tracking-wide">
          {t(text)}
        </h1>
      )}

      {image && <Image src={image} alt="cryptos" width={400} height={190} />}
    </div>
  )
}
