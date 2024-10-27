import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import ControleLivro from "./ControleLivros";
import ControleEditora from "./ControleEditora";

const controleLivro = new ControleLivro(); 
const controleEditora = new ControleEditora(); 

export const Header = () => {
  var farofa = 3;
  return (
    <div>
      <p>Meu primeiro componete {farofa}</p>
    </div>
  );
};

const LinhaLivro = (props) => {
  const { livro, excluir } = props; 

  
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      {}
      <td>
        {livro.titulo}
        {}
        <button
          onClick={() => excluir(livro.codigo)}
          className="btn btn-danger btn-sn"
        >
          Excluir
        </button>
      </td>
      <td>{livro.resumo}</td>
      <td>{nomeEditora}</td>
      <td>
        {}
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};


const LivroLista = () => {
  
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    if (!carregado) {
      setLivros(controleLivro.obterLivros());
      setCarregado(true);
    }
  }, [carregado]); 

 
  const excluir = (codigo) => {
    controleLivro.excluir(codigo);
    setCarregado(false); 
  };

  
  return (
    <main>
      <h1>Lista de Livros</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Resumo</th>
            <th>Editora</th>
            <th>Autores</th>
          </tr>
        </thead>
        <tbody>
          {}
          {livros.map((livro) => (
            <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default LivroLista;
