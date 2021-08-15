import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, WebDriver } from 'protractor';
import 'selenium-webdriver';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameTurmaName = ((elem, name) => elem.element(by.name('turmaNomeList')).getText().then(text => text === name));
const {Builder, By, until} = require('selenium-webdriver');

let driver = new Builder()
    .forBrowser('firefox')
    .build();



defineSupportCode(function ({ Given, When, Then }) {

    Given(/^I am already logged in as a teacher$/, async() => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='teacherBtn']").click();
    
    });

    Given(/^I am in the classes page$/, async() => {
        await $("a[name='classesBtn']").click();
    });
    //Scenario: teacher tries to create a new class
    When(/^I try to create a new class with the name “([^\"]*)” and description “([^\"]*)”$/, async(nomeTurma, descricao) => {
        await $("input[name='turmaNameBox']").sendKeys(<string>nomeTurma);
        await $("input[name='turmaDescriptionBox']").sendKeys(<string>descricao);
        await element(by.buttonText('Adicionar')).click();
    });

    Then(/^I now see the class with the name “([^\"]*)” in the list of registered classes$/, async(nomeTurma) => {
        var allTurmas : ElementArrayFinder = element.all(by.name('turmaList'));
        await allTurmas.filter(elem => sameTurmaName(elem,nomeTurma)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
    
    Given(/^I see the class with the name “([^\"]*)” in the list of registered classes$/, async(nomeTurma) => {
        await $("input[name='turmaNameBox']").sendKeys(<string>nomeTurma);
        await $("input[name='turmaDescriptionBox']").sendKeys(<string>"");
        await element(by.buttonText('Adicionar')).click();
        var allTurmas : ElementArrayFinder = element.all(by.name('turmaList'));
        await allTurmas.filter(elem => sameTurmaName(elem,nomeTurma)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });


    // delete
    When(/^I try to delete the class with the name “([^\"]*)”$/, async(nomeTurma) => {
        await element(by.buttonText('Deletar Turma: ' + nomeTurma)).click();
    });

    When(/^I say ok to the pop-up asking to confirm it$/, async(nomeTurma) => {
        driver.switchTo().alert().accept();
    });

    Then(/^I can no longer see a class named “([^\"]*)” in the list of registered classes$/, async(nomeTurma) => {
        var allTurmas : ElementArrayFinder = element.all(by.name('turmaList'));
        await allTurmas.filter(elem => sameTurmaName(elem,nomeTurma)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    Then(/^I see a message informing me that it was not registered because there is already a class with that name$/, async(nomeTurma) => {
        
        await driver.isAlertPresent().then()
            driver.switchTo().alert().getText()
            expect (driver.getText().toBe("Nome duplicado! Turmas devem ter nomes únicos."));
        // lidar com o alert
    });

    Then(/^I see a message informing me that it was not registered because there is already 3 classes registered$/, async(nomeTurma) => {
        driver.switchTo().alert().accept();
        //lidar com o alert
    });

    

});
