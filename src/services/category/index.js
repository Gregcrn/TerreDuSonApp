// Mock data
import category from 'data/category';

export const getCategory = (limit = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        products: category.slice(0, limit),
        productsTotal: category.length
      });
    }, 700);
  });
};
