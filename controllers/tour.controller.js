const {
  getTourServices,
  createTourService,
  getTourByIdService,
} = require('../services/tour.services');

// get tours
exports.getTours = async (req, res) => {
  try {
    let filters = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field) => delete filters[field]);

    let queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const tours = await getTourServices(filters, queries);
    console.log(tours);
    res.status(200).json({
      status: 'success',
      data: tours,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Data is not valid',
      error: error.message,
    });
  }
};

// create tour
exports.createTour = async (req, res) => {
  try {
    const tours = await createTourService(req.body);

    res.status(200).json({
      status: 'success',
      data: tours,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Data is not valid',
      error: error.message,
    });
  }
};

// get tour by id
exports.getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await getTourByIdService(id);

    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Data is not valid',
      error: error.message,
    });
  }
};
