import { prisma } from "../prisma/prisma.config";

export const fetchHandlers: Record<string, () => Promise<any>> = {
    courses: async () => {
      return await prisma.course.findMany({
        select: {
          name: true,
        },
      });
    },
    students: async () => {
      return await prisma.student.findMany({
        select: {
          name: true,
          matriculation: true,
          email: true,
          whatsapp: true,
          course: {
            select: {
              name: true,
            }
          },
        },
      });
    },
    oscs: async () => {
      return await prisma.oSC.findMany({
        select: {
          name: true,
          location: true,
          oscSocials: {
            select: {
              link: true,
              socialPlatform: {
                select: {
                  name: true,
                }
              }
            }
          },
        },
      });
    },
    projects: async () => {
      return await prisma.project.findMany({
        select: {
          name: true,
          description: true,
          link: true,
          osc: {
            select: {
              name: true,
              location: true,
              oscSocials: {
                select: {
                  link: true,
                  socialPlatform: {
                    select: {
                      name: true,
                    }
                  }
                }
              },
            }
          },
          semester: {
            select: {
              name: true,
            }
          },
          students: {
            select: {
              name: true,
              matriculation: true,
              email: true,
              whatsapp: true,
              course: {
                select: {
                  name: true,
                }
              },
            }
          }
        },
      });
    },
    surveys: async () => {
      return await prisma.survey.findMany({
        select: {
          name: true,
          description: true,
          questions: {
            select: {
              name: true,
              order: true,
              required: true,
              type: true,
              multipleChoice: {
                select: {
                  choice: true,
                  other: true,
                  order: true,
                }
              },
              checkBox: {
                select: {
                  option: true,
                  other: true,
                  order: true,
                }
              }
            }
          }
        },
      });
    },
};

export const upsertHandlers: Record<string, (item: any) => Promise<void>> = {
    students: async (student) => {
        try {
            console.log(`Processando estudante: ${JSON.stringify(student, null, 2)}`);

            // Verifica se o curso foi fornecido
            if (!student.course || !student.course.name || typeof student.course.name !== 'string') {
                throw new Error(
                    `O curso é obrigatório para o estudante "${student.name}". Dados recebidos: ${JSON.stringify(student)}`
                );
            }

            const courseName = student.course.name.trim();

            const course = await (async () => {
                console.log(`Buscando ou criando curso com o nome: "${courseName}"`);
                let existingCourse = await prisma.course.findFirst({
                    where: { name: courseName },
                });

                if (!existingCourse) {
                    console.log(`Curso não encontrado. Criando curso: "${courseName}"`);
                    existingCourse = await prisma.course.create({
                        data: { name: courseName },
                    });
                } else {
                    console.log(`Curso encontrado: ${existingCourse.name}`);
                }

                return existingCourse;
            })();

            const existingStudent = await prisma.student.findFirst({
                where: { name: student.name.trim() },
            });

            if (existingStudent) {
                console.log(`Atualizando estudante existente: ${existingStudent.name}`);
                await prisma.student.update({
                    where: { id: existingStudent.id },
                    data: {
                        matriculation: student.matriculation || null,
                        email: student.email || null,
                        whatsapp: student.whatsapp || null,
                        course: { connect: { id: course.id } },
                    },
                });
            } else {
                console.log(`Criando novo estudante: ${student.name}`);
                await prisma.student.create({
                    data: {
                        name: student.name.trim(),
                        matriculation: student.matriculation || null,
                        email: student.email || null,
                        whatsapp: student.whatsapp || null,
                        course: { connect: { id: course.id } },
                    },
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(
                    `Erro no processamento do estudante: ${error.message}`
                );
                throw new Error(
                    `Erro ao processar o estudante "${student.name}": ${error.message}`
                );
            } else {
                console.error("Erro desconhecido ao processar o estudante.", error);
                throw new Error(`Erro desconhecido ao processar o estudante "${student.name}".`);
            }
        }
    },
    courses: async (course) => {
        let existingCourse = await prisma.course.findFirst({
            where: { name: course.name },
        });

        if (existingCourse) {
            await prisma.course.update({
                where: { id: existingCourse.id },
                data: course,
            });
        } else {
            await prisma.course.create({
                data: course,
            });
        }
    },
    oscs: async (osc) => {
        let existingOsc = await prisma.oSC.findFirst({
            where: { name: osc.name },
        });

        if (existingOsc) {
            await prisma.oSC.update({
                where: { id: existingOsc.id },
                data: { location: osc.location },
            });
        } else {
            await prisma.oSC.create({
                data: {
                    name: osc.name,
                    location: osc.location,
                },
            });
        }
    },
    projects: async (project) => {
        try {
            console.log(`Processando projeto: ${JSON.stringify(project, null, 2)}`);

            // Processa o OSC
            const osc = await (async () => {
                const existingOsc = await prisma.oSC.findFirst({
                    where: { name: project.osc.name },
                });

                if (existingOsc) {
                    console.log(`OSC encontrado: ${existingOsc.name}`);
                    return existingOsc;
                }

                console.log(`Criando OSC: ${project.osc.name}`);
                return await prisma.oSC.create({
                    data: {
                        name: project.osc.name,
                        location: project.osc.location || "",
                        oscSocials: {
                            create: project.osc.oscSocials.map((social: any) => ({
                                ...social,
                            })),
                        },
                    },
                });
            })();

            // Processa o Semestre (opcional)
            const semester = project.semester?.name
                ? await (async () => {
                    const existingSemester = await prisma.semester.findFirst({
                        where: { name: project.semester.name },
                    });

                    if (existingSemester) {
                        console.log(`Semestre encontrado: ${existingSemester.name}`);
                        return existingSemester;
                    }

                    console.log(`Criando semestre: ${project.semester.name}`);
                    return await prisma.semester.create({
                        data: { name: project.semester.name },
                    });
                })()
                : null;

            // Processa o Projeto
            const existingProject = await prisma.project.findFirst({
                where: { name: project.name },
            });

            if (existingProject) {
                console.log(`Atualizando projeto existente: ${existingProject.name}`);
                await prisma.project.update({
                    where: { id: existingProject.id },
                    data: {
                        description: project.description || null,
                        link: project.link || null,
                        osc: { connect: { id: osc.id } },
                        semester: semester ? { connect: { id: semester.id } } : undefined,
                    },
                });
            } else {
                console.log(`Criando novo projeto: ${project.name}`);				
                const projectData: any = {
                    name: project.name,
                    description: project.description || null,
                    link: project.link || null,
                    osc: { connect: { id: osc.id } }
                };

                if (project.semester?.id) {
                    projectData.semester = { connect: { id: project.semester.id } };
                }

                await prisma.project.create({
                    data: projectData,
                });
            }

            for (const student of project.students){
                if (!student.course || !student.course.name) {
                    throw new Error(
                        `O curso é obrigatório para o estudante "${student.name}".`
                    );
                }

                const course = await (async () => {
                    const existingCourse = await prisma.course.findFirst({
                        where: { name: student.course.name },
                    });

                    if (existingCourse) {
                        console.log(`Curso encontrado: ${existingCourse.name}`);
                        return existingCourse;
                    }

                    console.log(`Criando curso: ${student.course.name}`);
                    return await prisma.course.create({
                        data: { name: student.course.name },
                    });
                })();

                const existingStudent = await prisma.student.findFirst({
                    where: { name: student.name },
                });

                if (existingStudent) {
                    console.log(`Atualizando estudante: ${existingStudent.name}`);
                    await prisma.student.update({
                        where: { id: existingStudent.id },
                        data: {
                            name: student.name,
                            matriculation: student.matriculation || null,
                            email: student.email || null,
                            whatsapp: student.whatsapp || null,
                            course: { connect: { id: course.id } },
                        },
                    });
                } else {
                    console.log(`Criando estudante: ${student.name}`);
                    await prisma.student.create({
                        data: {
                            name: student.name,
                            matriculation: student.matriculation || null,
                            email: student.email || null,
                            whatsapp: student.whatsapp || null,
                            course: { connect: { id: course.id } },
                        },
                    });
                }
            }

            console.log(`Processamento do projeto "${project.name}" concluído.`);
        } catch (error) {
            if (error instanceof Error) {
                console.error(
                    `Erro no processamento do projeto: ${error.message}`
                );
                throw new Error(
                    `Erro ao processar o projeto "${project.name}": ${error.message}`
                );
            } else {
                console.error("Erro desconhecido ao processar o projeto.", error);
                throw new Error(`Erro desconhecido ao processar o projeto "${project.name}".`);
            }
        }
    },
    surveys: async (survey) => {
        let existingSurvey = await prisma.survey.findFirst({
            where: { name: survey.name },
        });

        if (existingSurvey) {
            await prisma.survey.update({
                where: { id: existingSurvey.id },
                data: { description: survey.description },
            });
        } else {
            existingSurvey = await prisma.survey.create({
                data: { name: survey.name, description: survey.description },
            });
        }

        await Promise.all(
            survey.questions.map(async (question: any) => {
                let existingQuestion = await prisma.question.findFirst({
                    where: { name: question.name },
                });

                if (existingQuestion) {
                    await prisma.question.update({
                        where: { id: existingQuestion.id },
                        data: { 
                            ...question,
                            order: question.order,
								type: question.type,
								multipleChoice: {
									create: question.multipleChoice
									? question.multipleChoice
									        ?.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
											.map((choice: any) => ({
												choice: choice?.choice ?? "",
												other: choice?.other ?? "",
												order: choice?.order ?? 0,
											}))
										: [],
								},
								checkBox: {
									create: question.checkBox
										?.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
										.map((option: any) => ({
											option: option?.option ?? "",
											other: option?.other ?? "",
											order: option?.order ?? 0,
										})),
								},
                         },
                    });
                } else {
                    await prisma.question.create({
                        data: { 
                            ...question, 
                            surveyId: existingSurvey.id, 
                            order: question.order,
                            type: question.type,
                            multipleChoice: {
                                create: question.multipleChoice
                                ? question.multipleChoice
                                        ?.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
                                        .map((choice: any) => ({
                                            choice: choice?.choice ?? "",
                                            other: choice?.other ?? "",
                                            order: choice?.order ?? 0,
                                        }))
                                    : [],
                            },
                            checkBox: {
                                create: question.checkBox
                                    ?.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
                                    .map((option: any) => ({
                                        option: option?.option ?? "",
                                        other: option?.other ?? "",
                                        order: option?.order ?? 0,
                                    })),
                            },
                        },
                    });
                }
            })
        );
    },
};
