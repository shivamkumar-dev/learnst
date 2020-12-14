import React, { useState, useEffect } from 'react';
import ResourceCard from './resourceCard';
import Dropdown from '../common/dropdown';
import Button from '../common/button';
import { getResources } from '../../services/resourceService';
import { getCategories } from '../../services/categoryService';
import { getLevels } from '../../services/levelService';

const Resource = () => {
  //  States
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [selectedLevel, setSelectedLevel] = useState('Level');

  // Getting Datas from API
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await getResources();
      if (mounted) {
        setResources(data);
      }
    })();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const result = await getCategories();
      if (mounted) {
        setCategories(result.data);
      }
    })();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const result = await getLevels();
      if (mounted) {
        setLevels(result.data);
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
          <Button className='btn btn-primary' label='Add New Resource' />
        </div>
      </div>

      {/* Resource Cards */}
      <div className='row row-cols-1 row-cols-md-4 g-4'>
        {filteredResources.map((resource) => (
          <ResourceCard item={resource} key={resource._id} />
        ))}
      </div>
    </>
  );
};

export default Resource;
