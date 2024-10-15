import { prisma } from "@/app/api/prisma/prisma.config";
import type { Prisma, Student } from "@prisma/client";

async function findOne(
	args: Prisma.StudentFindUniqueArgs,
): Promise<Student | null> {
	return prisma.student.findUnique(args);
}

async function find(args: Prisma.StudentFindManyArgs): Promise<Student[]> {
	return prisma.student.findMany(args);
}

async function create(data: Prisma.StudentCreateArgs): Promise<Student> {
	return prisma.student.create(data);
}

async function update({
	data,
	...remaining
}: Prisma.StudentUpdateArgs): Promise<Student> {
	return prisma.student.update({ ...remaining, data });
}

async function updateMany(
	args: Prisma.StudentUpdateManyArgs,
): Promise<Prisma.BatchPayload> {
	return prisma.student.updateMany(args);
}

export const deleteOne = async (id: number) => {
	return prisma.student.delete({ where: { id } });
};

export const studentService = {
	findOne,
	create,
	find,
	update,
	updateMany,
	deleteOne,
};
