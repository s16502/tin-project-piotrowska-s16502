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
    res.render('pages/consultant/form', {navLocation: 'consultant'});
}

exports.showConsultantDetails = (req, res, next) => {
    res.render('pages/consultant/details', {navLocation: 'consultant'});
}




