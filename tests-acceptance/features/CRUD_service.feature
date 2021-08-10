feature: CRUD in the internal system (backend)

SO THAT the project could be able to manage new and data
AS  the system
I should be able to store data, retrieve it, update it and delete it.

Background:
GIVEN a teacher level account with login “MarDam” and password “21@Dam#20” is logged on

Scenario: Successful storage of new class in the system
WHEN the account tries to insert a new class with the name “ESS 2021.1 - Turma 1”
WHEN there is no class with the name “ESS 2021.1 - Turma 1” on the system
THEN I give it the unique identifier digit "3"
THEN store the new class in the system

Scenario: Successful removal of a class in the system
WHEN the account tries to delete a class with the name “ESS 2021.1 - Turma 1”, with the identifier digit "3"
THEN completely remove it from the storage