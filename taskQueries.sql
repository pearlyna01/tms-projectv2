SELECT * FROM nodelogin.task;

/* set task to "to do" */
UPDATE nodelogin.task SET Task_state='to_do', Task_notes=CONCAT('note',Task_notes) WHERE Task_id='ACRO2_5';

SELECT Task_Notes FROM nodelogin.task WHERE Task_id='ACRO2_6';