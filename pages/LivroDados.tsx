import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Menu } from '../classes/componentes/Menu';
import styles from '../styles/Home.module.css';

const baseURL = "http://localhost:3000/api/livros";

const LivroDados: NextPage = () => {
    const [titulo, setTitulo] = useState<string>('');
    const [resumo, setResumo] = useState<string>('');
    const [autores, setAutores] = useState<string>('');
    const [codEditora, setCodEditora] = useState<number>(0);
    const [opcoes, setOpcoes] = useState<Array<any>>([]);
    const router = useRouter();

    const incluirLivro = async (livro: any) => {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(livro),
        });
        return response.ok;
    };

    const getEditoras = async () => {
        const response = await fetch("http://localhost:3000/api/editoras");
        const data = await response.json();
        setOpcoes(data.map((editor: any) => ({
            value: editor.codEditora,
            text: editor.nome,
        })));
    };

    useEffect(() => {
        getEditoras();
    }, []);

    const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(evento.target.value));
    };

    const incluir = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        const livro = {
            codigo: 0,
            titulo,
            resumo,
            autores: autores.split('\n'),
            codEditora,
        };
        if (await incluirLivro(livro)) router.push('/LivroLista');
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Incluir Livro</title>
            </Head>
            <Menu />
            <main className={styles.main}>
                <h1 className={styles.title}>Incluir Livro</h1>
                <form className={styles.form} onSubmit={incluir}>
                    <div className={styles['form-group']}>
                        <label className={styles.label}>Título:</label>
                        <input
                            className={styles.input}
                            type="text"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label className={styles.label}>Resumo:</label>
                        <textarea
                            className={styles.textarea}
                            value={resumo}
                            onChange={e => setResumo(e.target.value)}
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label className={styles.label}>Autores (um por linha):</label>
                        <textarea
                            className={styles.textarea}
                            value={autores}
                            onChange={e => setAutores(e.target.value)}
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label className={styles.label}>Editora:</label>
                        <select
                            className={styles.select}
                            value={codEditora}
                            onChange={tratarCombo}
                        >
                            {opcoes.map(opcao => (
                                <option key={opcao.value} value={opcao.value}>
                                    {opcao.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className={styles['submit-button']} type="submit">
                        Incluir
                    </button>
                </form>
            </main>
        </div>
    );
};

export default LivroDados;
