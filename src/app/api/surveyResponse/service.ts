import { prisma } from "@/app/api/prisma/prisma.config";
import type { Prisma, SurveyResponse } from "@prisma/client";

async function findOne(
	args: Prisma.SurveyResponseFindUniqueArgs,
): Promise<SurveyResponse | null> {
	return prisma.surveyResponse.findUnique(args);
}

async function find(
	args: Prisma.SurveyResponseFindManyArgs,
): Promise<SurveyResponse[]> {
	return prisma.surveyResponse.findMany(args);
}

async function create(
	data: Prisma.SurveyResponseCreateArgs,
): Promise<SurveyResponse> {
	return prisma.surveyResponse.create(data);
}

async function update({
	data,
	...remaining
}: Prisma.SurveyResponseUpdateArgs): Promise<SurveyResponse> {
	return prisma.surveyResponse.update({ ...remaining, data });
}

async function updateMany(
	args: Prisma.SurveyResponseUpdateManyArgs,
): Promise<Prisma.BatchPayload> {
	return prisma.surveyResponse.updateMany(args);
}

export const deleteOne = async (id: number) => {
	return prisma.surveyResponse.delete({ where: { id } });
};

export const surveyResponseService = {
	findOne,
	create,
	find,
	update,
	updateMany,
	deleteOne,
};
