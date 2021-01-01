const ConsultantRepository = require('../repository/mysql2/ConsultantRepository');

exports.getConsultants = (req, res, next) => {
    ConsultantRepository.getConsultants()
        .then(cons => {
            res.status(200).json(cons);
        })
        .catch(err => {
           console.log(err);
        });
};


exports.getConsultantById = (req, res, next) => {
    const consId = req.params.consId;
    ConsultantRepository.getConsultantById(consId)
        .then(cons => {
            if(!cons) {
                res.status(404).json({
                    message: 'Consultant with id: '+consId+' not found'
                })
            } else {
                res.status(200).json(cons);
            }
        });
};

exports.createConsultant = (req, res, next) => {
    ConsultantRepository.createConsultant(req.body)
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

exports.updateConsultant = (req, res, next) => {
    const consId = req.params.consId;
    ConsultantRepository.updateConsultant(consId, req.body)
        .then(result => {
           res.status(200).json({message: 'Consultant updated!', cons: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteConsultant = (req, res, next) => {
    const consId = req.params.consId;
    ConsultantRepository.deleteConsultant(consId)
        .then(result => {
            res.status(200).json({message: 'Removed consultant', cons: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

