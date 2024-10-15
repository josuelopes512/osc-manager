'use client'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  path: string
  defaultText?: string
  listText?: string
  newText?: string
  editText?: string
}

export default function Header({
  editText,
  listText,
  newText,
  path = '/',
  defaultText,
}: HeaderProps) {
  const pathname = usePathname()
  const lists = pathname === '/' + path
  const newPath = pathname === `/${path}/new`
  const editPath = pathname?.match(/\/\d+/gm)

  return (
    <div className="my-8 flex w-full items-center justify-between">
      <h2 className="flex-grow text-3xl font-bold tracking-wide">
        {lists && `${listText || defaultText} list`}
        {newPath && `${newText || `New ${defaultText}`}`}
        {editPath && `Edit ${editText || defaultText}`}
      </h2>
    </div>
  )
}
