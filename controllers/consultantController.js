exports.showConsultantList = (req, res, next) => {
    res.render('pages/consultant/list', {navLocation: 'consultant'});
}

exports.showAddConsultantForm = (req, res, next) => {
    res.render('pages/consultant/form', {navLocation: 'consultant'});
}

exports.showConsultantDetails = (req, res, next) => {
    res.render('pages/consultant/details', {navLocation: 'consultant'});
}




