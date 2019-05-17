// Mock data
import subcategory from 'data/subcategory';

export const getSubCategory = (limit = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        subCategories: subcategory.slice(0, limit),
        subCategoriesTotal: subcategory.length
      });
    }, 700);
  });
};
