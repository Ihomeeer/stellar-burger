import PropTypes from 'prop-types';

const itemPropTypes = PropTypes.shape({
  "_id": PropTypes.string,
  "name": PropTypes.string,
  "type": PropTypes.string,
  "proteins": PropTypes.number,
  "fat": PropTypes.number,
  "carbohydrates": PropTypes.number,
  "calories": PropTypes.number,
  "price": PropTypes.number,
  "image": PropTypes.string,
  "image_mobile": PropTypes.string,
  "image_large": PropTypes.string,
  "__v": PropTypes.number
});

const ingredientsPropTypes = PropTypes.arrayOf(itemPropTypes).isRequired;

export {
  itemPropTypes,
  ingredientsPropTypes
}