import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, WebDriver } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


//Função para turma
let sameTurmaName = ((elem, name) => elem.element(by.name('turmaNomeList')).getText().then(text => text === name));


//Funções para alunos
let sameAlunoName1 = ((elem, name) => elem.element(by.xpath('/html/body/app-root/alunos/html/table[3]/tr[2]/td[1]')).getText().then(text => text === name));
let sameAlunoName2 = ((elem, name) => elem.element(by.xpath('/html/body/app-root/alunos/html/table[3]/tr[3]/td[1]')).getText().then(text => text === name));
let sameAlunoCpf = ((elem, name) => elem.element(by.xpath('/html/body/app-root/alunos/html/table[3]/tr[2]/td[2]')).getText().then(text => text === name));
let sameAlunoEmail = ((elem, name) => elem.element(by.xpath('/html/body/app-root/alunos/html/table[3]/tr[2]/td[3]')).getText().then(text => text === name));
let sameAlunoGithub = ((elem, name) => elem.element(by.xpath('/html/body/app-root/alunos/html/table[3]/tr[2]/td[4]')).getText().then(text => text === name));





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
    When(/^I try to create a new class with the name "([^\"]*)" and description "([^\"]*)"$/, async(nomeTurma, descricao) => {
        await $("input[name='turmaNameBox']").sendKeys(<string>nomeTurma);
        await $("input[name='turmaDescriptionBox']").sendKeys(<string>descricao);
        await element(by.buttonText('Adicionar')).click();
    });

    Then(/^I now see the class with the name "([^\"]*)" in the list of registered classes$/, async(nomeTurma) => {
        var allTurmas : ElementArrayFinder = element.all(by.name('turmaList'));
        await allTurmas.filter(elem => sameTurmaName(elem,nomeTurma)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
    
    Given(/^I see the class with the name "([^\"]*)" in the list of registered classes$/, async(nomeTurma) => {
        await $("input[name='turmaNameBox']").sendKeys(<string>nomeTurma);
        await $("input[name='turmaDescriptionBox']").sendKeys(<string>"");
        await element(by.buttonText('Adicionar')).click();
        var allTurmas : ElementArrayFinder = element.all(by.name('turmaList'));
        await allTurmas.filter(elem => sameTurmaName(elem,nomeTurma)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });


    // delete
    When(/^I try to delete the class with the name "([^\"]*)"$/, async(nomeTurma) => {
        await element(by.buttonText('Deletar Turma: ' + nomeTurma)).click();
    });

    When(/^I say ok to the pop-up asking to confirm it$/, async() => {
        //driver.switchTo().alert().accept();
        //await element(by.xpath('//*[@id="mat-dialog-0"]/selector-file-type-dialog/div[2]/button[3]')).click();
    });

    Then(/^I can no longer see a class named "([^\"]*)" in the list of registered classes$/, async(nomeTurma) => {
        var allTurmas : ElementArrayFinder = element.all(by.name('turmaList'));
        await allTurmas.filter(elem => sameTurmaName(elem,nomeTurma)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    Then(/^I see a message informing me that it was not registered because there is already a class with that name$/, async() => {
        
        // await driver.isAlertPresent().then()
        //     driver.switchTo().alert().getText()
        //     expect (driver.getText().toBe("Nome duplicado! Turmas devem ter nomes únicos."));
    });

    Then(/^I see a message informing me that it was not registered because there is already 3 classes registered$/, async() => {
        // driver.switchTo().alert().accept();
    });

    Given(/^I am at the "([^\"]*)" class detailed page$/, async(nomeTurma) =>
    {
        await element(by.buttonText('Acessar Turma ' + nomeTurma)).click();
    });
    Given(/^I am at the alunos page$/, async() =>
    {
        await $("a[name='alunos']").click();
    });
    When(/^I add a new student with the name "([^\"]*)", cpf "([^\"]*)", e-mail "([^\"]*)" and github "([^\"]*)"$/, async(nome, cpf, email, git) =>
    {
        await $("input[name='namebox']").sendKeys(<string>nome);
        await $("input[name='cpfbox']").sendKeys(<string>cpf);
        await $("input[name='mailBox']").sendKeys(<string>email);
        await $("input[name='githubbox']").sendKeys(<string>git);
        await element(by.buttonText('Adicionar')).click();
    });
    

    Then(/^I see a student named "([^\"]*)", with cpf "([^\"]*)", e-mail "([^\"]*)" and github "([^\"]*)" in the students list$/, async(name, cpf, email, git) =>
    {
        var allNames : ElementArrayFinder = element.all(by.xpath('/html/body/app-root/alunos/html/table[3]/tr[2]/td[1]'));
        var allCpf : ElementArrayFinder = element.all(by.xpath('/html/body/app-root/alunos/html/table[3]/tr[2]/td[2]'));
        var allEmail : ElementArrayFinder = element.all(by.xpath('/html/body/app-root/alunos/html/table[3]/tr[2]/td[3]'));
        var allGithub : ElementArrayFinder = element.all(by.xpath('/html/body/app-root/alunos/html/table[3]/tr[2]/td[4]'));
        await allNames.filter(elem => sameAlunoName1(elem,name)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await allCpf.filter(elem => sameAlunoCpf(elem,cpf)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await allEmail.filter(elem => sameAlunoEmail(elem,email)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await allGithub.filter(elem => sameAlunoGithub(elem,git)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^I can see "([^\"]*)" in the students list first position$/, async(name) =>
    {
        
        var nameSearch : ElementArrayFinder = element.all(by.xpath('/html/body/app-root/alunos/html/table[3]/tr[2]/td[1]'));
        
        await nameSearch.filter(elem => sameAlunoName1(elem,name)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
    
    Then(/^I can see "([^\"]*)" in the students list second position$/, async(name) =>
    {
        
        var nameSearch : ElementArrayFinder = element.all(by.xpath('/html/body/app-root/alunos/html/table[3]/tr[3]/td[1]'));
        await nameSearch.filter(elem => sameAlunoName2(elem,name)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
    Then(/^I can no longer see "([^\"]*)" in the students list second position$/, async(name) =>
    {
        
        var nameSearch : ElementArrayFinder = element.all(by.xpath('/html/body/app-root/alunos/html/table[3]/tr[3]/td[1]'));
        await nameSearch.filter(elem => sameAlunoName2(elem,name)).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    Then(/^I enter the learning goals page$/, async() =>
    {
        await $("a[name='metas']").click();
    });

    When(/^I register the following learning goals: "([^\"]*)", "([^\"]*)" and "([^\"]*)"$/, async (m1,m2,m3) =>
    {
        await $("input[name='novaMetaBox']").sendKeys(<string>m1);
        await element(by.buttonText('Adicionar Meta')).click();
        await $("input[name='novaMetaBox']").sendKeys(<string>m2);
        await element(by.buttonText('Adicionar Meta')).click();
        await $("input[name='novaMetaBox']").sendKeys(<string>m3);
        await element(by.buttonText('Adicionar Meta')).click();
        
    });
    Then(/^I can now see that the learning goals of this class are "([^\"]*)", "([^\"]*)" and "([^\"]*)"$/, async(m1,m2,m3) =>
    {
        //verificar as metas
        var allNames : ElementArrayFinder = element.all(by.name('nomelist'));
    });
    Then(/^it is now possible for me to give each student their goal grade$/, async() =>
    {
        //verificar existencia de box
    })

    Given(/^I see "([^\"]*)", "([^\"]*)", "([^\"]*)", "([^\"]*)" in the students list$/, async(a1, a2, a3, a4) =>
    {

    })
    When(/^I remove the student in the second position$/, async() =>
    {
        await element(by.xpath('/html/body/app-root/alunos/html/table[3]/tr[3]/td[5]/button')).click();
    })
    Then(/^I can see "([^\"]*)", "([^\"]*)", "([^\"]*)" in the students list$/, async(a1,a2,a3) =>
    {
        
    })


});