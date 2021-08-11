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
    GIVEN(/^I am at the “ESS 2021.1 - Turma 1” class detailed page$/, async() => {
        
    })
    GIVEN(/^I see "Carlos Magno", "João Paulo", "Maria Eugênia" in the students list$/, async() => {
        
    })
    WHEN(/^I add a new student with the name "Helena Torres"$/, async() => {
        
    })
    THEN(/^I can see "Carlos Magno", "Helena Torres", "João Paulo", "Maria Eugênia" in the students list$/, async() => {
        
    })
}