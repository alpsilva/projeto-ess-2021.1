Feature: Performance Report in internal system
  SO THAT the project could be able to show performance info
  AS the system
  I should be able to retrieve data
  And should be able to analyse data
  
  Background:
    Given a teacher level account for teacher "Marcelo" is logged on
    And the account can see all existing classes

  Scenario: Successfull loading of data
    When the account tries to see the performance of a class with unique identifier "3"
    Then I receive the data about the class with the unique identifier "3"
    And I create a table with the grades of every student account on this class
    And I compare those grades between them
    And I show it to the teacher account

  Scenario: Unsuccessfull loading of data
    When the account tries to see the performance of a class with unique identifier "5"
    And the class with unique identifier does not exist
    Then I send an error message