const express = require('express');
const router = express.Router();

const projectControler = require('../controllers/projectController');

router.get('/', projectControler.showProjectList);
router.get('/add', projectControler.showAddProjectForm);
router.get('/details/:empId', projectControler.showProjectDetails);

module.exports = router;