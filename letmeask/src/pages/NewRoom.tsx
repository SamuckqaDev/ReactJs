import { Link, useHistory } from 'react-router-dom'

import { Button } from "../components/Button";
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'


import '../styles/auth.scss'
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FormEvent } from 'react'
import { database } from '../services/firebase';



export function NewRoom() {
    const history = useHistory();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) { //Criar sala;
        event.preventDefault(); //correção de carregamento da página completa;

        if (newRoom.trim() === '') { //verificar se input está vazio;
            return;
        }

        const roomRef = database.ref('rooms'); //referenciar rooms(parecido com tabela) dentro do bando noSql;

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            autorId: user?.id,
        }); //jogar infomação para dentro de rooms;

        history.push(`/rooms/${firebaseRoom.key}`);
    }

    const { user } = useAuth();
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas Q&amp; A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                <h1>Bem vindo: <br />{user?.name}</h1>
                    <img src={logoImg} alt="LetmeAsk" />
                    <h2>Criar uma nova sala</h2>
                    <form action="" onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button className="button" type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente ? <Link to="/">Clique aqui </Link ></p>
                </div>
            </main>
        </div>
    )
}