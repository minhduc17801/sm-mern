import { PrettyChatWindow } from 'react-chat-engine-pretty';
import { useSelector } from 'react-redux';

const ChatPage = () => {
    const { email } = useSelector((state) => state.user);
    return (
        <>
            <PrettyChatWindow
                height="100vh"
                projectId="
5a21930a-fa0d-46fd-8ccf-3d1f4e464601"
                username={email}
                secret={email}
            />
        </>
    );
};

export default ChatPage;
