import React, { useState, useEffect } from 'react';
import Joi from 'joi';
import Input from '../common/input';
import Select from '../common/select';
import { getResource } from '../../services/resourceService';
import { getCategories } from '../../services/categoryService';
import { getLevels } from '../../services/levelService';
import { validate, validateProperty } from '../../utils/formValidation';

const ResourceForm = ({ match, history }) => {
  // States
  const [resource, setResource] = useState({
    title: '',
    resourceUrl: '',
    coverUrl: '',
    categoryId: '',
    levelId: '',
  });
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [errors, setErrors] = useState({});

  // Resource Form Schema
  const schema = Joi.object().keys({
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    resourceUrl: Joi.string().required().label('Resource Url'),
    coverUrl: Joi.string().required().label('Cover Url'),
    categoryId: Joi.string().required().label('Category'),
    levelId: Joi.string().required().label('Level'),
  });

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

  useEffect(() => {
    const resourceId = match.params.id;
    if (resourceId === 'new') return;

    let mounted = true;
    (async () => {
      const { data: oldResource } = await getResource(resourceId);
      console.log(oldResource);
      if (!oldResource) return;

      // Extracting Properties
      const mapToViewModel = (oldResource) => ({
        title: oldResource.title,
        resourceUrl: oldResource.resourceUrl,
        coverUrl: oldResource.coverUrl,
        categoryId: oldResource.category._id,
        levelId: oldResource.level._id,
      });

      if (mounted) {
        setResource(mapToViewModel(oldResource));
      }
    })();
    return () => (mounted = false);
  }, [match, history]);

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate whole Form on Submition
    const errors = validate(resource, schema);
    if (errors) setErrors(errors);
    else setErrors({});

    if (errors) return;

    // call the server
    // saveResource(resource)
    console.log('submitted');
  };

  const handleChange = ({ target: input }) => {
    // Validate Individual Form Elements
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input, schema);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors);

    // Handle Input Change
    let newResource = { ...resource };
    newResource[input.name] = input.value;
    setResource(newResource);
  };

  // Form
  return (
    <>
      <h1 className='py-2'>Resource Form</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name='title'
          label='Title'
          value={resource.title}
          type='text'
          onChange={handleChange}
          error={errors.title}
        />
        <Input
          name='resourceUrl'
          label='Resource Url'
          value={resource.resourceUrl}
          type='text'
          onChange={handleChange}
          error={errors.resourceUrl}
        />
        <Input
          name='coverUrl'
          label='Cover Image Url'
          value={resource.coverUrl}
          type='text'
          onChange={handleChange}
          error={errors.coverUrl}
        />
        <Select
          name='categoryId'
          label='Category'
          onChange={handleChange}
          items={categories}
          error={errors.categoryId}
        />
        <Select
          name='levelId'
          label='Level'
          onChange={handleChange}
          items={levels}
          error={errors.levelId}
        />
        <button type='submit' className='btn btn-primary my-4'>
          Save
        </button>
      </form>
    </>
  );
};

export default ResourceForm;
