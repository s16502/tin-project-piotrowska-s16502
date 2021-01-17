const ProjectRepository = require('../repository/mysql2/ProjectRepository');

exports.showProjectList = (req, res, next) => {
    
    const param = req.query.param;
    ProjectRepository.getProjects()
        .then(projects => {
            res.render('pages/project/list', {
                projects: projects,
                navLocation: 'project',
                modified: param
            });
        });
}
   
exports.showAddProjectForm = (req, res, next) => {
    res.render('pages/project/form', {
        project: {},
        pageTitle: 'Nowy projekt',
        formMode: 'createNew',
        btnLabel: 'Dodaj projekt',
        formAction: '/projects/add',
        navLocation: 'project',
        validationErrors: null,
        modified: {}
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
                navLocation: 'project',
                validationErrors: null,
                modified: {}
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
                navLocation: 'project',
                validationErrors: null,
                modified: {}
            });
        });
        

}

exports.deleteProject = (req, res, next) => {
    const projectId = req.params.projectId;
    ProjectRepository.deleteProject(projectId)
    .then( () => {
        res.redirect('/projects?param=del');
    });
}

exports.addProject = (req, res, next) => {
    const projectData = { ...req.body };
    ProjectRepository.createProject(projectData)
        .then( result => {
            res.redirect('/projects?param=add');
        })
        .catch(err => {
            res.render('pages/project/form', {
                project: projectData,
                pageTitle: 'Nowy projekt',
                formMode: 'createNew',
                btnLabel: 'Dodaj projekt',
                formAction: '/projects/add',
                navLocation: 'project',
                validationErrors: err.details,
                modified: {}
            });
        });
};

exports.updateProject = (req, res, next) => {
    const projectId = req.body.projectId;
    const projectData = { ...req.body };

    ProjectRepository.updateProject(projectId, projectData)
        .then( result => {
            res.redirect('/projects?param=mod');
        })
        .catch(err => {
            console.log('debug');
            console.log(err);
            res.render('pages/project/form', {
                project: projectData,
                formMode: 'edit',
                pageTitle: 'Edycja projektu',
                btnLabel: 'Edytuj projekt',
                formAction: '/projects/edit',
                navLocation: 'project',
                validationErrors: err.details,
                modified: {}
            });
        });
};

