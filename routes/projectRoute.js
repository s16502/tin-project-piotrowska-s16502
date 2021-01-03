const express = require('express');
const router = express.Router();

const projectControler = require('../controllers/projectController');

router.get('/', projectControler.showProjectList);
router.get('/add', projectControler.showAddProjectForm);
router.get('/edit/:projectId', projectControler.showEditProjectForm);
router.get('/details/:projectId', projectControler.showProjectDetails);
router.get('/delete/:projectId', projectControler.deleteProject);
router.post('/add', projectControler.addProject); 
router.post('/edit', projectControler.updateProject);

module.exports = router;