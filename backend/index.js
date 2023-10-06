import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import ProductRoute from './models/ProductModel.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(ProductRoute);

app.listen(port, () => {
  console.log('Server is running on http://localhost:3000');
});