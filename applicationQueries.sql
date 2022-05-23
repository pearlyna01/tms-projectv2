SELECT 
    *
FROM
    nodelogin.application;

SELECT App_Acronym, App_Description, App_startDate, App_endDate FROM nodelogin.applications;
/* create app */
INSERT INTO nodelogin.application(App_Acronym, App_Description, 
           App_startDate, App_endDate, App_permit_Open, App_permit_toDoList, App_permit_Doing, App_permit_Done, 
          App_permit_CreateT, App_permit_CreateP) VALUES 
         ('ACRO','test value','2003-04-23','2003-04-05', 
          '["Admin"]','["Admin"]','["Admin"]','["Admin"]','["Admin"]','["Admin"]');

/* check if app acronym exist */
SELECT EXISTS (SELECT App_Acronym FROM nodelogin.application WHERE App_Acronym='');

/* increment the running number of the application */
UPDATE nodelogin.application SET App_Rnumber = App_Rnumber + 1 WHERE App_Acronym="";

/* Get details of the app information */
SELECT App_Description, App_startDate, App_endDate FROM nodelogin.application WHERE App_Acronym='ACRO3';

/* Get list of app permissions */
SELECT App_permit_Open, App_permit_toDoList, App_permit_Doing, App_permit_Done, 
    App_permit_Close, App_permit_CreateT, App_permit_CreateP FROM nodelogin.application 
    WHERE App_Acronym='ACRO3';
    
SELECT App_permit_Done FROM nodelogin.application WHERE App_Acronym="AP2";