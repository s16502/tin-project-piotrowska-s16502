const express = require('express');
const router = express.Router();

const consultantControler = require('../controllers/consultantController');

router.get('/', consultantControler.showConsultantList);
router.get('/add', consultantControler.showAddConsultantForm);
router.get('/edit/:consId', consultantControler.showEditConsultantForm);
router.get('/details/:consId', consultantControler.showConsultantDetails);
router.get('/delete/:consId', consultantControler.deleteConsultant);

module.exports = router;





