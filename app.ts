

import express, { response } from 'express';
import path from 'path';

const app = express();
const port = 3000;

import { indexRouter } from './routes/index';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use('/update', (req,res)=>{res.render("updating")});
app.use('/', indexRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

export default app;