import { PrettyChatWindow } from 'react-chat-engine-pretty';
import { useSelector } from 'react-redux';

const ChatPage = () => {
    const { email } = useSelector((state) => state.user);
    return (
        <>
            <PrettyChatWindow
                height="100vh"
                projectId="
582bd9ec-0981-43b1-8d2d-62ccf2dce2b6"
                username={email}
                secret={email}
            />
        </>
    );
};

export default ChatPage;
