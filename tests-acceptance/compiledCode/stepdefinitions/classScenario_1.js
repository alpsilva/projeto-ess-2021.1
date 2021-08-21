"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
require("selenium-webdriver");
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
//Declaração do WebDriver (usado para lidar com alertas)
const { Builder, By, until } = require('selenium-webdriver');
let driver = new Builder()
    .forBrowser('firefox')
    .build();
//Função para turma
let sameTurmaName = ((elem, name) => elem.element(protractor_1.by.name('turmaNomeList')).getText().then(text => text === name));
//Funções para alunos
let sameAlunoName = ((elem, name) => elem.element(protractor_1.by.name('nomelist')).getText().then(text => text === name));
let sameAlunoCpf = ((elem, name) => elem.element(protractor_1.by.name('cpflist')).getText().then(text => text === name));
let sameAlunoEmail = ((elem, name) => elem.element(protractor_1.by.name('emaillist')).getText().then(text => text === name));
let sameAlunoGithub = ((elem, name) => elem.element(protractor_1.by.name('githublist')).getText().then(text => text === name));
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am already logged in as a teacher$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('TaGui');
        yield protractor_1.$("a[name='teacherBtn']").click();
    }));
    Given(/^I am in the classes page$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("a[name='classesBtn']").click();
    }));
    //Scenario: teacher tries to create a new class
    When(/^I try to create a new class with the name "([^\"]*)" and description "([^\"]*)"$/, (nomeTurma, descricao) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("input[name='turmaNameBox']").sendKeys(nomeTurma);
        yield protractor_1.$("input[name='turmaDescriptionBox']").sendKeys(descricao);
        yield protractor_1.element(protractor_1.by.buttonText('Adicionar')).click();
    }));
    Then(/^I now see the class with the name "([^\"]*)" in the list of registered classes$/, (nomeTurma) => __awaiter(this, void 0, void 0, function* () {
        var allTurmas = protractor_1.element.all(protractor_1.by.name('turmaList'));
        yield allTurmas.filter(elem => sameTurmaName(elem, nomeTurma)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    Given(/^I see the class with the name "([^\"]*)" in the list of registered classes$/, (nomeTurma) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("input[name='turmaNameBox']").sendKeys(nomeTurma);
        yield protractor_1.$("input[name='turmaDescriptionBox']").sendKeys("");
        yield protractor_1.element(protractor_1.by.buttonText('Adicionar')).click();
        var allTurmas = protractor_1.element.all(protractor_1.by.name('turmaList'));
        yield allTurmas.filter(elem => sameTurmaName(elem, nomeTurma)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    // delete
    When(/^I try to delete the class with the name "([^\"]*)"$/, (nomeTurma) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText('Deletar Turma: ' + nomeTurma)).click();
    }));
    When(/^I say ok to the pop-up asking to confirm it$/, () => __awaiter(this, void 0, void 0, function* () {
        //driver.switchTo().alert().accept();
    }));
    Then(/^I can no longer see a class named "([^\"]*)" in the list of registered classes$/, (nomeTurma) => __awaiter(this, void 0, void 0, function* () {
        var allTurmas = protractor_1.element.all(protractor_1.by.name('turmaList'));
        yield allTurmas.filter(elem => sameTurmaName(elem, nomeTurma)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    }));
    Then(/^I see a message informing me that it was not registered because there is already a class with that name$/, () => __awaiter(this, void 0, void 0, function* () {
        // await driver.isAlertPresent().then()
        //     driver.switchTo().alert().getText()
        //     expect (driver.getText().toBe("Nome duplicado! Turmas devem ter nomes únicos."));
    }));
    Then(/^I see a message informing me that it was not registered because there is already 3 classes registered$/, () => __awaiter(this, void 0, void 0, function* () {
        // driver.switchTo().alert().accept();
    }));
    Given(/^I am at the "([^\"]*)" class detailed page$/, (nomeTurma) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText('Acessar Turma ' + nomeTurma)).click();
    }));
    When(/^I add a new student with the name "([^\"]*)", cpf "([^\"]*)", e-mail "([^\"]*)" and github "([^\"]*)"$/, (nome, cpf, email, git) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("a[name='alunos']").click();
        yield protractor_1.$("input[name='namebox']").sendKeys(nome);
        yield protractor_1.$("input[name='cpfbox']").sendKeys(cpf);
        yield protractor_1.$("input[name='mailBox']").sendKeys(email);
        yield protractor_1.$("input[name='githubbox']").sendKeys(git);
        yield protractor_1.element(protractor_1.by.buttonText('Adicionar')).click();
    }));
    Then(/^I see a student named "([^\"]*)", with cpf "([^\"]*)", e-mail "([^\"]*)" and github "([^\"]*)" in the students list$/, (name, cpf, email, git) => __awaiter(this, void 0, void 0, function* () {
        var allNames = protractor_1.element.all(protractor_1.by.name('nomelist'));
        var allCpf = protractor_1.element.all(protractor_1.by.name('cpflist'));
        var allEmail = protractor_1.element.all(protractor_1.by.name('email'));
        var allGithub = protractor_1.element.all(protractor_1.by.name('githublist'));
        yield allNames.filter(elem => sameAlunoName(elem, name)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allCpf.filter(elem => sameAlunoCpf(elem, cpf)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allEmail.filter(elem => sameAlunoEmail(elem, email)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield allGithub.filter(elem => sameAlunoGithub(elem, git)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    Then(/^I can see "([^\"]*)" and "([^\"]*)" in the students list$/, (a1, a2) => __awaiter(this, void 0, void 0, function* () {
        var allNames = protractor_1.element.all(protractor_1.by.name('nomelist'));
        yield allNames.filter(elem => sameAlunoName(elem, a1)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        ;
        yield allNames.filter(elem => sameAlunoName(elem, a2)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        ;
    }));
    Then(/^I enter the learning goals page$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("a[name='metas']").click();
    }));
    When(/^I register the following learning goals: "([^\"]*)", "([^\"]*)" and "([^\"]*)"$/, (m1, m2, m3) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("input[name='novaMetaBox']").sendKeys(m1);
        yield protractor_1.element(protractor_1.by.buttonText('Adicionar Meta')).click();
        yield protractor_1.$("input[name='novaMetaBox']").sendKeys(m2);
        yield protractor_1.element(protractor_1.by.buttonText('Adicionar Meta')).click();
        yield protractor_1.$("input[name='novaMetaBox']").sendKeys(m3);
        yield protractor_1.element(protractor_1.by.buttonText('Adicionar Meta')).click();
    }));
    Then(/^I can now see that the learning goals of this class are "([^\"]*)", "([^\"]*)" and "([^\"]*)"$/, (m1, m2, m3) => __awaiter(this, void 0, void 0, function* () {
        //verificar as metas
        var allNames = protractor_1.element.all(protractor_1.by.name('nomelist'));
    }));
    Then(/^it is now possible for me to give each student their goal grade$/, () => __awaiter(this, void 0, void 0, function* () {
        //verificar existencia de box
    }));
    Given(/^I see "([^\"]*)", "([^\"]*)", "([^\"]*)", "([^\"]*)" in the students list$/, (a1, a2, a3, a4) => __awaiter(this, void 0, void 0, function* () {
    }));
    When(/^I remove the student with the name "([^\"]*)"$/, (aluno) => __awaiter(this, void 0, void 0, function* () {
    }));
    Then(/^I can see "([^\"]*)", "([^\"]*)", "([^\"]*)" in the students list$/, (a1, a2, a3) => __awaiter(this, void 0, void 0, function* () {
    }));
});
