Feature: Performance Report as teacher
  SO THAT I can monitorate my classes and students performance
  AS a teacher named "Marcelo"
  I NEED a way to watch the percentages of students approved, not approved or in the final exams

  Background:
    Given I am already logged in my teacher level account
    And I am in the "Performance Report" page

  Scenario: Teacher tries to see the percentage of approved students on class
    When I try to see the percentage of approved students
    Then I see the "Class performance comparison graph"


  Scenario Outline: Teacher tries to see the number of approved students on class
    When I try to see the number of approved students
    Then I see the number <approved> of approved students
    And I see the number <total> of total students
    And I see the "Students performance list"
    Examples:
      |approved|onFinal|disapproved|total|
      |25      |12     |10         |47   |

  Scenario Outline: Teacher tries to see the number of students on final exam on class
    When I try to see the number of students on final exam
    Then I see the number <onFinal> of students on final exam
    And I see the number <total> of total students
    And I see the "Students performance list"
    Examples:
      |approved|onFinal|disapproved|total|
      |25      |12     |10         |47   |

  Scenario Outline: Teacher tries to see the number of disapproved students on class
    When I try to see the number of disapproved students
    Then I see the number <disapproved> of disapproved students
    And I see the number <total> of total students
    And I see the "Students performance list"
    Examples:
      |approved|onFinal|disapproved|total|
      |25      |12     |10         |47   |
