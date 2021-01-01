const db = require('../../config/mysql2/db');

exports.getConsProject = () => {
    const query = `SELECT c.consId, c.firstName, c.lastName, c.email, c.pass, cp.cons_projectId, cp.hours,
    cp.workType, p.projectId, p.name, p.location, p.date 
    FROM Cons_Project cp 
        left join Consultant c on cp.consId = c.consId
        left join Project p on cp.project_id = p.projectId`
    return db.promise().query(query)
        .then( (results, fields) => {
            const cons_projects = [];
            for(let i=0; i<results[0].length; i++) {
                const row = results[0][i];
                const con_project = {
                    cons_projectId: row.cp.cons_projectId,
                    hours: row.hours,
                    workType: row.workType,
                    project: {
                        projectId: row.projectId,
                        name: row.name,
                        date: row.date,
                        location: row.location
                    },
                    consultant: {
                        consId: row.consIdd,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        email: row.email,
                        pass: row.email
                    }
                };
                cons_projects.push(cons_project);
            }
            console.log(cons_projects);
            return cons_projects;
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getCons_ProjectById = (cons_projectId) => {
    const query = `SELECT c.consId, c.firstName, c.lastName, c.email, c.pass, cp.cons_projectId, cp.hours,
    cp.workType, p.projectId, p.name, p.location, p.date 
    FROM Cons_Project cp 
        left join Consultant c on cp.consId = c.consId
        left join Project p on cp.project_id = p.projectId`

    return db.promise().query(query, [cons_projectId])
        .then( (results, fields) => {
            const row = results[0][0];
            if(!row) {
                return {};
            }
            const cons_project = {
                cons_projectI: row.cons_projectId,
                hours: row.hours,
                workType: row.workType,
                
                project: {
                    projectId: row.projectId,
                    name: row.name,
                    date: row.date,
                    location: row.location
                },
                consultant: {
                    consId: row.consId,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    email: row.email,
                    pass: row.pass 
                }
            };
            console.log(cons_project);
            return cons_project;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createCons_project = (data) => {
    console.log('createCons_Project');
    console.log(data);
    const sql = 'INSERT into Cons_Project (consId, projectId, hours, workType) VALUES (?, ?, ?, ?)';
    return db.promise().execute(sql, [data.consId, data.projectId, data.hours, data.workType]);
};

//exports.updateCons_Project = (cons_projectId, data) => {
    //data.dateTo = data.dateTo ? data.dateTo : null;
    //const sql = `UPDATE Employment set emp_id = ?, dept_id = ?, salary = ?, dateFrom = ?, dateTo = ? where _id = ?`;
    //return db.promise().execute(sql, [data.empId, data.deptId, data.salary, data.dateFrom, data.dateTo, employmentId]);
//}

exports.deleteCons_Project = (cons_projectId) => {
    const sql = 'DELETE FROM Cons_Project where cons_projectId = ?'
    return db.promise().execute(sql, [cons_projectId]);
}

exports.deleteManyCons_Project = (cons_projectIds) => {
    const sql = 'DELETE FROM Cons_Project where cons_projectId IN (?)'
    return db.promise().execute(sql, [cons_projectIds]);
}

