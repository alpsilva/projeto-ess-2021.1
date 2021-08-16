export class Aluno {
  nome: string;
  cpf: string;
  email: string;
  github: string;
  metas: Map<string,string>;
  tuplaMetas: [string, string][];

  constructor() {
    this.clean();
  }

  clean(): void {
    this.nome = "";
    this.cpf = "";
    this.email = "";
    this.github = "";
    this.metas = new Map<string,string>();
    this.tuplaMetas = [];
  }

  clone(): Aluno {
    var aluno: Aluno = new Aluno();
    aluno.copyFrom(this);
    return aluno;
  }

  copyFrom(from: Aluno): void {
    this.nome = from.nome;
    this.cpf = from.cpf;
    this.email = from.email;
    this.github = from.github;
    this.copyMetasFrom(from.metas);
    this.tuplaMetas = from.tuplaMetas;
  }

  copyMetasFrom(from: Map<string,string>): void {
    this.metas = new Map<string,string>(from);
  }

  getMetas(): [string, string][] {
    var result: [string, string][] = [];
    var metas: Map<string, string> = this.metas;
    console.log(metas.keys().next());
    for (let key in metas) {
      console.log(key);
    }
    for (let m of metas) {
      console.log("Teste");
      result.push([m[0], m[1]]);
    }
    return result;
  }
}