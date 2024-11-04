import { prisma } from "@/app/api/prisma/prisma.config";
import type { Prisma, UserApproval } from "@prisma/client";

async function findOne(
	args: Prisma.UserApprovalFindUniqueArgs,
): Promise<UserApproval | null> {
	return prisma.userApproval.findUnique(args);
}

async function find(
	args: Prisma.UserApprovalFindManyArgs,
): Promise<UserApproval[]> {
	return prisma.userApproval.findMany(args);
}

async function create(
	data: Prisma.UserApprovalCreateArgs,
): Promise<UserApproval> {
	return prisma.userApproval.create(data);
}

async function update({
	data,
	...remaining
}: Prisma.UserApprovalUpdateArgs): Promise<UserApproval> {
	return prisma.userApproval.update({ ...remaining, data });
}

async function updateMany(
	args: Prisma.UserApprovalUpdateManyArgs,
): Promise<Prisma.BatchPayload> {
	return prisma.userApproval.updateMany(args);
}

async function upsert({
	where,
	create,
	update,
}: Prisma.UserApprovalUpsertArgs): Promise<UserApproval> {
	return prisma.userApproval.upsert({ where, create, update });
}

export const deleteOne = async (id: number) => {
	return prisma.userApproval.delete({ where: { id } });
};

export const userApprovalService = {
	findOne,
	create,
	find,
	update,
	updateMany,
	upsert,
	deleteOne,
};
