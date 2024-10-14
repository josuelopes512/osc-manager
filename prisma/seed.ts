// import {
//   Account,
//   Ad,
//   Popup,
//   Net,
//   Chest,
//   Ranking,
//   Job,
//   Bonus,
//   Reward,
//   PrismaClient,
//   User,
//   VerificationToken,
//   Wallet,
//   Withdrawal,
// } from '@prisma/client'
//
// import * as fs from 'fs'
// const prisma = new PrismaClient({
//   datasourceUrl: 'postgres://postgres:118593Gleik@localhost:5432/viu-ganhou',
// })
//
// const accountsPath = 'prisma/backup/accounts.json'
// const adPath = 'prisma/backup/ad.json'
// const popupPath = 'prisma/backup/popup.json'
// const usersPath = 'prisma/backup/users.json'
// const chestsPath = 'prisma/backup/chest.json'
// const rankingsPath = 'prisma/backup/ranking.json'
// const jobsPath = 'prisma/backup/job.json'
// const bonusesPath = 'prisma/backup/bonus.json'
// const rewardsPath = 'prisma/backup/referrer.json'
// const netsPath = 'prisma/backup/net.json'
// const verificationtokensPath = 'prisma/backup/verificationtokens.json'
// const walletPath = 'prisma/backup/wallet.json'
// const withdrawalPath = 'prisma/backup/withdrawal.json'
//
// const accounts = JSON.parse(fs.readFileSync(accountsPath, 'utf-8')) as {
//   accounts: any[]
// }
//
// const accountsParsed = accounts.accounts.map((account) => {
//   return {
//     ...account,
//     userId: account.user_id,
//     user_id: undefined,
//     providerAccountId: account.provider_account_id,
//     provider_account_id: undefined,
//   }
// }) as Account[]
//
// const ads = JSON.parse(fs.readFileSync(adPath, 'utf-8')) as { Ad: Ad[] }
// const adsParsed = ads.Ad
//
// const popups = JSON.parse(fs.readFileSync(popupPath, 'utf-8')) as {
//   Popup: Popup[]
// }
// const popupsParsed = popups.Popup
//
// const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8')) as {
//   users: any[]
// }
//
// const usersParsed = users.users.map((user) => {
//   return {
//     ...user,
//     emailVerified: user.email_verified,
//     email_verified: undefined,
//   }
// }) as User[]
//
// const chests = JSON.parse(fs.readFileSync(chestsPath, 'utf-8')) as {
//   Chest: Chest[]
// }
// const chestsParsed = chests.Chest
//
// const rankings = JSON.parse(fs.readFileSync(rankingsPath, 'utf-8')) as {
//   Ranking: Ranking[]
// }
// const rankingsParsed = rankings.Ranking
//
// const jobs = JSON.parse(fs.readFileSync(jobsPath, 'utf-8')) as { Job: Job[] }
// const jobsParsed = jobs.Job
//
// const bonuses = JSON.parse(fs.readFileSync(bonusesPath, 'utf-8')) as {
//   Bonus: Bonus[]
// }
// const bonusesParsed = bonuses.Bonus
//
// const rewards = JSON.parse(fs.readFileSync(rewardsPath, 'utf-8')) as {
//   Reward: Reward[]
// }
// const rewardsParsed = rewards.Reward
//
// const nets = JSON.parse(fs.readFileSync(netsPath, 'utf-8')) as { Net: Net[] }
// const netsParsed = nets.Net
//
// const verificationtokens = JSON.parse(
//   fs.readFileSync(verificationtokensPath, 'utf-8'),
// ) as { verificationtokens: VerificationToken[] }
// const verificationtokensParsed = verificationtokens.verificationtokens
//
// const wallets = JSON.parse(fs.readFileSync(walletPath, 'utf-8')) as {
//   Wallet: Wallet[]
// }
// const walletsParsed = wallets.Wallet
//
// const withdrawals = JSON.parse(fs.readFileSync(withdrawalPath, 'utf-8')) as {
//   Withdrawal: Withdrawal[]
// }
// const withdrawalsParsed = withdrawals.Withdrawal
//
// async function main() {
//   console.log('accounts: ', accountsParsed?.length)
//   console.log('users: ', usersParsed?.length)
//   console.log('ads: ', adsParsed?.length)
//   console.log('wallets: ', walletsParsed?.length)
//   console.log('chests: ', chestsParsed?.length)
//   console.log('jobs: ', jobsParsed?.length)
//   console.log('bonuses: ', bonusesParsed?.length)
//   console.log('rewards: ', rewardsParsed?.length)
//   console.log('nets: ', netsParsed?.length)
//   console.log('rankings: ', rankingsParsed?.length)
//   console.log('verificationtokens: ', verificationtokensParsed?.length)
//   console.log('withdrawals: ', withdrawalsParsed?.length)
// }
//
// async function seedAccount() {
//   for (const account of accountsParsed.sort((a, b) => a.id - b.id)) {
//     const userFound = usersParsed.find((u) => u.id === account.userId)
//     if (!userFound) {
//       throw new Error(`User not found ${JSON.stringify(account)}`)
//     }
//     await prisma.account.upsert({
//       where: { id: account.id },
//       update: {},
//       create: {
//         ...account,
//         id: undefined,
//         user: {
//           connectOrCreate: {
//             where: { id: account.userId },
//             create: {
//               ...userFound,
//               id: undefined,
//             },
//           },
//         },
//         userId: undefined,
//       },
//     })
//     console.clear()
//     console.log(
//       'account',
//       ((account.id / accountsParsed.length) * 100).toPrecision(3) + '%',
//     )
//   }
// }
//
// async function seedAd() {
//   for (const ad of adsParsed.sort((a, b) => a.id - b.id)) {
//     await prisma.ad.upsert({
//       where: { id: ad.id },
//       update: {},
//       create: { ...ad, id: undefined },
//     })
//     console.clear()
//     console.log('ad', ((ad.id / adsParsed.length) * 100).toPrecision(3) + '%')
//   }
// }
//
// async function seedChest() {
//   for (const chest of chestsParsed.sort((a, b) => a.id - b.id)) {
//     await prisma.chest.upsert({
//       where: { id: chest.id },
//       update: {},
//       create: { ...chest, id: undefined },
//     })
//   }
// }
//
// async function seedJob() {
//   for (const job of jobsParsed.sort((a, b) => a.id - b.id)) {
//     await prisma.job.upsert({
//       where: { id: job.id },
//       update: {},
//       create: { ...job, id: undefined },
//     })
//   }
// }
//
// async function seedNet() {
//   for (const net of netsParsed.sort((a, b) => a.id - b.id)) {
//     await prisma.net.upsert({
//       where: { id: net.id },
//       update: {},
//       create: { ...net, id: undefined },
//     })
//   }
// }
//
// async function seedRanking() {
//   for (const ranking of rankingsParsed.sort((a, b) => a.id - b.id)) {
//     await prisma.ranking.upsert({
//       where: { id: ranking.id },
//       update: {},
//       create: { ...ranking, id: undefined },
//     })
//   }
// }
//
// async function seedReward() {
//   for (const referrer of rewardsParsed.sort((a, b) => a.id - b.id)) {
//     await prisma.referrer.upsert({
//       where: { id: referrer.id },
//       update: {},
//       create: { ...referrer, id: undefined },
//     })
//   }
// }
//
// async function seedBonus() {
//   for (const bonus of bonusesParsed.sort((a, b) => a.id - b.id)) {
//     await prisma.bonus.upsert({
//       where: { id: bonus.id },
//       update: {},
//       create: { ...bonus, id: undefined },
//     })
//   }
// }
//
// async function seedPopUp() {
//   for (const popup of popupsParsed.sort((a, b) => a.id - b.id)) {
//     await prisma.chest.upsert({
//       where: { id: popup.id },
//       update: {},
//       create: { ...popup, id: undefined },
//     })
//   }
// }
//
// async function seedUser() {
//   for (const user of usersParsed.sort((a, b) => a.id - b.id)) {
//     await prisma.user.upsert({
//       where: { id: user.id },
//       update: {},
//       create: { ...user, id: undefined },
//     })
//     console.clear()
//     console.log(
//       'user',
//       ((user.id / usersParsed.length) * 100).toPrecision(3) + '%',
//     )
//   }
// }
//
// async function seedVerificationToken() {
//   for (const verificationtoken of verificationtokensParsed) {
//     await prisma.verificationToken.upsert({
//       where: {
//         identifier_token: {
//           token: verificationtoken.token,
//           identifier: verificationtoken.identifier,
//         },
//       },
//       update: {},
//       create: verificationtoken,
//     })
//   }
// }
//
// async function seedWallet() {
//   for (const wallet of walletsParsed.sort((a, b) => a.id - b.id)) {
//     await prisma.wallet.upsert({
//       where: { id: wallet.id },
//       update: {},
//       create: { ...wallet, id: undefined },
//     })
//   }
// }
//
// async function seedWithdrawal() {
//   for (const withdrawal of withdrawalsParsed.sort((a, b) => a.id - b.id)) {
//     await prisma.withdrawal.upsert({
//       where: { id: withdrawal.id },
//       update: {},
//       create: { ...withdrawal, id: undefined },
//     })
//     console.clear()
//     console.log(
//       'withdrawal',
//       ((withdrawal.id / withdrawalsParsed.length) * 100).toPrecision(3) + '%',
//     )
//   }
// }
//
// async function seedClient() {
//   console.log('criando users')
//   await seedUser()
//   console.log('criando accountsParsed')
//   await seedAccount()
//   console.log('criando verificationtokens')
//   await seedVerificationToken()
//   //
//   console.log('criando wallets')
//   await seedWallet()
//   //
//   console.log('criando popups')
//   await seedPopUp()
//   console.log('criando ads')
//   await seedAd()
//
//   console.log('criando chests')
//   await seedChest()
//
//   console.log('criando jobs')
//   await seedJob()
//
//   console.log('criando bonuses')
//   await seedBonus()
//
//   console.log('criando rewards')
//   await seedReward()
//
//   console.log('criando nets')
//   await seedNet()
//
//   console.log('criando rankings')
//   await seedRanking()
//
//   console.log('criando withdrawals')
//   await seedWithdrawal()
// }
//
// async function seed() {
//   try {
//     console.log('iniciando seed')
//     await main()
//     await seedClient()
//   } catch (e) {
//     console.error(e)
//     process.exit(1)
//   } finally {
//     await prisma.$disconnect()
//   }
// }
//
// seed()
