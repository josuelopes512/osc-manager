import { User } from '@prisma/client'

export interface NavbarMenuItem {
  name: string
  path: string
  icon: string
}

export interface NavbarProps {
  menuItems: NavbarMenuItem[]
  pathname: string
  theme?: 'dark' | 'light'
  setTheme: (theme?: 'dark' | 'light') => void
  profile?: User
}
