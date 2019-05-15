// Mock data
import subcategory from 'data/subcategory';

export const getSubCategory = (limit = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        products: subcategory.slice(0, limit),
        productsTotal: subcategory.length
      });
    }, 700);
  });
};
