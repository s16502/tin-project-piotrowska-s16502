const express = require('express');
const router = express.Router();

const projectApiController = require('../../api/ProjectAPI');

router.get('/', projectApiController.getProjects);
router.get('/:projectId', projectApiController.getProjectById);
router.post('/', projectApiController.createProject);
router.put('/:projectId', projectApiController.updateProject);
router.delete('/:projectId', projectApiController.deleteProject);

module.exports = router;
