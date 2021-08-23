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
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am already logged in my teacher level account$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('TaGui');
        yield protractor_1.$("a[name='teacherBtn']").click();
    }));
    Given(/^I am at the Performance Report page of turma "([^\"]*)"$/, (nomeTurma) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("a[name='classesBtn']").click();
        yield protractor_1.element(protractor_1.by.buttonText('Acessar Turma ' + nomeTurma)).click();
        yield protractor_1.$("a[name='performance']").click();
    }));
    When(/^I try to see the percentage of approved students$/, (option) => __awaiter(this, void 0, void 0, function* () {
        protractor_1.element(protractor_1.by.cssContainingText('option', "Alunos Aprovados")).click();
    }));
    Then(/^I can see "([^\"]*)", "([^\"]*)", "([^\"]*)" in the students list$/, (a1, a2, a3) => __awaiter(this, void 0, void 0, function* () {
    }));
});
