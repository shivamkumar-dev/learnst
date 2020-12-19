import http from './http';

// Getting All Quizzes
export const getQuizzes = () => http.get('/quizzes');

// Getting A Single Quiz
export const getQuiz = (quizId) => http.get(`/quizzes/${quizId}`);

// Save Quiz
export const saveQuiz = (quiz, quizId) => {
  // Update existing Quiz
  if (quiz._id) {
    const body = { ...quiz };
    delete body._id;
    return http.put(`/quizzes/${quizId}`, body);
  }

  // Add new Quiz
  return http.post('/quizzes', quiz);
};

// Delete Quiz
export const deleteQuiz = (quizId) => {
  return http.delete(`/quizzes/${quizId}`);
};
