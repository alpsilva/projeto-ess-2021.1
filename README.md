ESS - 2020.2
===
Repositório para desenvolvimento do projeto e roteiro da disciplina Engenharia de Software e Sistemas.
---
---
### **Features:** Turmas

- Cadastro e manutenção de turmas (inserir, remover, atualizar) **(Peso 2)**  
- Relatório de desempenho da turma (percentuais de alunos que passou por média, vai para a final, foi reprovado por nota, etc.) **(Peso 1)** 

### **Alunos:**

- André Luiz
- Breno Rodrigues
- Pietro Masur

### **Instruções de uso via git clone:**
- **Passo 0**
  * Verifique sua versão do node, no mínimo: `7.19.0`
  * Caso não saiba, em um terminal execute: `npm --version`
  * Verifique sua versão do Angular, no mínimo: `12.1.0`
  * Caso não saiba, em um terminal execute: `ng --version`
- **GUI**
  * Após clonar o repositório, em um terminal vá para a pasta `/ta-gui`
  * Execute: `npm install`
  * Então: `npm start`
- **Servidor**
  * Em um terminal vá para a pasta `/ta-server`
  * Execute: `npm install`
  * Então: `npm start`
- **Voilá**
  * O sistema já deve estar funcionando!!!
  * No seu navegador, vá para: [localhost:4200](http://localhost:4200)

### **Instruções para testes automáticos:**
- **Passo 0**
  * Troque para a branch de testes
  * Ver [Passo 0](https://github.com/alpsilva/projeto-ess-2021.1#instru%C3%A7%C3%B5es-de-uso-via-git-clone) do uso via git clone
- **Iniciar GUI e Servidor**
  * Da mesma forma que nas [instruções de uso via git clone](https://github.com/alpsilva/projeto-ess-2021.1#instru%C3%A7%C3%B5es-de-uso-via-git-clone)
- **Testes**
  * Em um terminal:
    - Vá para a pasta `/testes-acceptance`
    - Execute: `npm install`
    - Atualize o webdriver com: `npm run webdriver-update`
    - Inicie o webdriver: `npm run webdriver-start`
  * Em outro terminal:
    - Vá para a pasta `/testes-acceptance`
    - Execute os testes com: `npm test`
