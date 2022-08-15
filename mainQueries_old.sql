use nodelogin;
select  distinct groupName FROM nodelogin.groups where username="member3";

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

/* Modify the group table to add timestamp and active columns. 
timestamp column updates whenever row is updated. */
ALTER TABLE nodelogin.groups
     ADD timeModified 
		TIMESTAMP NOT NULL
		DEFAULT CURRENT_TIMESTAMP 
		ON UPDATE CURRENT_TIMESTAMP;
        
ALTER TABLE nodelogin.groups
	ADD active BOOLEAN NOT NULL
    DEFAULT true;

/* Update to disable a role */
UPDATE nodelogin.groups SET active='1' WHERE groupName = 'hello';
UPDATE nodelogin.groups SET active='0' WHERE groupName = 'hello' ORDER BY id DESC LIMIT 1;

/* INSERT role */
INSERT INTO nodelogin.groups(username, groupName) VALUES ('desc','hello');
SELECT * FROM nodelogin.groups;

ALTER TABLE nodelogin.groups

/* Add primary key to 'id' in groups table */
MODIFY COLUMN `id` INT(10) UNSIGNED PRIMARY KEY AUTO_INCREMENT;

/* SELECT roles */
