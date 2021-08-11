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
    WHEN(/I try to create a new class^$/, async() => {
        
    })
    WHEN(/^I fill the class name with “ESS 2021.1 - Turma 1$/, async() => {

    })
    WHEN(/^I fill the description with “Turma de Engenharia de Software e Sistemas do semestre letivo de 2021.1”$/, async() => {

    })
    THEN(/^I see a message informing me  that it was registered successfully$/, async() => {
        
    })
    THEN(/^I now see the class with the name “ESS 2021.1 - Turma 1” in the list of registered class$/, async() => {

    })
    WHEN(/^ $/, async() => {
        
    })
    WHEN(/^ $/, async() => {
        
    })
    WHEN(/^ $/, async() => {
        
    })
    WHEN(/^ $/, async() => {
        
    })


}