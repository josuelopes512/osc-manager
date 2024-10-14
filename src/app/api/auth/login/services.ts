import { customAlphabet } from 'nanoid'
import { userService } from '@/app/api/user/service'

export async function handleRef(): Promise<string> {
  const nanoid = customAlphabet(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    8,
  )
  let referralCode = nanoid()
  const checkIfRefExists = await userService.findOne({
    where: { referralCode: referralCode },
  })
  if (checkIfRefExists) {
    return handleRef()
  }
  return referralCode
}
