import React, { useRef, useState, useEffect }  from "react";
import { useHistory } from 'react-router-dom';
import { Avatar, ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContex';
import axios from "axios";
 
const Chats = () => {
    const history = useHistory(); 
    const { user } = useAuth();
    const [loading, setLoading] = useState(true); 

    const handlLogout = async () => {
        await auth.signOut(); 

        history.push('/');
    }
    
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await  response.blob();

        return new File([data], "userPhoto.jpeg", { type: 'image/jpeg'});
    }

    useEffect(() => {
        if(!user){
            history.push('/');

            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "d8ff2684-74d6-479c-b08a-beb3641a3c39",
                "user-name": user.email, 
                "user-secret": user.uid,
            } 
        })
        .then(() => {
            setLoading(false);
        })
        .catch( () => {
            let formdata = new FormData(); 

            formdata.append('email', user.email);
            formdata.append('username', user.email); 
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users',
                        formdata, 
                        { headers:  {"private-key": "5dbff405-a09f-44c6-9dc2-71d161007ec5" }}
                    )
                    .then( () => setLoading(false))
                    .catch((error) => console.log(error))
                })
    })
    }, [user, history]);

    if(!user || loading) return 'Loading...';

    return (
        <div className="chats-page">
             <div className="nav-bar">
                 <div className="logo-tab">
                       Клан Чат
                 </div>
                 <div onClick={handlLogout} className="logout-tab">
                     Выход
                 </div>
             </div>
        
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="d8ff2684-74d6-479c-b08a-beb3641a3c39"
                userName={user.email}
                userSecret={user.uid} 
            />
        </div>
    );
}

export default Chats; 