// property.server.resolvers.js
const Property = require('../models/property.server.model');

const getProperties = async () => {
  return await Property.find();
};

const getPropertyById = async (parent, args) => {
  return await Property.findById(args.id);
};

const createProperty = async (parent, args) => {
  const property = new Property(args);
  return await property.save();
};

const updateProperty = async (parent, args) => {
  const { id, ...update } = args;
  const options = { new: true };
  return await Property.findByIdAndUpdate(id, update, options);
};

const deleteProperty = async (parent, args) => {
  return await Property.findByIdAndDelete(args.id);
};

// Make resolvers available to other modules
module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
