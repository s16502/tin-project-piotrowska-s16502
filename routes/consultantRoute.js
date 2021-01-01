const express = require('express');
const router = express.Router();

const consultantControler = require('../controllers/consultantController');

router.get('/', consultantControler.showConsultantList);
//router.get('/add', consultantControler.showAddConsultantForm);
//router.get('/details/:empId', consultantControler.showConsultantDetails);

module.exports = router;





