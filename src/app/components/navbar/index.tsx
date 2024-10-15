'use client'

import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { menuItems } from './constants'
import NavbarWrapper from 'components/navbar/wrapper'
import { useSession } from 'next-auth/react'

const NavbarComp: React.FC = () => {
  const pathname = usePathname()

  const { data } = useSession()

  const { theme, setTheme } = useTheme()

  return (
    <NavbarWrapper
      menuItems={menuItems}
      pathname={pathname}
      theme={theme as 'dark' | 'light'}
      setTheme={(t) => setTheme(t as 'dark' | 'light')}
      profile={data?.userData}
    />
  )
}

export default NavbarComp
