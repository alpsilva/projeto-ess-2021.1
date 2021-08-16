import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, WebDriver } from 'protractor';
import 'selenium-webdriver';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

//Declaração do WebDriver (usado para lidar com alertas)
const {Builder, By, until} = require('selenium-webdriver');
let driver = new Builder()
    .forBrowser('firefox')
    .build();

//Função para turma
let sameTurmaName = ((elem, name) => elem.element(by.name('turmaNomeList')).getText().then(text => text === name));


//Funções para alunos
let sameAlunoName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));
let sameAlunoCpf = ((elem, name) => elem.element(by.name('cpflist')).getText().then(text => text === name));
let sameAlunoEmail = ((elem, name) => elem.element(by.name('emaillist')).getText().then(text => text === name));
let sameAlunoGithub = ((elem, name) => elem.element(by.name('githublist')).getText().then(text => text === name));





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
    });

    Then(/^I see a message informing me that it was not registered because there is already 3 classes registered$/, async(nomeTurma) => {
        driver.switchTo().alert().accept();
    });

    Given(/^I am at the “([^\"]*)” class detailed page$/, async(nomeTurma) =>
    {
        await element(by.buttonText('Acessar Turma ' + nomeTurma)).click();
    });

    When(/^I add a new student with the name “([^\"]*)”, cpf “([^\"]*)”, e-mail “([^\"]*)” and github “([^\"]*)”$/, async(nome, cpf, email, git) =>
    {
        await $("a[name='alunos']").click();
        await $("input[name='namebox']").sendKeys(<string>nome);
        await $("input[name='cpfbox']").sendKeys(<string>cpf);
        await $("input[name='mailBox']").sendKeys(<string>email);
        await $("input[name='githubbox']").sendKeys(<string>git);
        await element(by.buttonText('Adicionar')).click();
    });

    Then(/^I see a student named “([^\"]*)”, with cpf “([^\"]*)”, e-mail “([^\"]*)” and github “([^\"]*)” in the students list$/, async(name, cpf, email, git) =>
    {
        var allNames : ElementArrayFinder = element.all(by.name('nomelist'));
        var allCpf : ElementArrayFinder = element.all(by.name
        ('cpflist'));
        var allEmail : ElementArrayFinder = element.all(by.name
        ('email'));
        var allGithub : ElementArrayFinder = element.all(by.name
        ('githublist'));
        await allNames.filter(elem => sameAlunoName(elem,name)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await allCpf.filter(elem => sameAlunoCpf(elem,cpf)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await allEmail.filter(elem => sameAlunoEmail(elem,email)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await allGithub.filter(elem => sameAlunoGithub(elem,git)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    
    Then(/^I can see “([^\"]*)” and “([^\"]*)” in the students list$/, async(a1,a2) =>
    {
        var allNames : ElementArrayFinder = element.all(by.name('nomelist'));
        await allNames.filter(elem => sameAlunoName(elem,a1)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));;
        await allNames.filter(elem => sameAlunoName(elem,a2)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));;
    });

    Given(/^there is no learning goal registered$/, async() =>
    {
        
    });

});
