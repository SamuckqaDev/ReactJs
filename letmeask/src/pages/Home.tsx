import { FormEvent, useState } from 'react'

import { useHistory } from 'react-router-dom'


import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'





export function Home() {
    const [roomCode, setRoomCode] = useState('');

    const { user, signInWithGoogle } = useAuth();
    const history = useHistory();

    async function handleCreateRoom() { //Função para craiação de sala(somente depois de efetuar atenticação);

        if (!user) {
            await signInWithGoogle() //await só executa código se obtiver sucesso !
        }

        history.push('/rooms/new');
    }

    async function hanldeJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') { //verificar se há espaços em branco no código; 
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {//verificar exsitencia da sala por nome do input;
            alert('Room does not exists.');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room alredy closed.')
        }

        history.push(`/rooms/${roomCode}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas Q&amp; A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">

                    <img src={logoImg} alt="LetmeAsk" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Fazer login com conta google" />
                        Crie sua sala com google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={hanldeJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button className="button" type="submit">Entre na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}