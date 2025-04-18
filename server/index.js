import authRoutes from './routes/auth.routes.js';
import foodDonationRoutes from './routes/fooddonation.routes.js';
import allFoodRoutes from './routes/allfood.routes.js';
import userRoutes from './routes/user.routes.js';
import bodyParser from 'body-parser';
import connectDB from './config/mongo.js';
import router from './routes/foodRoutes.js';
import donorRouter from './routes/donorRoutes.js';
import cors from 'cors';

import express from 'express';
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/auth', authRoutes);
app.use('/donor', foodDonationRoutes);
app.use('/food', allFoodRoutes);
app.use('/food', router);
app.use('/', userRoutes);
app.use('/donor', donorRouter);
connectDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});