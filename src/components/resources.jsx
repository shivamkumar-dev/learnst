import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './card';
import Dropdown from './dropdown';

const Resource = () => {
  //  States
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [selectedLevel, setSelectedLevel] = useState('Level');

  // Getting Datas from API
  useEffect(() => {
    async function getResources() {
      const result = await axios(
        'https://learnst-b.herokuapp.com/api/resources'
      );
      setResources(result.data);
    }
    getResources();
  }, []);

  useEffect(() => {
    async function getCategories() {
      const result = await axios(
        'https://learnst-b.herokuapp.com/api/categories'
      );
      setCategories(result.data);
    }
    getCategories();
  }, []);

  useEffect(() => {
    async function getLevels() {
      const result = await axios('https://learnst-b.herokuapp.com/api/levels');
      setLevels(result.data);
    }
    getLevels();
  }, []);

  // Handlers
  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleLevelSelect = (event) => {
    setSelectedLevel(event.target.value);
  };

  // Filtering Resources
  const filteredResources =
    selectedLevel === 'Level' && selectedCategory === 'Category'
      ? resources
      : selectedLevel !== 'Level' && selectedCategory === 'Category'
      ? resources.filter((r) => r.level.name === selectedLevel)
      : selectedLevel === 'Level' && selectedCategory !== 'Category'
      ? resources.filter((r) => r.category.name === selectedCategory)
      : resources
          .filter((r) => r.category.name === selectedCategory)
          .filter((r) => r.level.name === selectedLevel);

  return (
    <>
      {/* Dropdowns */}
      <div className='row g-3 m-4'>
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
      </div>

      {/* Resource Cards */}
      <div class='row row-cols-1 row-cols-md-4 g-4'>
        {filteredResources.map((resource) => (
          <Card key={resource._id} item={resource} />
        ))}
      </div>
    </>
  );
};

export default Resource;
