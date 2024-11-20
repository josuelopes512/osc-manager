import { prisma } from "@/app/api/prisma/prisma.config";
import type { Prisma, Survey } from "@prisma/client";

async function findOne(
	args: Prisma.SurveyFindUniqueArgs,
): Promise<Survey | null> {
	return prisma.survey.findUnique(args);
}

async function find(args: Prisma.SurveyFindManyArgs): Promise<Survey[]> {
	return prisma.survey.findMany(args);
}

async function create(data: Prisma.SurveyCreateArgs): Promise<Survey> {
	return prisma.survey.create(data);
}

async function update({
	data,
	...remaining
}: Prisma.SurveyUpdateArgs): Promise<Survey> {
	return prisma.survey.update({ ...remaining, data });
}

async function updateMany(
	args: Prisma.SurveyUpdateManyArgs,
): Promise<Prisma.BatchPayload> {
	return prisma.survey.updateMany(args);
}

export const deleteOne = async (id: number) => {
	return prisma.survey.delete({ where: { id } });
};

export const surveyService = {
	findOne,
	create,
	find,
	update,
	updateMany,
	deleteOne,
};
