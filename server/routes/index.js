import authRouter from './auth.js';
import userRouter from './user.js';
import postRouter from './post.js';

function routes(app) {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/post', postRouter);
}

export default routes;
