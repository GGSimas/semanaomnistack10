import express from 'express';
import route from './routes';
import mongoose from 'mongoose';


const app = express();
mongoose.connect("mongodb+srv://week10:week10@cluster0-2naru.mongodb.net/week10?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(express.json());
app.use(route);

app.listen(3333);