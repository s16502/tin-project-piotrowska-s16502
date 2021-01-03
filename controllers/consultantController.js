const ConsultantRepository = require('../repository/mysql2/ConsultantRepository');


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
    res.render('/pages/consultant/form', {
        cons: {},
        pageTitle: 'Nowy konsultant',
        formMode: 'createNew',
        btnLabel: 'Dodaj konsultanta',
        formAction: '/consultants/add',
        navLocation: 'cons'
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
                navLocation: 'cons'
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
                navLocation: 'cons'
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
        });
};

exports.updateConsultant = (req, res, next) => {
    const consId = req.body.consId;
    const consData = { ...req.body };

    ConsultantRepository.updateConsultant(consId, consData)
        .then( result => {
            res.redirect('/consultants');
        });
};






