// property.model.js
// Load the module dependencies
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define a new 'PropertySchema'
const PropertySchema = new Schema({
    propertyId: { type: String, unique: true, required: true },
    title: String,
    address: String,
    type: String,
    bedrooms: Number,
    bathrooms: Number,
    rent: Number,
    availabilityDate: String,
    leaseLength: Number
});

// Create the 'Property' model out of the 'PropertySchema'
const Property = mongoose.model('Property', PropertySchema);

// Export the 'Property' model
module.exports = Property;
