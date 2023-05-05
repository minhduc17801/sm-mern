import authRouter from './auth.js';
import userRouter from './user.js';
import postRouter from './post.js';
import commentRouter from './comment.js';

function routes(app) {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/post', postRouter);
    app.use('/comment', commentRouter);
}

export default routes;
