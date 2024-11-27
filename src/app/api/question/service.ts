import { prisma } from "@/app/api/prisma/prisma.config";
import type { Prisma, Question } from "@prisma/client";

async function findOne(
	args: Prisma.QuestionFindUniqueArgs,
): Promise<Question | null> {
	return prisma.question.findUnique(args);
}

async function find(args: Prisma.QuestionFindManyArgs): Promise<Question[]> {
	return prisma.question.findMany(args);
}

async function create(data: Prisma.QuestionCreateArgs): Promise<Question> {
	return prisma.question.create(data);
}

async function update({
	data,
	...remaining
}: Prisma.QuestionUpdateArgs): Promise<Question> {
	return prisma.question.update({ ...remaining, data });
}

async function updateMany(
	args: Prisma.QuestionUpdateManyArgs,
): Promise<Prisma.BatchPayload> {
	return prisma.question.updateMany(args);
}

export const deleteOne = async (id: number) => {
	return prisma.question.delete({ where: { id } });
};

export const questionService = {
	findOne,
	create,
	find,
	update,
	updateMany,
	deleteOne,
};
