import http from './http';

// Getting All Quizzes
export const getQuizzes = () => http.get('/quizzes');

// Getting A Single Quiz
export const getQuiz = (quizId) => http.get(`/quizzes/${quizId}`);
