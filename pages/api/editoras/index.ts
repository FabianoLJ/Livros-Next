
import { NextApiRequest, NextApiResponse } from "next";
import { ControleEditora } from "../../../classes/controle/ControleEditora"; 

export const controleEditora = new ControleEditora(); 


export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const editoras = controleEditora.getEditoras(); // c
        res.status(200).json(editoras); 
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." }); 
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]); 
      res.status(405).end(`Método ${req.method} não permitido.`); 
  }
};