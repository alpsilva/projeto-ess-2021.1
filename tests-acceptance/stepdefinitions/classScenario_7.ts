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
    GIVEN(/^I see, in the list of classes, a class with the name “ESS 2021.1 - Turma 2”$/, async() => {
        
    })
    WHEN(/^I enter the class “ESS 2021.1 - Turma 2” detailed page$/, async() => {
        
    })
    WHEN(/^I choose the option to delete it$/, async() => {
        
    })
    WHEN(/^I say yes to the message that appeared asking me if i’m sure I want to delete it permanently$/, async() => {
        
    })
    THEN(/^I see a message informing me  that it was deleted successfully$/, async() => {
        
    })
    THEN(/^I can no longer see a class named “ESS 2021.1 - Turma 2” in the list of registered classes.$/, async() => {
        
    })
}