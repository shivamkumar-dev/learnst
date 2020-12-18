import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Joi from 'joi';
import Input from '../common/input';
import Select from '../common/select';
import { getResource, saveResource } from '../../services/resourceService';
import { getCategories } from '../../services/categoryService';
import { getLevels } from '../../services/levelService';
import { validate, validateProperty } from '../../utils/formValidation';

const ResourceForm = () => {
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

  const { id: resourceId } = useParams();
  const history = useHistory();

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
  // --Categories & Levels
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

  //--Resource
  useEffect(() => {
    if (resourceId === 'new') return;

    let mounted = true;
    (async () => {
      try {
        const oldResource = await getResource(resourceId);
        if (mounted) {
          setResource(mapToViewModel(oldResource));
        }
      } catch (ex) {
        if (ex) return history.replace('/not-found');
      }
    })();

    return () => (mounted = false);
  }, [resourceId, history]);

  // Extracting Properties
  const mapToViewModel = ({ data }) => ({
    _id: data._id,
    title: data.title,
    resourceUrl: data.resourceUrl,
    coverUrl: data.coverUrl,
    categoryId: data.category._id,
    levelId: data.level._id,
  });

  // Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate whole Form on Submition
    const errors = validate(resource, schema);
    if (errors) setErrors(errors);
    else setErrors({});

    if (errors) return;

    // Save Updated or New Resource
    await saveResource(resource, resourceId);
    history.push('/resources');
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
        <button
          type='submit'
          onClick={handleSubmit}
          className='btn btn-primary my-4'
        >
          Save
        </button>
      </form>
    </>
  );
};

export default ResourceForm;
