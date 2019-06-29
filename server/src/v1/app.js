import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

const port = process.env.PORT || 8000;

app.use('/api/v1/users', routes.users);
app.use('/api/v1/properties', routes.properties);

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
