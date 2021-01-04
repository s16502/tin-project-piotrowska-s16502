const express = require('express');
const router = express.Router();

const consultantControler = require('../controllers/consultantController');

router.get('/', consultantControler.showConsultantList);
router.get('/add', consultantControler.showAddConsultantForm);
router.get('/edit/:consId', consultantControler.showEditConsultantForm);
router.get('/details/:consId', consultantControler.showConsultantDetails);
router.get('/delete/:consId', consultantControler.deleteConsultant);
router.get('/addtoproject', consultantControler.addConsultantToProjectForm);
router.post('/add', consultantControler.addConsultant); 
router.post('/edit', consultantControler.updateConsultant);
router.post('/addtoproject', consultantControler.addConsultantToProject); 

module.exports = router;





