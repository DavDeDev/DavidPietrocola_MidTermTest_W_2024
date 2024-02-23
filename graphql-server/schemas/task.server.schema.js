// property.server.schema.js
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLSchema } = require('graphql');
const { createProperty, updateProperty, deleteProperty, getPropertyById, getProperties } = require('../resolvers/property.server.resolver');

// Define types
const PropertyType = new GraphQLObjectType({
  name: 'Property',
  fields: () => ({
    id: { type: GraphQLID },
    propertyId: { type: GraphQLString },
    title: { type: GraphQLString },
    address: { type: GraphQLString },
    type: { type: GraphQLString },
    bedrooms: { type: GraphQLInt },
    bathrooms: { type: GraphQLInt },
    rent: { type: GraphQLInt },
    availabilityDate: { type: GraphQLString },
    leaseLength: { type: GraphQLInt },
  }),
});

// Define queries
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    properties: {
      type: new GraphQLList(PropertyType),
      resolve: getProperties,
    },
    property: {
      type: PropertyType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: getPropertyById,
    },
  },
});

// Define mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createProperty: {
      type: PropertyType,
      args: {
        propertyId: { type: GraphQLString },
        title: { type: GraphQLString },
        address: { type: GraphQLString },
        type: { type: GraphQLString },
        bedrooms: { type: GraphQLInt },
        bathrooms: { type: GraphQLInt },
        rent: { type: GraphQLInt },
        availabilityDate: { type: GraphQLString },
        leaseLength: { type: GraphQLInt },
      },
      resolve: createProperty,
    },
    updateProperty: {
      type: PropertyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        propertyId: { type: GraphQLString },
        title: { type: GraphQLString },
        address: { type: GraphQLString },
        type: { type: GraphQLString },
        bedrooms: { type: GraphQLInt },
        bathrooms: { type: GraphQLInt },
        rent: { type: GraphQLInt },
        availabilityDate: { type: GraphQLString },
        leaseLength: { type: GraphQLInt },
      },
      resolve: updateProperty,
    },
    deleteProperty: {
      type: PropertyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: deleteProperty,
    },
  },
});

// Make queries and mutations available
module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation,
});
