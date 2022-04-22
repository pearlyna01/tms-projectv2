use nodelogin;
select  distinct groupName FROM nodelogin.groups where username="member3";

SELECT * FROM nodelogin.groups;

/* insert a row in the 'groups' table */;
INSERT nodelogin.groups (username, groupName)
VALUES ('lead1',"Product Manager");

/* select members and their groups, inactive 
   groups the groups names in a array  */;
SELECT nodelogin.accounts.username, nodelogin.accounts.inactive,
nodelogin.accounts.email,
JSON_ARRAYAGG(nodelogin.groups.groupName) AS roles
FROM nodelogin.accounts 
LEFT JOIN nodelogin.groups
ON nodelogin.groups.username = nodelogin.accounts.username
WHERE nodelogin.accounts.username IN ('lead1','admin')
GROUP BY nodelogin.accounts.username
;

SELECT nodelogin.accounts.username, nodelogin.accounts.inactive,
nodelogin.accounts.email
FROM nodelogin.accounts
UNION
SELECT nodelogin.groups.username, JSON_ARRAYAGG(nodelogin.groups.groupName) AS roles
FROM nodelogin.groups
ORDER BY username;


/* delete a row */;
DELETE FROM nodelogin.groups WHERE username="member2" AND groupname = "";
DELETE FROM nodelogin.groups WHERE groupname="";

/* update a value */;
UPDATE nodelogin.groups SET groupname="Product Manager" WHERE groupname = "Product manager";

/* get all group names in a array */;
SELECT JSON_ARRAYAGG(groupName) AS roles FROM nodelogin.groups WHERE username="desc";

/* insert mutliple values for assigning users into mutliple groups */
INSERT INTO nodelogin.groups(username,groupName) VALUES ('member2','Product Manager'),('member2','Lead');

/* insert a role group name */
INSERT INTO nodelogin.groups(username,groupName) 
VALUES ('desc','Product Manager');

/* add composite key where username and groupName are paired to groups */
CREATE UNIQUE INDEX index1 ON nodelogin.groups(username,groupName);


SELECT JSON_ARRAYAGG(groupName) AS roles FROM nodelogin.groups WHERE username="member3";
