import React from 'react';

interface Livro {
    codigo: number;
    titulo: string;
    resumo: string;
    autores: string[];
}

interface LinhaLivroProps {
    livro: Livro;
    excluir: () => void;
}

const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir }) => {
    return (
        <tr>
            <td>{livro.codigo}</td>
            <td>{livro.titulo}</td>
            <td>
                <button onClick={excluir}>Excluir</button>
            </td>
        </tr>
    );
};

export default LinhaLivro;