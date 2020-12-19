import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../common/input';
import Select from '../common/select';
import AnswerSelect from '../common/answerSelect';
import { getCategories } from '../../services/categoryService';
import { getLevels } from '../../services/levelService';
import { saveQuiz } from '../../services/quizService';

const NewQuiz = () => {
  // States
  const [quizStore, setQuizStore] = useState({
    title: '',
    categoryId: '',
    levelId: '',
    quiz: [],
  });
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [questionStore, setQuestionStore] = useState([
    { question: '', options: ['', ''], answer: '' },
  ]);

  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const categories = await getCategories();
      const levels = await getLevels();
      if (mounted) {
        setCategories(categories.data);
        setLevels(levels.data);
      }
    })();
    return () => (mounted = false);
  }, []);

  // Handle QuizStore Change
  const handleQuizStoreChange = ({ target: input }) => {
    let newQuizStore = { ...quizStore };
    newQuizStore[input.name] = input.value;
    setQuizStore(newQuizStore);
  };

  // Handle QuestionStore Change
  const handleQuestionStoreChange = (e, i) => {
    let newQuestionStore = [...questionStore];
    let question = { ...newQuestionStore[i] };
    question[e.target.name] = e.target.value;
    newQuestionStore[i] = question;
    setQuestionStore(newQuestionStore);
  };

  // Add Question
  const addQuestion = () => {
    const newQuestionStore = [
      ...questionStore,
      { question: '', options: ['', ''], answer: '' },
    ];
    setQuestionStore(newQuestionStore);
  };
  //Remove Question
  const removeQuestion = (i) => {
    const newQuestionStore = [...questionStore];
    newQuestionStore.splice(i, 1);
    setQuestionStore(newQuestionStore);
  };

  // Handle Option Change in QuestionStore
  const handleOptionChange = (e, l, i) => {
    let newQuestionStore = [...questionStore];
    let question = { ...newQuestionStore[i] };
    let newOptions = [...question.options];
    newOptions[l] = e.target.value;
    question.options = newOptions;
    newQuestionStore[i] = question;
    setQuestionStore(newQuestionStore);
  };

  // Add Option
  const addOption = (i) => {
    let newQuestionStore = [...questionStore];
    let question = { ...newQuestionStore[i] };
    let newOptions = [...question.options, ''];
    question.options = newOptions;
    newQuestionStore[i] = question;
    setQuestionStore(newQuestionStore);
  };

  // Remove Option
  const removeOption = (l, i) => {
    let newQuestionStore = [...questionStore];
    let question = { ...newQuestionStore[i] };
    let newOptions = [...question.options];
    newOptions.splice(l, 1);
    question.options = newOptions;
    newQuestionStore[i] = question;
    setQuestionStore(newQuestionStore);
  };

  //Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestionStore = [...questionStore];
    let newQuizStore = { ...quizStore };
    newQuizStore.quiz = newQuestionStore;

    // Save Updated or New Resource
    await saveQuiz(newQuizStore);
    history.push('/quizzes');
  };

  // Form
  return (
    <>
      <div>
        <h1>New Quiz Form</h1>
        <Input
          name='title'
          label='Title'
          value={quizStore.title}
          onChange={handleQuizStoreChange}
        />
        <Select
          name='categoryId'
          label='Category'
          onChange={handleQuizStoreChange}
          items={categories}
        />
        <Select
          name='levelId'
          label='Level'
          onChange={handleQuizStoreChange}
          items={levels}
        />
        {questionStore.map((q, i) => {
          return (
            <div key={i}>
              <Input
                name={`question`}
                label={`Question${i + 1}`}
                value={q.question}
                onChange={(e) => handleQuestionStoreChange(e, i)}
              />
              {q.options.map((o, l) => {
                return (
                  <div key={l}>
                    <Input
                      name={`option${l + 1}`}
                      label={`Option${l + 1}`}
                      value={o}
                      onChange={(e) => handleOptionChange(e, l, i)}
                    />
                    {/* Remove Option */}
                    {q.options.length > 2 && (
                      <button onClick={() => removeOption(l, i)}>
                        Remove Option
                      </button>
                    )}
                  </div>
                );
              })}
              {/* Add Option */}
              <button onClick={() => addOption(i)}>Add Option</button>

              <AnswerSelect
                label='Select Right Answer'
                name='answer'
                items={q.options}
                onChange={(e) => handleQuestionStoreChange(e, i)}
              />
              {/* Remove Question */}
              {questionStore.length > 1 && (
                <button onClick={() => removeQuestion(i)}>
                  Remove Question
                </button>
              )}
            </div>
          );
        })}
        {/* Add Question */}
        <button onClick={addQuestion}>Add Question</button>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default NewQuiz;
