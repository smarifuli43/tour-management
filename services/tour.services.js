const Tour = require('../models/tourSchema');

exports.getTourServices = async (filters, queries) => {
  const tours = await Tour.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  return tours;
};

exports.createTourService = async (data) => {
  const tour = await Tour.create(data);
  return tour;
};

exports.getTourByIdService = async (id) => {
  const result = await Tour.updateOne({ _id: id }, { $inc: { viewCount: 1 } });

  const tour = await Tour.findById(id);

  return tour;
};
