export class ControleEditora {
  private editoras = [
      { codEditora: 1, nome: "Alta Books" },
      { codEditora: 2, nome: "Bookman" },
      { codEditora: 3, nome: "Addison Wesley" },
      { codEditora: 4, nome: "Pearson" }
  ];

  public getEditoras() {
      return this.editoras;
  }

  public getNomeEditora(codEditora: number) {
      const editora = this.editoras.find(e => e.codEditora === codEditora);
      return editora ? editora.nome : null;
  }
}
