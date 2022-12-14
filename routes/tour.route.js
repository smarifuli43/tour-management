const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tour.controller');

router.route('/trending').get(tourController.tourTrending);
router.route('/cheapest').get(tourController.tourCheapest);

router.route('/').get(tourController.getTours).post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour);

module.exports = router;
