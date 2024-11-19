export interface ILesson {
    lessonTitle: string;
    isRecruitment: boolean;
}

export interface ICourse {
    courseTitle: string;
    titleColor: string;
    lessons: ILesson[];
}

export const CoursesInfo:ICourse[] = [
    {
        courseTitle: 'Курс 1',
        titleColor: 'green',
        lessons: [
            { lessonTitle: 'Заняття 1', isRecruitment: true },
            { lessonTitle: 'Заняття 2', isRecruitment: false },
            { lessonTitle: 'Фандрейзинг для громадських та релігійних організацій', isRecruitment: true },
            { lessonTitle: 'Заняття 4', isRecruitment: true },
        ]
    },
    {
        courseTitle: 'Курс 2',
        titleColor: 'blue',
        lessons: [
            { lessonTitle: 'Заняття 1', isRecruitment: true },
            { lessonTitle: 'Заняття 2', isRecruitment: true },
        ]
    },
    {
        courseTitle: 'Курс 3',
        titleColor: 'violet',
        lessons: [
            { lessonTitle: 'Заняття 1', isRecruitment: true },
            { lessonTitle: 'Заняття 2', isRecruitment: false }
        ]
    },
    {
        courseTitle: 'Курс 4',
        titleColor: 'yellow',
        lessons: [
            { lessonTitle: 'Заняття 1', isRecruitment: true },
            { lessonTitle: 'Заняття 2', isRecruitment: false },
            { lessonTitle: 'Заняття 3', isRecruitment: true },
            { lessonTitle: 'Заняття 4', isRecruitment: true },
        ]
    },
    {
        courseTitle: 'Курс 5',
        titleColor: 'pink',
        lessons: [
            { lessonTitle: 'Заняття 1', isRecruitment: false },
            { lessonTitle: 'Заняття 2', isRecruitment: false },
        ]
    },
    {
        courseTitle: 'Курс 6',
        titleColor: 'turquoise',
        lessons: [
            { lessonTitle: 'Заняття 1', isRecruitment: false },
            { lessonTitle: 'Заняття 2', isRecruitment: false },
            { lessonTitle: 'Заняття 3', isRecruitment: false },
        ]
    }
];