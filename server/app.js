import express from 'express';
import routes from './src/v1/routes';

const app = express();

app.use(express.json());

const port = process.env.PORT || 8000;

app.get('/', (req, res) => res.send('Hello World'));

app.use('/api/v1/users', routes.users);

app.listen(port, () => console.log(`Server started on port ${port}`));
