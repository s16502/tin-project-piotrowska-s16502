const db = require('../../config/mysql2/db');
const consSchema = require('../../model/joi/Consultant');


exports.getConsultants = () => {
    return db.promise().query('SELECT * FROM Consultant')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getConsultantById = (consId) => {
    
    const query = `SELECT c.consId, c.firstName, c.lastName, c.email, c.pass, cp.cons_projectId, cp.hours,
    cp.workType, p.projectId, p.name, p.location, p.date 
    FROM Consultant c 
    left join Cons_Project cp on cp.consId = c.consId 
    left join Project p on cp.projectId = p.projectId
    where c.consId = ?;`

return db.promise().query(query, [consId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const cons = {
            consId: parseInt(consId),
            firstName: firstRow.firstName,
            lastName: firstRow.lastName,
            email: firstRow.email,
            pass:firstRow.pass,
            cons_projects: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.cons_projectId) {
                const cons_project = {
                    consId: row.consId,
                    hours: row.hours,
                    workType: row.workType,
                    project: {
                        projectId: row.projectId,
                        name: row.name,
                        location: row.location,
                        date: row.date
                    }
                };
                cons.cons_projects.push(cons_project);
            }
        }
        return cons;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });


};

exports.createConsultant = (newConsData) => {
    const vRes = consSchema.validate(newConsData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkEmailUnique(newConsData.email)
        .then(emailErr => {
            if(emailErr.details) {
                return Promise.reject(emailErr);
            } else {
                const firstName = newConsData.firstName;
                const lastName = newConsData.lastName;
                const email = newConsData.email;
                const pass = newConsData.pass;
                const sql = 'INSERT into Consultant (firstName, lastName, email, pass) VALUES (?, ?, ?, ?)'
                return db.promise().execute(sql, [firstName, lastName, email, pass]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

exports.updateConsultant = (consId, consData) => {
    const vRes = consSchema.validate(consData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkEmailUnique(consData.email)
        .then(emailErr => {
            if(emailErr.details) {
                return Promise.reject(emailErr);
            } else {
                const firstName = consData.firstName;
                const lastName = consData.lastName;
                const email = consData.email;
                const pass = consData.pass;
                const sql = `UPDATE Consultant set firstName = ?, lastName = ?, email = ?, pass = ? where consId = ?`;
                return db.promise().execute(sql, [firstName, lastName, email, pass, consId]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

exports.deleteConsultant = (consId) => {
    const sql1 = 'DELETE FROM Cons_Project where consId = ?' 
    const sql2 = 'DELETE FROM Consultant where consId = ?'

    return db.promise().execute(sql1, [consId])
    .then(() => {
        return db.promise().execute(sql2, [consId])
    });

};

exports.assignConsultant = (consId, projectId, hours, workType) => {

    const err_sql = 'SELECT COUNT(*) FROM Consultant'

    if(consId == -1 || projectId == -1) {
        console.log('Nie wybrano żadnej poprawnej opcji')
        return db.promise().execute(err_sql);
    }

    const sql1 = 'INSERT into Cons_Project (hours, workType, consId, projectId) VALUES (?, ?, ?, ?)'
    return db.promise().execute(sql1, [hours, workType, projectId, consId]);
            
};


checkEmailUnique = (email, consId) => {
    let sql, promise;
    if(consId) {
        sql = `SELECT COUNT(1) as c FROM Consultant where consId != ? and email = ?`
        promise = db.promise().query(sql, [consId, email]);
    } else {
        sql = `SELECT COUNT(1) as c FROM Consultant where email = ?`
        promise = db.promise().query(sql, [email]);
    }
    return promise.then( (results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if(count > 0) {
            err = {
                details: [{
                    path: ['email'],
                    message: 'Podany adres email jest już używany'
                }]
            };
        }
        return err;
    });
}

