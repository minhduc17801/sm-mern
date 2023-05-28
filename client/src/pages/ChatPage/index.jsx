import { PrettyChatWindow } from 'react-chat-engine-pretty';
import { useSelector } from 'react-redux';

const ChatPage = () => {
    const { email } = useSelector((state) => state.user);
    return (
        <>
            <PrettyChatWindow
                height="100vh"
                projectId="
8b93511b-f783-432c-9787-e65aa77366d9"
                username={email}
                secret={email}
            />
        </>
    );
};

export default ChatPage;
