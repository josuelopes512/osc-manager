import { prisma } from "@/app/api/prisma/prisma.config";
import type { OSC, Prisma } from "@prisma/client";

async function findOne(args: Prisma.OSCFindUniqueArgs): Promise<OSC | null> {
	return prisma.oSC.findUnique(args);
}

async function find(args: Prisma.OSCFindManyArgs): Promise<OSC[]> {
	return prisma.oSC.findMany(args);
}

async function create(data: Prisma.OSCCreateArgs): Promise<OSC> {
	return prisma.oSC.create(data);
}

async function update({
	data,
	...remaining
}: Prisma.OSCUpdateArgs): Promise<OSC> {
	return prisma.oSC.update({ ...remaining, data });
}

async function updateMany(
	args: Prisma.OSCUpdateManyArgs,
): Promise<Prisma.BatchPayload> {
	return prisma.oSC.updateMany(args);
}

export const deleteOne = async (id: number) => {
	return prisma.oSC.delete({ where: { id } });
};

export const oscService = {
	findOne,
	create,
	find,
	update,
	updateMany,
	deleteOne,
};
