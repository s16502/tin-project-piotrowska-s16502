exports.showProjectList = (req, res, next) => {
    res.render('pages/project/list', {navLocation: 'project'});
}

exports.showAddProjectForm = (req, res, next) => {
    res.render('pages/project/form', {navLocation: 'project'});
}

exports.showProjectDetails = (req, res, next) => {
    res.render('pages/project/details', {navLocation: 'project'});
}