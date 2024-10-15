'use client'
import { NavbarMenuItem } from 'components/navbar/types'
import { Link, NavbarItem } from '@nextui-org/react'
import { FaFileContract, FaHome, FaUser, FaWallet } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { HiDocumentReport } from 'react-icons/hi'

export default function NavbarItems({
  item,
  pathname,
}: {
  item: NavbarMenuItem
  pathname: string
}) {
  const router = useRouter()
  return (
    <NavbarItem
      isActive={
        item.path === '/' ? pathname === '/' : pathname.includes(item.path)
      }
    >
      <Link
        color="foreground"
        className="nav-link cursor-pointer"
        // href={item.path}
        onClick={() => router.push(item.path)}
        title={item.name}
      >
        {item.icon === 'home' && <FaHome className="mr-2" />}
        {item.icon === 'terms' && <FaFileContract className="mr-2" />}
        {item.icon === 'contacts' && <FaUser className="mr-2" />}
        {item.icon === 'wallet' && <FaWallet className="mr-2" />}
        {item.icon === 'records' && <HiDocumentReport className="mr-2" />}
        {item.name}
      </Link>
    </NavbarItem>
  )
}
