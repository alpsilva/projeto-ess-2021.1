import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';

defineSupportCode(function ({ GIVEN, WHEN, THEN }) {
    GIVEN(/^I am already logged in my teacher level account with login “MarDam” and password “21@Dam#20”$/, async() => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='teacherBtn']").click();
    
    })
    GIVEN(/^I am in the classes page$/, async() => {
        await $("a[name='classesBtn']").click();
    })
    GIVEN(/^I see, in the list of classes, a class with the name “ESS 2021.1 - Turma 1”$/, async() => {
        
    })
    WHEN(/^I enter the class “ESS 2021.1 - Turma 1” detailed page$/, async() => {
        
    })
    THEN(/^I see the description of the class$/, async() => {
        
    })
    THEN(/^the list of students$/, async() => {
        
    })
    THEN(/^their learning goals grades$/, async() => {
        
    })
    THEN(/^options that let me insert new students$/, async() => {
        
    })
    THEN(/^an option to delete the class$/, async() => {
        
    })
}