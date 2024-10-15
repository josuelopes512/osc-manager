import { prisma } from "@/app/api/prisma/prisma.config";
import type { Account, Prisma } from "@prisma/client";

async function findOne(
	args: Prisma.AccountFindUniqueArgs,
): Promise<Account | null> {
	return prisma.account.findUnique(args);
}

async function find(args: Prisma.AccountFindManyArgs): Promise<Account[]> {
	return prisma.account.findMany(args);
}

async function create(data: Prisma.AccountCreateArgs): Promise<Account> {
	return prisma.account.create(data);
}

async function update({
	data,
	...remaining
}: Prisma.AccountUpdateArgs): Promise<Account> {
	return prisma.account.update({ ...remaining, data });
}

export const deleteOne = async (id: number) => {
	return prisma.account.delete({ where: { id } });
};

export const accountService = {
	findOne,
	create,
	find,
	update,
	deleteOne,
};
