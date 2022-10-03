const {
  getTourServices,
  createTourService,
  getTourByIdService,
  updateTourService,
  tourTrendingService,
  tourCheapestService,
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

    if (req.query.page || req.query.limit) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const tours = await getTourServices(filters, queries);
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

// update tour
exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await updateTourService(id, req.body);
    console.log(tour);
    res.status(200).json({
      status: 'success',
      data: 'Tour updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Data is not valid',
      error: error.message,
    });
  }
};

// trending tours
exports.tourTrending = async (req, res) => {
  try {
    const tours = await tourTrendingService();
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

// cheapest tour
exports.tourCheapest = async (req, res) => {
  try {
    const tours = await tourCheapestService();

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
