import http from './http';

export const getQuizzes = () => http.get('/quizzes');
