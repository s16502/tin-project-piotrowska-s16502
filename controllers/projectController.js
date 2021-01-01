const ProjectRepository = require('../repository/mysql2/ProjectRepository');

exports.showProjectList = (req, res, next) => {
    ProjectRepository.getProjects()
        .then(projects => {
            res.render('pages/project/list', {
                projects: projects,
                navLocation: 'project'
            });
        });
}

exports.showAddProjectForm = (req, res, next) => {
    res.render('pages/project/form', {navLocation: 'project'});
}

exports.showProjectDetails = (req, res, next) => {
    res.render('pages/project/details', {navLocation: 'project'});
}