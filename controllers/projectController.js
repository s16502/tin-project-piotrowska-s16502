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
    res.render('/pages/project/form', {
        project: {},
        pageTitle: 'Nowy projekt',
        formMode: 'createNew',
        btnLabel: 'Dodaj projekt',
        formAction: '/projects/add',
        navLocation: 'project'
    });
}

exports.showEditProjectForm = (req, res, next) => {
    const projectId = req.params.projectId;
    ProjectRepository.getProjectById(projectId)
        .then(project => {
            res.render('pages/project/form', {
                project: project,
                formMode: 'edit',
                pageTitle: 'Edycja projektu',
                btnLabel: 'Edytuj projekt',
                formAction: '/projects/edit',
                navLocation: 'project'
            });
        });
};

exports.showProjectDetails = (req, res, next) => {

        const projectId = req.params.projectId;
    ProjectRepository.getProjectById(projectId)
        .then(project => {
            res.render('pages/project/form', {
                project: project,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły projektu',
                formAction: '',
                navLocation: 'project'
            });
        });
        

}

exports.deleteProject = (req, res, next) => {
    const projectId = req.params.projectId;
    ProjectRepository.deleteProject(projectId)
    .then( () => {
        res.redirect('/projects');
    });
}