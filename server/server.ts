import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import searchRoutes from './routes/searchRoutes';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(searchRoutes);

const port = 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
