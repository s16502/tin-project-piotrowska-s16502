const ConsultantRepository = require('../repository/mysql2/ConsultantRepository');
const ProjectRepository = require('../repository/mysql2/ProjectRepository');

exports.showConsultantList = (req, res, next) => {
    ConsultantRepository.getConsultants()
        .then(conss => {
            res.render('pages/consultant/list', {
                conss: conss,
                navLocation: 'cons'
            });
        });
}
        
exports.showAddConsultantForm = (req, res, next) => {
    res.render('pages/consultant/form', {
        cons: {},
        pageTitle: 'Nowy konsultant',
        formMode: 'createNew',
        btnLabel: 'Dodaj konsultanta',
        formAction: '/consultants/add',
        navLocation: 'cons',
        validationErrors: null
    });
}

exports.showEditConsultantForm = (req, res, next) => {
    const consId = req.params.consId;
    ConsultantRepository.getConsultantById(consId)
        .then(cons => {
            res.render('pages/consultant/form', {
                cons: cons,
                formMode: 'edit',
                pageTitle: 'Edycja konsultanta',
                btnLabel: 'Edytuj konsultanta',
                formAction: '/consultants/edit',
                navLocation: 'cons',
                validationErrors: null
            });
        });
};

exports.showConsultantDetails = (req, res, next) => {
    
    const consId = req.params.consId;
    ConsultantRepository.getConsultantById(consId)
        .then(cons => {
            res.render('pages/consultant/form', {
                cons: cons,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły konsultanta',
                formAction: '',
                navLocation: 'cons',
                validationErrors: null
            });
        });
  
}

exports.deleteConsultant = (req, res, next) => {
    const consultantId = req.params.consId;
    ConsultantRepository.deleteConsultant(consId)
    .then( () => {
        res.redirect('/consultants');
    });
}

exports.addConsultant = (req, res, next) => {
    const consData = { ...req.body };
    ConsultantRepository.createConsultant(consData)
        .then( result => {
            res.redirect('/consultants');
        })
        .catch(err => {
            res.render('pages/consultant/form', {
                cons: consData,
                pageTitle: 'Nowy konsultant',
                formMode: 'createNew',
                btnLabel: 'Dodaj konsultanta',
                formAction: '/consultants/add',
                navLocation: 'cons',
                validationErrors: err.details
            });
        });
};



exports.updateConsultant = (req, res, next) => {
    const consId = req.body.consId;
    const consData = { ...req.body };

    ConsultantRepository.updateConsultant(consId, consData)
        .then( result => {
            res.redirect('/consultants');
        })
        .catch(err => {
            console.log('debug');
            console.log(err);
            res.render('pages/consultant/form', {
                cons: consData,
                formMode: 'edit',
                pageTitle: 'Edycja konsultanta',
                btnLabel: 'Edytuj konsultanta',
                formAction: '/consultants/edit',
                navLocation: 'cons',
                validationErrors: err.details
            });
        });
};

exports.addConsultantToProjectForm = (req, res, next) => {
    
    let allCons, allProjs;
    ConsultantRepository.getConsultants()
    .then(cons => {
        allCons = cons;
        return ProjectRepository.getProjects();
    })
    .then (projects => {
        allProjs = projects;
        res.render('pages/consultant/addproj', {
            cons: allCons,
            projects: allProjs,
            navLocation: 'cons'
        });
    });
};

exports.addConsultantToProject = (req, res, next) => {

    const consId = req.body.select1;
    const projectId = req.body.select2;
    const hours = req.body.hours;
    const workType = req.body.workType;

    ConsultantRepository.assignConsultant(consId, projectId, hours, workType)  
    .then( result => {
        res.redirect('/consultants');
    });
};




