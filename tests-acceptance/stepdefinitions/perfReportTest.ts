import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, WebDriver } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


defineSupportCode(function ({ Given, When, Then }) {

    Given(/^I am already logged in my teacher level account$/, async() =>
    {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='teacherBtn']").click();
    })
    Given(/^I am at the Performance Report page of turma "([^\"]*)"$/, async(nomeTurma) =>
    {
        await $("a[name='classesBtn']").click();
        await element(by.buttonText('Acessar Turma ' + nomeTurma)).click();
        await $("a[name='performance']").click();
    })
    

    When(/^I try to see the percentage of approved students$/, async(option) =>
    {
        element(by.cssContainingText('option', "Alunos Aprovados")).click();
        
    })
});