Feature: CRUD classes

SO THAT I can organize my classes and students
AS A teacher
I NEED a way to create, consult, remove and update classes in the system.

Background:
GIVEN I am already logged in my teacher level account with login “MarDam” and password “21@Dam#20”
AND I am in the classes page


Scenario: Teacher tries to create a new class
WHEN I try to create a new class
AND I fill the class name with “ESS 2021.1 - Turma 1”
AND I fill the description with “Turma de Engenharia de Software e Sistemas do semestre letivo de 2021.1”
THEN I see a message informing me  that it was registered successfully
AND I now see the class with the name “ESS 2021.1 - Turma 1” in the list of registered class

Scenario: Teacher tries to create a new class with the same name as another already registered class
AND  I see, in the list of classes, a class with the name “ESS 2021.1 - Turma 1”
WHEN I try to create a new class
AND I fill the class name with “ESS 2021.1 - Turma 1”
AND I fill the description with “Turma de Engenharia de Software e Sistemas do semestre letivo de 2021.1”
THEN I see a message informing me that it was not registered because there is already a class with that name
AND I see only one class with the name “ESS 2021.1 - Turma 1” (the one that was already registered) in the list of registered class


Scenario: Teacher tries to see more info about a class
AND I see, in the list of classes, a class with the name “ESS 2021.1 - Turma 1”
WHEN I enter the class “ESS 2021.1 - Turma 1” detailed page
THEN I see the description of the class
AND the list of students
AND their learning goals grades
AND options that let me insert new students
AND an option to delete the class
ATENÇÃO: Ainda não recebemos feedback do professor acerca do que deveria ser armazenado em uma turma, então isso aqui provavelmente vai mudar.

Scenario: Teacher tries to add new students to a registered class
AND I am at the “ESS 2021.1 - Turma 1” class detailed page
AND I see "Carlos Magno", "João Paulo", "Maria Eugênia" in the students list
WHEN I add a new student with the name "Helena Torres"
THEN I can see "Carlos Magno", "Helena Torres", "João Paulo", "Maria Eugênia" in the students list

Scenario: Teacher tries to add new learning goals to a registered class
AND I am at the “ESS 2021.1 - Turma 1” class detailed page
AND there is no learning goal registered
WHEN I register the following learning goals: "Requisitos", "Testes" and "Ger. de Configuração"
THEN I can now see that the learning goals of this class are "Requisitos", "Testes" and "Ger. de Configuração"
AND it is now possible for me to give each student their goal grade

Scenario: Teacher tries to delete a class
AND I see, in the list of classes, a class with the name “ESS 2021.1 - Turma 2”
WHEN I enter the class “ESS 2021.1 - Turma 2” detailed page
AND I choose the option to delete it
AND I say yes to the message that appeared asking me if i’m sure I want to delete it permanently
THEN I see a message informing me  that it was deleted successfully
AND I can no longer see a class named “ESS 2021.1 - Turma 2” in the list of registered classes.

Scenario: Teacher tries to remove a student from a registered class
AND I am at the “ESS 2021.1 - Turma 1” class detailed page
AND I see "Carlos Magno", "Helena Torres", "João Paulo", "Maria Eugênia" in the students list
WHEN I remove the student with the name "Helena Torres"
THEN I can see "Carlos Magno", "João Paulo", "Maria Eugênia" in the students list