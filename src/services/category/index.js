// Mock data
import category from 'data/category';

export const getCategory = (limit = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        categories: category.slice(0, limit),
        categoriesTotal: category.length
      });
    }, 700);
  });
};
