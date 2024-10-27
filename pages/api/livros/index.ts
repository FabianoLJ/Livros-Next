
import { NextApiRequest, NextApiResponse } from "next";
import { ControleLivro } from "../../../classes/controle/ControleLivros"; 

export const controleLivro = new ControleLivro(); 


export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const livros = controleLivro.obterLivros(); 
        res.status(200).json(livros); 
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." }); 
      }
      break;

    case "POST":
      try {
        const novoLivro = req.body; 
        controleLivro.incluir(novoLivro); 
        res.status(200).json({ message: "Livro adicionado com sucesso!" }); 
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao adicionar o livro." }); 
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]); 
      res.status(405).end(`Método ${req.method} não permitido.`); 
  }
};