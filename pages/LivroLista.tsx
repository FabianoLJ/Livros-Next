import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {Menu} from '../classes/componentes/Menu'; 
import styles from '../styles/Home.module.css';

const baseURL = "http://localhost:3000/api/livros";
const editorasURL = "http://localhost:3000/api/editoras";

interface Livro {
    codigo: number;
    titulo: string;
    resumo: string;
    autores: string[];
    codEditora: number;
}

interface Editora {
    codEditora: number;
    nome: string;
}

const LivroLista: NextPage = () => {
    const [livros, setLivros] = useState<Array<Livro>>([]);
    const [editoras, setEditoras] = useState<Array<Editora>>([]);

    const obterLivros = async () => {
        try {
            const response = await fetch(baseURL);
            const data = await response.json();
            setLivros(data);
        } catch (error) {
            console.error('Erro ao obter livros:', error);
        }
    };

    const obterEditoras = async () => {
        try {
            const response = await fetch(editorasURL);
            const data = await response.json();
            setEditoras(data);
        } catch (error) {
            console.error('Erro ao obter editoras:', error);
        }
    };

    const excluirLivro = async (codigo: number) => {
        try {
            const response = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
            if (response.ok) {
                setLivros((livros) => livros.filter(livro => livro.codigo !== codigo));
            }
        } catch (error) {
            console.error('Erro ao excluir livro:', error);
        }
    };


    const obterNomeEditora = (codEditora: number) => {
        const editora = editoras.find(e => e.codEditora === codEditora);
        return editora ? editora.nome : 'Editora desconhecida';
    };

    
    useEffect(() => {
        obterLivros();
        obterEditoras();
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Catálogo de Livros</title>
            </Head>
            <Menu />
            <main className={styles.main}>
                <h1>Catálogo de Livros</h1>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Resumo</th>
                            <th>Editora</th>
                            <th>Autores</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map(livro => (
                            <tr key={livro.codigo}>
                                <td>{livro.titulo}</td>
                                <td>{livro.resumo}</td>
                                <td>{obterNomeEditora(livro.codEditora)}</td>
                                <td>
                                    <ul>
                                        {livro.autores.map((autor, index) => (
                                            <li key={index}>{autor}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <button
                                        className={styles.button}
                                        onClick={() => excluirLivro(livro.codigo)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default LivroLista;
