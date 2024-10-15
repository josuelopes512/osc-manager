import { User } from '@prisma/client'

export const menuItems = [
  {
    name: 'Home',
    path: '/',
    icon: 'home',
  },
  {
    name: 'Contatos',
    path: '/contatos',
    icon: 'contacts',
  },
  {
    name: 'Termos de uso',
    path: '/terms',
    icon: 'terms',
  },
  {
    name: 'Carteira',
    path: '/wallet/withdraw/network',
    icon: 'wallet',
  },
]

export const checkIfAdmin = (user: User) =>
  user.email === 'lucasnino1996@hotmail.com' ||
  user.email === 'leviacedo1@gmail.com'
