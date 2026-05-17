export type Assignment = {
    id: string;
    title: string;
    course: string;
    createdAt: string;
    receivedAt: string;
    submissions: string;
    status: 'review' | 'completed' | 'late';
};
