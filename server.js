import express from 'express';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server running on port 5000'));
app.use('/', routes);

module.exports = app;
