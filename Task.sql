Use nodelogin;

/* table properties */
/* CREATE TABLE Task(
	Task_name VARCHAR(50),
    Task_description VARCHAR(150),
    Task_notes LONGTEXT,
    Task_id VARCHAR(100),
    Task_plan VARCHAR(20),
    Task_app_Acronym VARCHAR(20),
    Task_state ENUM('open', 'to_do', 'doing', 'done') DEFAULT 'open',
    Task_creator VARCHAR(30),
    Task_owner VARCHAR(30),
    Task_createDate DATE DEFAULT (current_date()),
    FOREIGN KEY (Task_plan)
        REFERENCES plan (Plan_MVP_name),
	FOREIGN KEY (Task_app_Acronym)
        REFERENCES application (App_Acronym)
); */

