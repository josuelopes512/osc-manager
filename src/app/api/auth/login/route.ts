import { userService } from '@/app/api/user/service'
import { NextResponse } from 'next/server'
import { User, Wallet } from '@prisma/client'
import { walletService } from '@/app/api/wallet/service'
import { accountService } from '@/app/api/account/service'
import { type Account } from 'next-auth'
import { handleRef } from '@/app/api/auth/login/services'

export async function POST(req: Request) {
  try {
    const accountBody = (await req.json()) as Account & { ref: string }

    const { ref } = accountBody

    if (!accountBody.userData?.email) {
      return NextResponse.json({ msg: 'Email is required' }, { status: 401 })
    }

    let user: (User & { wallet?: Wallet }) | null = null

    // console.log('Nanoid:', nanoid())

    const account = await accountService.findOne({
      where: {
        provider_providerAccountId: {
          provider: accountBody.provider,
          providerAccountId: String(accountBody.providerAccountId),
        },
      },
    })

    if (!account) {
      if (ref) {
        const checkIfRefExists = await userService.findOne({
          where: { referralCode: ref },
        })
        if (!checkIfRefExists) {
          return NextResponse.json(
            { msg: 'Referral code does not exist' },
            { status: 401 },
          )
        }
      }
      let referralCode = await handleRef()

      const acc = await accountService.create({
        data: {
          type: accountBody.type,
          provider: accountBody.provider,
          providerAccountId: accountBody.providerAccountId,
          refresh_token: accountBody.refresh_token,
          access_token: accountBody.access_token,
          expires_at: accountBody.expires_at,
          id_token: accountBody.id_token,
          token_type: accountBody.token_type,
          scope: accountBody.scope,
          session_state: accountBody.session_state,
          user: {
            connectOrCreate: {
              where: { email: accountBody.userData.email },
              create: {
                email: accountBody.userData.email,
                name: accountBody.userData.name,
                image: accountBody.userData.image,
                referralCode,
                referredBy: ref,
              },
            },
          },
        },
      })

      user = (await userService.findOne({
        where: { id: acc.userId },
        include: { wallet: true },
      })) as User & { wallet?: Wallet }

      if (!user.wallet) {
        await walletService.create({
          data: {
            user: { connect: { id: acc.userId } },
            balance: 0,
          },
        })
      }
    } else {
      const userHasRef = await userService.findOne({
        where: {
          id: account.userId,
          AND: {
            referralCode: { not: null },
            AND: { referralCode: { not: '' } },
          },
        },
      })
      let referralCode
      if (!userHasRef) {
        referralCode = await handleRef()
        await userService.update({
          where: { id: account.userId },
          data: { referralCode },
        })
      }

      await accountService.update({
        where: { id: account.id },
        data: {
          type: accountBody.type,
          provider: accountBody.provider,
          providerAccountId: accountBody.providerAccountId,
          refresh_token: accountBody.refresh_token,
          access_token: accountBody.access_token,
          expires_at: accountBody.expires_at,
          id_token: accountBody.id_token,
          token_type: accountBody.token_type,
          scope: accountBody.scope,
          session_state: accountBody.session_state,
          user: {
            connectOrCreate: {
              where: { email: accountBody.userData.email },
              create: {
                email: accountBody.userData.email,
                name: accountBody.userData.name,
                image: accountBody.userData.image,
                wallet: {
                  connectOrCreate: {
                    where: { userId: account.userId },
                    create: {
                      balance: 0,
                    },
                  },
                },
              },
            },
          },
        },
      })
    }

    user = await userService.findOne({
      where: { id: account?.userId },
    })

    if (user?.blocked) {
      return NextResponse.json(
        { error: 'User is blocked, contact support' },
        { status: 403 }, // 403 Forbidden
      )
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.error('Error while trying to log-in', error)
    return NextResponse.json(
      { msg: 'Error while trying to log-in' },
      { status: 500 },
    )
  }
}
