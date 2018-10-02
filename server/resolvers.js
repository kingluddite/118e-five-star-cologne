exports.resolvers = {
  Query: {
    getAllColognes: async (root, args, { Cologne }) => {
      const allColognes = await Cologne.find();
      return allColognes;
    },
  },

  Mutation: {
    addCologne: async (
      root,
      { scentName, scentPrice, description, username },
      { Cologne }
    ) => {
      const newCologne = await new Cologne({
        scentName,
        scentPrice,
        description,
        username,
      }).save();

      return newCologne;
    },
  },
};
