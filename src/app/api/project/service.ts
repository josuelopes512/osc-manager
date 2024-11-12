import { prisma } from "@/app/api/prisma/prisma.config";
import type { Prisma, Project } from "@prisma/client";

async function findOne(
	args: Prisma.ProjectFindUniqueArgs,
): Promise<Project | null> {
	return prisma.project.findUnique(args);
}

async function find(args: Prisma.ProjectFindManyArgs): Promise<Project[]> {
	return prisma.project.findMany(args);
}

async function create(data: Prisma.ProjectCreateArgs): Promise<Project> {
	return prisma.project.create(data);
}

async function update({
	data,
	...remaining
}: Prisma.ProjectUpdateArgs): Promise<Project> {
	return prisma.project.update({ ...remaining, data });
}

async function updateMany(
	args: Prisma.ProjectUpdateManyArgs,
): Promise<Prisma.BatchPayload> {
	return prisma.project.updateMany(args);
}

export const deleteOne = async (id: number) => {
	return prisma.project.delete({ where: { id } });
};

export const projectService = {
	findOne,
	create,
	find,
	update,
	updateMany,
	deleteOne,
};
