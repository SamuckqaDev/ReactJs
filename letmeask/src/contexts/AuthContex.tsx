
import { ReactNode, useEffect, useState, createContext } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContexProviderProps ={
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType); //Funão que retorna promise async;

export function AuthContextProvider(props: AuthContexProviderProps) {
    const [user, setUser] = useState<User>();

    useEffect(() => { //Função que verificar se há user logado para manter cessão;
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          const { displayName, photoURL, uid } = user
          if (!displayName || !photoURL) { //Se estiver sem user ou sem foto, retorma mesagem de erro;
  
            throw new Error('Missing information from google Account.')
          }
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      })
      return () =>{
        unsubscribe();
      }
    
    }, [])
  
    async function signInWithGoogle() {
      //Função para craiação de sala(somente depois de efetuar atenticação);
      const provider = new firebase.auth.GoogleAuthProvider(); //provider = variação de dentro de import de firebase;
  
      const result = await auth.signInWithPopup(provider);
  
      if (result.user) {
  
        const { displayName, photoURL, uid } = result.user
  
        if (!displayName || !photoURL) { //Se estiver sem user ou sem foto, retorma mesagem de erro;
  
          throw new Error('Missing information from google Account.')
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
  
      }
  
    }
    
    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
          {props.children}
        </AuthContext.Provider>
    )
}