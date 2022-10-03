const {
  getTourServices,
  createTourService,
} = require('../services/tour.services');

exports.getTours = async (req, res) => {
  try {
    const tours = await getTourServices();
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
