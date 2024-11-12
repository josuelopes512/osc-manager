import { prisma } from "@/app/api/prisma/prisma.config";
import type { Prisma, Semester } from "@prisma/client";

async function findOne(
	args: Prisma.SemesterFindUniqueArgs,
): Promise<Semester | null> {
	return prisma.semester.findUnique(args);
}

async function find(args: Prisma.SemesterFindManyArgs): Promise<Semester[]> {
	return prisma.semester.findMany(args);
}

async function create(data: Prisma.SemesterCreateArgs): Promise<Semester> {
	return prisma.semester.create(data);
}

async function update({
	data,
	...remaining
}: Prisma.SemesterUpdateArgs): Promise<Semester> {
	return prisma.semester.update({ ...remaining, data });
}

async function updateMany(
	args: Prisma.SemesterUpdateManyArgs,
): Promise<Prisma.BatchPayload> {
	return prisma.semester.updateMany(args);
}

export const deleteOne = async (id: number) => {
	return prisma.semester.delete({ where: { id } });
};

export const semesterService = {
	findOne,
	create,
	find,
	update,
	updateMany,
	deleteOne,
};
