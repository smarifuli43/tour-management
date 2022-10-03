const Tour = require('../models/tourSchema');

exports.getTourServices = async (filters, queries) => {
  const tours = await Tour.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total = await Tour.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);

  return { total, page, tours };
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

exports.updateTourService = async (id, data) => {
  const tour = await Tour.updateOne(
    { _id: id },
    { $set: data },
    {
      runValidators: true,
    }
  );
  return tour;
};

exports.tourTrendingService = async () => {
  const tour = await Tour.find({}).sort({ viewCount: -1 }).limit(3);
  return tour;
};

exports.tourCheapestService = async () => {
  const tours = await Tour.find({}).sort({ price: 1 }).limit(3);
  return tours;
};
