const ProjectRepository = require('../repository/mysql2/ProjectRepository');

exports.getProjects = (req, res, next) => {
    ProjectRepository.getProjects()
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getProjectById = (req, res, next) => {
    const projectId = req.params.projectId;
    ProjectRepository.getProjectById(projectId)
        .then(project => {
            if(!project) {
                res.status(404).json({
                    message: 'Project with id: '+projectId+' not found'
                })
            } else {
                res.status(200).json(project);
            }
        });
};

exports.createProject = (req, res, next) => {
    ProjectRepository.createProject(req.body)
        .then(newObj => {
           res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
