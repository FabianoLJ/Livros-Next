
import { NextApiRequest, NextApiResponse } from "next";
import { controleLivro } from "."; 


export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "DELETE":
      try {
        const codigo = parseInt(req.query.codigo as string);
        controleLivro.excluir(codigo); 
        res.status(200).json({ message: "Livro excluído com sucesso!" }); 
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao excluir o livro." }); 
      }
      break;

    default:
      res.setHeader("Allow", ["DELETE"]); 
      res.status(405).end(`Método ${req.method} não permitido.`); 
  }
};