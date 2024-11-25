import { prisma } from "@/app/api/prisma/prisma.config";
import type { Prisma, SurveyAnswer } from "@prisma/client";

async function findOne(
	args: Prisma.SurveyAnswerFindUniqueArgs,
): Promise<SurveyAnswer | null> {
	return prisma.surveyAnswer.findUnique(args);
}

async function find(
	args: Prisma.SurveyAnswerFindManyArgs,
): Promise<SurveyAnswer[]> {
	return prisma.surveyAnswer.findMany(args);
}

async function create(
	data: Prisma.SurveyAnswerCreateArgs,
): Promise<SurveyAnswer> {
	return prisma.surveyAnswer.create(data);
}

async function update({
	data,
	...remaining
}: Prisma.SurveyAnswerUpdateArgs): Promise<SurveyAnswer> {
	return prisma.surveyAnswer.update({ ...remaining, data });
}

async function updateMany(
	args: Prisma.SurveyAnswerUpdateManyArgs,
): Promise<Prisma.BatchPayload> {
	return prisma.surveyAnswer.updateMany(args);
}

export const deleteOne = async (id: number) => {
	return prisma.surveyAnswer.delete({ where: { id } });
};

export const surveyAnswerService = {
	findOne,
	create,
	find,
	update,
	updateMany,
	deleteOne,
};
