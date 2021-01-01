const express = require('express');
const router = express.Router();

const consApiController = require('../../api/ConsultantAPI');

router.get('/', consApiController.getConsultants);
router.get('/:consId', consApiController.getConsultantById);
router.post('/', consApiController.createConsultant);
router.put('/:consId', consApiController.updateConsultant);
router.delete('/:consId', consApiController.deleteConsultant);

module.exports = router;

