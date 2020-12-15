const filter = (item1, item2, data) => {
  return item1 === 'Level' && item2 === 'Category'
    ? data
    : item1 !== 'Level' && item2 === 'Category'
    ? data.filter((r) => r.level.name === item1)
    : item1 === 'Level' && item2 !== 'Category'
    ? data.filter((r) => r.category.name === item2)
    : data
        .filter((r) => r.category.name === item2)
        .filter((r) => r.level.name === item1);
};

export default filter;

// selectedLevel === 'Level' && selectedCategory === 'Category'
//   ? quizzes
//   : selectedLevel !== 'Level' && selectedCategory === 'Category'
//   ? quizzes.filter((r) => r.level.name === selectedLevel)
//   : selectedLevel === 'Level' && selectedCategory !== 'Category'
//   ? quizzes.filter((r) => r.category.name === selectedCategory)
//   : quizzes
//       .filter((r) => r.category.name === selectedCategory)
//       .filter((r) => r.level.name === selectedLevel);
