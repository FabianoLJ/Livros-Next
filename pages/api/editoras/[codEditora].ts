
import { NextApiRequest, NextApiResponse } from "next";
import { controleEditora } from "."; // f


export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const codEditora = parseInt(req.query.codEditora as string); 
        const nome = controleEditora.getNomeEditora(codEditora); 

        if (nome) {
          res.status(200).json({ nome }); 
        } else {
          res.status(404).json({ message: "Editora não encontrada." }); 
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." }); 
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]); // i
      res.status(405).end(`Método ${req.method} não permitido.`); 
  }
};