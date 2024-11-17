import { prisma } from "@/app/api/prisma/prisma.config";
import type { Prisma, User } from "@prisma/client";

async function findOne(args: Prisma.UserFindUniqueArgs): Promise<User | null> {
	return prisma.user.findUnique(args);
}

async function find(args: Prisma.UserFindManyArgs): Promise<User[]> {
	return prisma.user.findMany(args);
}

async function create(data: Prisma.UserCreateArgs): Promise<User> {
	return prisma.user.create(data);
}

async function update({
	data,
	...remaining
}: Prisma.UserUpdateArgs): Promise<User> {
	return prisma.user.update({ ...remaining, data });
}

async function upsert({ ...remaining }: Prisma.UserUpsertArgs): Promise<User> {
	return prisma.user.upsert({ ...remaining });
}

async function updateMany(
	args: Prisma.UserUpdateManyArgs,
): Promise<Prisma.BatchPayload> {
	return prisma.user.updateMany(args);
}

export const deleteOne = async (id: string) => {
	return prisma.user.delete({ where: { id } });
};

export const userService = {
	findOne,
	create,
	find,
	update,
	upsert,
	updateMany,
	deleteOne,
};
