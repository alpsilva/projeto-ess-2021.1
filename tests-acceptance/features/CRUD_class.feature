Feature: CRUD classes

SO THAT I can organize my classes and students
AS A teacher
I NEED a way to create, consult, remove and update classes in the system.

Background:
Given I am already logged in as a teacher
Given I am in the classes page


Scenario: Teacher tries to create a new class
When I try to create a new class with the name “ESS 2021.1 - Turma 1” and description “Turma de Engenharia de Software e Sistemas do semestre letivo de 2021.1”
Then I now see the class with the name “ESS 2021.1 - Turma 1” in the list of registered classes

Scenario: Teacher tries to create a new class with the same name as another already registered class
Given  I see the class with the name “ESS 2021.1” in the list of registered classes
When I try to create a new class with the name “ESS 2021.1” and description “Turma 2 de Engenharia de Software e Sistemas do semestre letivo de 2021.1”
Then I see a message informing me that it was not registered because there is already a class with that name
Then I now see the class with the name “ESS 2021.1 - Turma 1” in the list of registered classes

Scenario: Teacher tries to create more than three classes
Given  I see the class with the name “ESS 2021.1 - Turma 1” in the list of registered classes
Given  I see the class with the name “Top. Avançados ESS” in the list of registered classes
Given  I see the class with the name “Qualidade de Software” in the list of registered classes
When I try to create a new class with the name “Seminários SaaS” and description “Seminários de software as a service do semestre letivo de 2021.1”
Then I see a message informing me that it was not registered because there is already 3 classes registered
Then I now see the class with the name “ESS 2021.1 - Turma 1” in the list of registered classes
Then I now see the class with the name “Top. Avançados ESS” in the list of registered classes
Then I now see the class with the name “Qualidade de Software” in the list of registered classes

Scenario: Teacher tries to see more info about a class
GIVEN I see, in the list of classes, a class with the name “ESS 2021.1 - Turma 1”
WHEN I enter the class “ESS 2021.1 - Turma 1” detailed page
THEN I see the description of the class
THEN the list of students
THEN their learning goals grades
THEN options that let me insert new students
THEN an option to delete the class
ATENÇÃO: Ainda não recebemos feedback do professor acerca do que deveria ser armazenado em uma turma, então isso aqui provavelmente vai mudar.

Scenario: Teacher tries to add new students to a registered class
GIVEN I am at the “ESS 2021.1 - Turma 1” class detailed page
GIVEN I see "Carlos Magno", "João Paulo", "Maria Eugênia" in the students list
WHEN I add a new student with the name "Helena Torres"
THEN I can see "Carlos Magno", "Helena Torres", "João Paulo", "Maria Eugênia" in the students list

Scenario: Teacher tries to add new learning goals to a registered class
GIVEN I am at the “ESS 2021.1 - Turma 1” class detailed page
GIVEN there is no learning goal registered
WHEN I register the following learning goals: "Requisitos", "Testes" and "Ger. de Configuração"
THEN I can now see that the learning goals of this class are "Requisitos", "Testes" and "Ger. de Configuração"
THEN it is now possible for me to give each student their goal grade

Scenario: Teacher tries to delete a class
GIVEN I see, in the list of classes, a class with the name “ESS 2021.1 - Turma 2”
WHEN I enter the class “ESS 2021.1 - Turma 2” detailed page
WHEN I choose the option to delete it
WHEN I say yes to the message that appeared asking me if i’m sure I want to delete it permanently
THEN I see a message informing me  that it was deleted successfully
THEN I can no longer see a class named “ESS 2021.1 - Turma 2” in the list of registered classes.

Scenario: Teacher tries to remove a student from a registered class
GIVEN I am at the “ESS 2021.1 - Turma 1” class detailed page
GIVEN I see "Carlos Magno", "Helena Torres", "João Paulo", "Maria Eugênia" in the students list
WHEN I remove the student with the name "Helena Torres"
THEN I can see "Carlos Magno", "João Paulo", "Maria Eugênia" in the students list