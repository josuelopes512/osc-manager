import { prisma } from "@/app/api/prisma/prisma.config";
import type { Course, Prisma } from "@prisma/client";

async function findOne(
	args: Prisma.CourseFindUniqueArgs,
): Promise<Course | null> {
	return prisma.course.findUnique(args);
}

async function find(args: Prisma.CourseFindManyArgs): Promise<Course[]> {
	return prisma.course.findMany(args);
}

async function create(data: Prisma.CourseCreateArgs): Promise<Course> {
	return prisma.course.create(data);
}

async function update({
	data,
	...remaining
}: Prisma.CourseUpdateArgs): Promise<Course> {
	return prisma.course.update({ ...remaining, data });
}

async function updateMany(
	args: Prisma.CourseUpdateManyArgs,
): Promise<Prisma.BatchPayload> {
	return prisma.course.updateMany(args);
}

export const deleteOne = async (id: number) => {
	return prisma.course.delete({ where: { id } });
};

export const courseService = {
	findOne,
	create,
	find,
	update,
	updateMany,
	deleteOne,
};
