Feature: Performance Report as student
  AS a student named "Breno"
  I NEED a way to monitorate my performance

  Background:
    Given I am already logged in my student level account
    And I am in the "Performance Report" page

  Scenario Outline: Student tries to see his grades
    When I try to see my grades
    Then I see my name highlighted in <color>
    And my grades
    And a <gradeMessage> message by the side
    Examples:
      | color  | gradeMessage |
      | green  |   approved   |
      | yellow |   on final   |
      | green  | disapproved  |
