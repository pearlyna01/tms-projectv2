SELECT * FROM nodelogin.groups;

/* 1. Get list of users with roles */
/* NOTE combine the 2 queries in node.js */
/* original query */
SELECT nodelogin.accounts.username, nodelogin.accounts.inactive,
    nodelogin.accounts.email,
    JSON_ARRAYAGG(nodelogin.groups.groupName) AS roles
    FROM nodelogin.accounts 
    LEFT JOIN nodelogin.groups
    ON nodelogin.groups.username = nodelogin.accounts.username
    GROUP BY nodelogin.accounts.username;
/* list of user with only roles */
SELECT DISTINCT username, groupName AS roles FROM nodelogin.groups 
 WHERE 
	 active='1'
 AND groupName in (
	 SELECT groupName FROM nodelogin.groups 
	 WHERE id IN (SELECT MAX(id) FROM nodelogin.groups WHERE username="desc" GROUP BY groupName)
		AND active='1')
AND NOT username="desc"
ORDER BY username;
/* list of users and their details */
SELECT username, inactive, email FROM nodelogin.accounts ORDER BY username;

/* 2. Get list of a user's roles */
/* note that this also checks if the user's roles is in the list of avaliable roles */
SELECT json_arrayagg(groupName) AS roles FROM nodelogin.groups 
 WHERE id IN (SELECT MAX(id) FROM nodelogin.groups WHERE username="admin" GROUP BY groupName)
 AND active='1'
 AND groupName in (
	 SELECT groupName FROM nodelogin.groups 
	 WHERE id IN (SELECT MAX(id) FROM nodelogin.groups WHERE username="desc" GROUP BY groupName)
	 AND active='1');
/* VVVVVVVVV DO NOT USE BELOW LINE VVVVVVVVV */
SELECT * FROM nodelogin.groups 
 WHERE id IN (SELECT MAX(id) FROM nodelogin.groups WHERE username="member3" GROUP BY groupName)
 AND active='1'
 AND groupName in (
	 SELECT groupName FROM nodelogin.groups 
	 WHERE id IN (SELECT MAX(id) FROM nodelogin.groups WHERE username="desc" GROUP BY groupName)
	 AND active='1');
 
/* 3. Add role */
INSERT INTO nodelogin.groups(username,groupName) VALUES ('desc', 'Admin');
/* Below query don't insert when role exists */
INSERT INTO nodelogin.groups(username,groupName) SELECT 'desc','Admin'
WHERE NOT EXISTS (
	SELECT 1 FROM nodelogin.groups 
	 WHERE id IN (SELECT MAX(id) FROM nodelogin.groups WHERE username="desc" AND groupName="Admin" GROUP BY groupName)
	 AND active='1'
);
/* 4. Remove role */
INSERT INTO nodelogin.groups(username,groupName,active) VALUES ('desc', 'new role','0');

/* 5. Get list of avaliable roles */
SELECT JSON_ARRAYAGG(groupName) AS roles FROM nodelogin.groups 
 WHERE id IN (SELECT MAX(id) FROM nodelogin.groups WHERE username="desc" GROUP BY groupName)
 AND active='1'; 
/* VVVVVVVVV DO NOT USE BELOW LINE VVVVVVVVV */
SELECT * FROM nodelogin.groups 
 WHERE id IN (SELECT MAX(id) FROM nodelogin.groups WHERE username="desc" GROUP BY groupName)
 AND active='1';
 
/* 6. Remove assigned role */
INSERT INTO nodelogin.groups(username,groupName,active) VALUES ('username', 'new role', '0');

/* 7. Assign role [NO CHANGE] BUT NEED TO CHECK IF ROLE EXISTS*/
INSERT INTO nodelogin.groups(username,groupName) VALUES ('username', 'new role');

/* 8. Insert value when create role [NO CHANGE] BUT NEED TO CHECK IF ROLE EXISTS */
INSERT INTO nodelogin.groups(username,groupName) VALUES ('username', 'new role'),('username','new role 2');