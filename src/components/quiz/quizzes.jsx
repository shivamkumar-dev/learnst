import React, { useState, useEffect } from 'react';
import QuizCard from './quizCard';
import Dropdown from '../common/dropdown';
import Button from '../common/button';
import { getQuizzes } from '../../services/quizService';
import { getCategories } from '../../services/categoryService';
import { getLevels } from '../../services/levelService';
import filter from '../../utils/filter';

const Quizzes = () => {
  //  States
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [selectedLevel, setSelectedLevel] = useState('Level');

  // Getting Datas from API
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await getQuizzes();
      if (mounted) {
        setQuizzes(data);
      }
    })();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await getCategories();
      if (mounted) {
        setCategories(data);
      }
    })();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await getLevels();
      if (mounted) {
        setLevels(data);
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

  // Filtering quizzes
  const filteredQuizzes = filter(selectedLevel, selectedCategory, quizzes);

  return (
    <>
      {/* Dropdowns */}
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

        <div className='col-3'>
          <Button className='btn btn-primary' label='Add New Quiz' />
        </div>
      </div>

      {/* Quiz Cards */}
      <div className='row row-cols-1 row-cols-md-4 g-4'>
        {filteredQuizzes.map((quiz) => (
          <QuizCard key={quiz._id} item={quiz} />
        ))}
      </div>
    </>
  );
};

export default Quizzes;
