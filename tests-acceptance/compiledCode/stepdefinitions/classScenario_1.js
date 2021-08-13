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
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let sameTurmaName = ((elem, name) => elem.element(protractor_1.by.name('turmaNomeList')).getText().then(text => text === name));
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am already logged in as a teacher$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('TaGui');
        yield protractor_1.$("a[name='teacherBtn']").click();
    }));
    Given(/^I am in the classes page$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("a[name='classesBtn']").click();
    }));
    When(/^I try to create a new class with the name “([^\"]*)” and description “([^\"]*)”$/, (nomeTurma, descricao) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("input[name='turmaNameBox']").sendKeys(nomeTurma);
        yield protractor_1.$("input[name='turmaDescriptionBox']").sendKeys(descricao);
        yield protractor_1.element(protractor_1.by.buttonText('Adicionar')).click();
    }));
    Then(/^I now see the class with the name “([^\"]*)” in the list of registered classes$/, (nomeTurma) => __awaiter(this, void 0, void 0, function* () {
        var allTurmas = protractor_1.element.all(protractor_1.by.name('turmaList'));
        yield allTurmas.filter(elem => sameTurmaName(elem, nomeTurma)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    Given(/^I see the class with the name “([^\"]*)” in the list of registered classes$/, (nomeTurma) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("input[name='turmaNameBox']").sendKeys(nomeTurma);
        yield protractor_1.$("input[name='turmaDescriptionBox']").sendKeys("");
        yield protractor_1.element(protractor_1.by.buttonText('Adicionar')).click();
        var allTurmas = protractor_1.element.all(protractor_1.by.name('turmaList'));
        yield allTurmas.filter(elem => sameTurmaName(elem, nomeTurma)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    // delete
    When(/^I try to delete the class with the name “([^\"]*)”$/, (nomeTurma) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText('Deletar Turma: ' + nomeTurma)).click();
    }));
    When(/^I say ok to the pop-up asking to confirm it$/, (nomeTurma) => __awaiter(this, void 0, void 0, function* () {
        // lidar com a confirmação
    }));
    Then(/^I can no longer see a class named “([^\"]*)” in the list of registered classes$/, (nomeTurma) => __awaiter(this, void 0, void 0, function* () {
        var allTurmas = protractor_1.element.all(protractor_1.by.name('turmaList'));
        yield allTurmas.filter(elem => sameTurmaName(elem, nomeTurma)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    }));
    Then(/^I see a message informing me that it was not registered because there is already a class with that name$/, (nomeTurma) => __awaiter(this, void 0, void 0, function* () {
        //lidar com o alert
    }));
    Then(/^I see a message informing me that it was not registered because there is already 3 classes registered$/, (nomeTurma) => __awaiter(this, void 0, void 0, function* () {
        //lidar com o alert
    }));
});
