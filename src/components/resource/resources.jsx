import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ResourceCard from './resourceCard';
import Dropdown from '../common/dropdown';
import { getResources } from '../../services/resourceService';
import { getCategories } from '../../services/categoryService';
import { getLevels } from '../../services/levelService';
import filter from '../../utils/filter';

const Resource = () => {
  // States
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [selectedLevel, setSelectedLevel] = useState('Level');

  // Getting Datas from API
  useEffect(() => {
    let mounted = true;
    (async () => {
      const resources = await getResources();
      const categories = await getCategories();
      const levels = await getLevels();
      if (mounted) {
        setResources(resources.data);
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

  // Filtering Resources
  const filteredResources = filter(selectedLevel, selectedCategory, resources);

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

        <div className='col-3'>
          <Link to='/resources/new' className='btn btn-primary'>
            Add New Resource
          </Link>
        </div>
      </div>

      {/* Display All Resources On Resources Section */}
      <div className='row row-cols-1 row-cols-md-4 g-4'>
        {filteredResources.map((resource) => (
          <ResourceCard item={resource} key={resource._id} />
        ))}
      </div>
    </>
  );
};

export default Resource;
