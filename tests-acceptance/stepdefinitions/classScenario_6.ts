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
    GIVEN(/^there is no learning goal registered$/, async() => {
        
    })
    WHEN(/^I register the following learning goals: "Requisitos", "Testes" and "Ger. de Configuração"$/, async() => {
        
    })
    THEN(/^I can now see that the learning goals of this class are "Requisitos", "Testes" and "Ger. de Configuração"$/, async() => {
        
    })
    THEN(/^it is now possible for me to give each student their goal grade$/, async() => {
        
    })
}