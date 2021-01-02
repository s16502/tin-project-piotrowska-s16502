const db = require('../../config/mysql2/db');

exports.getProjects = () => {
    return db.promise().query('SELECT * FROM Project')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getProjectById = (projectId) => {
    const query = `SELECT c.consId, c.firstName, c.lastName, c.email, c.pass, cp.cons_projectId, cp.hours,
    cp.workType, p.projectId, p.name, p.location, p.date 
    FROM Project p
    left join Cons_Project cp on cp.projectId = p.projectId 
    left join Consultant c on cp.consId = c.consId
    where p.projectId = ?`

return db.promise().query(query, [projectId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const project = {
            projectId: parseInt(projectId),
            name: firstRow.name,
            date: firstRow.date,
            location: firstRow.location,
            cons_projects: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.cons_projectId) {
                const cons_project = {
                    _id: row.consId,
                    hours: row.hours,
                    workType: row.workType,
                    consultant: {
                        consId: row.consId,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        email: row.email,
                        pass: row.pass
                    }
                };
                project.cons_projects.push(cons_project);
            }
        }
        return project;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createProject = (newProjectData) => {
    const name = newProjectData.name;
    const date = newProjectData.date;
    const location = newProjectData.location;
    const sql = 'INSERT into Project (name, date, location) VALUES (?, ?, ?)'
    return db.promise().execute(sql, [name, date, location]);
};

exports.updateProject = (projectId, projectData) => {
    const name = projectData.name;
    const date = projectData.date;
    const location = projectData.location;
    const sql = `UPDATE Project set name = ?, date = ?, location = ? where projectId = ?`;
    return db.promise().execute(sql, [name, date, location, projectId]);
};

exports.deleteProject = (projectId) => {
    const sql1 = 'DELETE FROM Cons_Project where projectId = ?'  
    const sql2 = 'DELETE FROM Project where projectId = ?'

    return db.promise().execute(sql1, [projectId])
    .then(() => {
        return db.promise().execute(sql2, [projectId])
    });
};
