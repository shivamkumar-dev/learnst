import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Joi from 'joi';
import Input from '../common/input';
import Select from '../common/select';
import { getCategories } from '../../services/categoryService';
import { getLevels } from '../../services/levelService';
import { saveQuiz } from '../../services/quizService';
import { validate } from '../../utils/formValidation';

const NewQuiz = () => {
  // States
  const [quizStore, setQuizStore] = useState({
    title: '',
    categoryId: '',
    levelId: '',
    quiz: [],
  });
  const [questionStore, setQuestionStore] = useState([
    { question: '', options: ['', ''], answer: '' },
  ]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);

  const history = useHistory();

  // quizStore Schema
  const quizStoreSchema = Joi.object({
    //_id: Joi.string(),
    title: Joi.string().required().label('Title'),
    categoryId: Joi.string().required().label('Category'),
    levelId: Joi.string().required().label('Level'),
    quiz: Joi.array().label('Quiz'),
  });

  // QuestionStore Schema
  const questionStoreSchema = Joi.array().items(
    Joi.object({
      question: Joi.string().required().label('Question'),
      options: Joi.array()
        .items(Joi.string().label('Option'))
        .min(2)
        .required(),
      answer: Joi.string().required().label('Answer'),
    })
  );

  // Getting Datas from API
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
  const addOption = (e, i) => {
    e.preventDefault();

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
    if (l === parseInt(question.answer)) {
      question.answer = '';
      newOptions.splice(l, 1);
      question.options = newOptions;
      newQuestionStore[i] = question;
      setQuestionStore(newQuestionStore);
    }
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

    // Validate whole Form on Submition
    const quizStoreErrors = validate(quizStore, quizStoreSchema);
    const questionStoreErrors = validate(questionStore, questionStoreSchema);
    if (questionStoreErrors || quizStoreErrors)
      return window.alert(
        'Please fill all the details and select "Right answer" for each Question.'
      );

    // Save New Quiz
    await saveQuiz(newQuizStore);
    history.push('/quizzes');
  };

  // Form
  return (
    <div className='row row-cols-md-2'>
      <div className='mx-auto'>
        <div>
          <h1 className='my-2'>New Quiz Form</h1>
          <Input
            name='title'
            label='Title'
            value={quizStore.title}
            onChange={handleQuizStoreChange}
          />
          <div className='row'>
            <div className='col'>
              <Select
                name='categoryId'
                label='Category'
                onChange={handleQuizStoreChange}
                items={categories}
              />
            </div>
            <div className='col'>
              <Select
                name='levelId'
                label='Level'
                onChange={handleQuizStoreChange}
                items={levels}
              />
            </div>
          </div>

          {questionStore.map((q, i) => {
            return (
              <div key={i}>
                <br />
                <Input
                  name={`question`}
                  label={`Question ${i + 1}.)`}
                  value={q.question}
                  onChange={(e) => handleQuestionStoreChange(e, i)}
                />

                <form className='row'>
                  {q.options.map((o, l) => {
                    return (
                      <div key={l} className='col-md-6 my-2'>
                        <input
                          type='radio'
                          name='answer'
                          value={l}
                          onChange={(e) => handleQuestionStoreChange(e, i)}
                        />
                        <input
                          className='mx-2'
                          type='text'
                          name={`option${l + 1}`}
                          value={o}
                          onChange={(e) => handleOptionChange(e, l, i)}
                        />

                        {/* Remove Option */}
                        {q.options.length > 2 && (
                          <button
                            className='btn btn-warning'
                            onClick={() => removeOption(l, i)}
                          >
                            x
                          </button>
                        )}
                      </div>
                    );
                  })}

                  {/* Add Option */}
                  <div className='col my-2'>
                    <button
                      className='btn btn-info'
                      onClick={(e) => addOption(e, i)}
                    >
                      +
                    </button>
                  </div>
                </form>
                {/* Remove Question */}
                {questionStore.length > 1 && (
                  <div align='right'>
                    <button
                      className='btn btn-danger'
                      onClick={() => removeQuestion(i)}
                    >
                      x
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          {/* Add Question */}
          <button className='btn btn-success my-2' onClick={addQuestion}>
            +
          </button>
        </div>
        <div className='mb-4' align='center'>
          <button className='btn btn-primary' onClick={handleSubmit}>
            Save Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewQuiz;
