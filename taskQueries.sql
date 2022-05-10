SELECT * FROM nodelogin.task;

/* set task to "to do" */
UPDATE nodelogin.task SET Task_state='to_do', Task_notes=CONCAT('note',Task_notes) WHERE Task_id='ACRO2_5';

SELECT * FROM nodelogin.task WHERE Task_app_Acronym='ACRO3' ORDER BY Task_state;

SELECT Task_state, Task_name, Task_description, 
Task_notes, Task_id, Task_plan, Task_creator,
Task_creator, Task_owner, Task_createDate
FROM nodelogin.task