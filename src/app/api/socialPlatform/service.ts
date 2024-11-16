import { prisma } from "@/app/api/prisma/prisma.config";
import type { Prisma, SocialPlatform } from "@prisma/client";

async function findOne(
	args: Prisma.SocialPlatformFindUniqueArgs,
): Promise<SocialPlatform | null> {
	return prisma.socialPlatform.findUnique(args);
}

async function find(
	args: Prisma.SocialPlatformFindManyArgs,
): Promise<SocialPlatform[]> {
	return prisma.socialPlatform.findMany(args);
}

async function create(
	data: Prisma.SocialPlatformCreateArgs,
): Promise<SocialPlatform> {
	return prisma.socialPlatform.create(data);
}

async function update({
	data,
	...remaining
}: Prisma.SocialPlatformUpdateArgs): Promise<SocialPlatform> {
	return prisma.socialPlatform.update({ ...remaining, data });
}

async function upsert({
	...remaining
}: Prisma.SocialPlatformUpsertArgs): Promise<SocialPlatform> {
	return prisma.socialPlatform.upsert({ ...remaining });
}

async function updateMany(
	args: Prisma.SocialPlatformUpdateManyArgs,
): Promise<Prisma.BatchPayload> {
	return prisma.socialPlatform.updateMany(args);
}

export const deleteOne = async (id: number) => {
	return prisma.socialPlatform.delete({ where: { id } });
};

export const socialPlatformService = {
	findOne,
	create,
	find,
	update,
	upsert,
	updateMany,
	deleteOne,
};
