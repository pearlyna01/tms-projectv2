// const mysql = require('mysql2');
// const config = require('../config/dbconfig.json');
// const getQuery = require('../modules/getQuery');

// creating a pool of connections
// const dbConnPool = mysql.createPool(config);

// This file contains filtering sql results related functions -------------------------------------

// Filter the data to get the active roles of each user
// returns the username and their active roles (in an array)
exports.filterActive = (data) => {
    console.log('====================================\nFiltering duplicate rows');
    // Removing redundant rows/ get roles
    let arr = [data[0]];
    for (let i = 1; i < data.length; i++) {
        // if the row has same user and role as previous row, remove/pop the previous row
        // else push row
        if ((data[i].username === data[i-1].username) && (data[i].groupName === data[i-1].groupName)) {
            arr.pop();
            arr.push(data[i]);
        } else {
            arr.push(data[i]);
        }
    }
    //console.log(arr);

    // Filter out the inactive roles
    arr = arr.filter(row => row.active === 1);
    
    console.log('====================================\nConverting into JSON arrays');
    // Convert the array of JSON into {username, roles}
    let result = [];
    let row = { username: arr[0].username, roles: [arr[0].groupName] };
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].username === row.username) {
            row.roles.push(arr[i].groupName);
        } else {
            result.push(row);
            row = {username: arr[i].username, roles: [arr[i].groupName] };
        }
    }
    // push the last row if the row is not pushed yet
    if (result[result.length-1].username !== row.username) {
        result.push(row);
    }
    // console.log(result);
    return result;
};

// const q = `SELECT id, username, groupName, active FROM nodelogin.groups 
// WHERE NOT username='desc'
// AND groupName in (
// 	 SELECT groupName FROM nodelogin.groups 
// 	 WHERE id IN (SELECT MAX(id) FROM nodelogin.groups WHERE username="desc" GROUP BY groupName)
// 	 AND active='1')
// ORDER BY username,groupName;`;
// getQuery.processQuery(q,dbConnPool).then(data => filterActive(data)).catch(err => console.log(err));