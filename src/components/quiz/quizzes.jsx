import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuizCard from './quizCard';
import Dropdown from '../common/dropdown';
import { getQuizzes, deleteQuiz } from '../../services/quizService';
import { getCategories } from '../../services/categoryService';
import { getLevels } from '../../services/levelService';
import { getCurrentUser } from '../../services/authService';
import filter from '../../utils/filter';

const Quizzes = () => {
  //  States
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [selectedLevel, setSelectedLevel] = useState('Level');

  const user = getCurrentUser();

  // Getting Datas from API
  useEffect(() => {
    let mounted = true;
    (async () => {
      const quizzes = await getQuizzes();
      const categories = await getCategories();
      const levels = await getLevels();
      if (mounted) {
        setQuizzes(quizzes.data);
        setCategories(categories.data);
        setLevels(levels.data);
      }
    })();
    return () => (mounted = false);
  }, []);

  // Handlers
  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleLevelSelect = (event) => {
    setSelectedLevel(event.target.value);
  };

  // Delete Quiz
  const handleDelete = async (quizId) => {
    const originalQuizzes = [...quizzes];
    const newQuizzes = originalQuizzes.filter((q) => q._id !== quizId);
    setQuizzes(newQuizzes);

    try {
      await deleteQuiz(quizId);
    } catch (ex) {
      if (ex) window.alert('Something Went Wrong');
      setQuizzes(originalQuizzes);
    }
  };

  // Filtering quizzes
  const filteredQuizzes = filter(selectedLevel, selectedCategory, quizzes);

  return (
    <>
      {/* Category and Level Dropdowns */}
      <div className='row m-4'>
        <Dropdown
          title='Category'
          items={categories}
          onItemSelect={handleCategorySelect}
        />

        <Dropdown
          title='Level'
          items={levels}
          onItemSelect={handleLevelSelect}
        />

        {user && (
          <div className='col-3'>
            <Link to='/quizzes/new' className='btn btn-primary'>
              Add New Quiz
            </Link>
          </div>
        )}
      </div>

      {/* Display All Quizzes On Quizzes Section */}
      <div className='row row-cols-1 row-cols-md-4 g-4'>
        {filteredQuizzes.map((quiz) => (
          <QuizCard
            key={quiz._id}
            onDelete={handleDelete}
            item={quiz}
            user={user}
          />
        ))}
      </div>
    </>
  );
};

export default Quizzes;
