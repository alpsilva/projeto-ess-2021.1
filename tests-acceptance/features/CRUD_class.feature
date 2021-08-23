Feature: CRUD classes

SO THAT I can organize my classes and students
AS A teacher
I NEED a way to create, consult, remove and update classes in the system.

Background:
Given I am already logged in as a teacher
Given I am in the classes page


Scenario: Teacher tries to create a new class
When I try to create a new class with the name "ESS - Turma Um" and description "Turma de Engenharia de Software e Sistemas do semestre letivo de 2021.1"
Then I now see the class with the name "ESS - Turma Um" in the list of registered classes

Scenario: Teacher tries to create a new class with the same name as another already registered class
When I try to create a new class with the name "ESS - Turma Um" and description "Turma 2 de Engenharia de Software e Sistemas do semestre letivo de 2021.1"
Then I see a message informing me that it was not registered because there is already a class with that name
Then I now see the class with the name "ESS - Turma Um" in the list of registered classes

Scenario: Teacher tries to delete a class
When I try to delete the class with the name "ESS - Turma Um"
When I say ok to the pop-up asking to confirm it
Then I can no longer see a class named "ESS - Turma Um" in the list of registered classes

Scenario: Teacher tries to create more than three classes
Given  I see the class with the name "ESS - Turma Um" in the list of registered classes
Given  I see the class with the name "Top. Avançados ESS" in the list of registered classes
Given  I see the class with the name "Qualidade de Software" in the list of registered classes
When I try to create a new class with the name "Seminários SaaS" and description "Seminários de software as a service do semestre letivo de 2021.1"
Then I see a message informing me that it was not registered because there is already 3 classes registered
Then I now see the class with the name "ESS - Turma Um" in the list of registered classes
Then I now see the class with the name "Top. Avançados ESS" in the list of registered classes
Then I now see the class with the name "Qualidade de Software" in the list of registered classes

Scenario: Teacher tries to add new students to a registered class
Given I am at the "ESS - Turma Um" class detailed page
Given I am at the alunos page
When I add a new student with the name "Carlos Magno", cpf "4442", e-mail "carlosmcin.ufpe.br" and github "carlo"
Then I see a student named "Carlos Magno", with cpf "4442", e-mail "carlosmcin.ufpe.br" and github "carlo" in the students list
When I add a new student with the name "Helena Torres", cpf "1002", e-mail "helenacin.ufpe" and github "helenaT"
Then I can see "Carlos Magno" in the students list first position
Then I can see "Helena Torres" in the students list second position

Scenario: Teacher tries to add new learning goals to a registered class
Given I am at the "ESS - Turma Um" class detailed page
Then I enter the learning goals page
When I register the following learning goals: "Requisitos", "Testes" and "Ger. de Configuração"
Then I can now see that the learning goals of this class are "Requisitos", "Testes" and "Ger. de Configuração"
Then it is now possible for me to give each student their goal grade

Scenario: Teacher tries to remove a student from a registered class
Given I am at the "ESS - Turma Um" class detailed page
Given I am at the alunos page
Then I can see "Carlos Magno" in the students list first position
Then I can see "Helena Torres" in the students list second position
When  I add a new student with the name "João Paulo", cpf "4441", e-mail "joaop.ufpe.br" and github "jp"
When I add a new student with the name "Maria Eugênia", cpf "5555", e-mail "marieug.ufpe.br" and github "eugm"
When I remove the student in the second position
Then I can no longer see "Helena Torres" in the students list second position