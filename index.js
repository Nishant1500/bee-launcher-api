const express = require('express');
const Joi = require('joi'); //used for validation
const axios = require('axios');
const app = express();
app.use(express.json());
 
const books = [
{title: 'Harry Potter', id: 1},
{title: 'Twilight', id: 2},
{title: 'Lorien Legacies', id: 3}
]

const news = {
    "en": "<div class=\"newsContents\" id=\"newsContents\" style=\"text-align: center; font-family: 'bloxatregular'; opacity: 0; transition: opacity 1.2s ease; overflow-y: scroll; height: 450px;\"> <span style=\"font-size: 20px; font-family: 'bloxatregular';\">NEWS</span> <div class=\"newsContentContainer\"> <div style=\"width: fit-content; display: inline-block; background-color: #181414; margin-right: 15px; margin-top: 20px;\"> <img src=\"https://www.minecraft.net/content/dam/games/minecraft/screenshots/snapshot-21w15a-header.jpg.transform/minecraft-image-large/image.jpg\" style=\"width: 350px; height: 169px;\"> <br><span style=\"font-family: 'bloxatregular'; font-size: 20px;\">NEW:<br> SNAPSHOT 21W15A</span> </div> <div style=\"width: fit-content; display: inline-block; background-color: #181414; margin-right: 15px; margin-top: 20px;\"> <img src=\"https://cdn.discordapp.com/attachments/775926683920236574/832546357662187541/unknown.png\" style=\"width: 350px; height: 169px;\"> <br><span style=\"font-family: 'bloxatregular'; font-size: 20px;\">A CAVE N CLIFFS:<br> ANNOUNCEMENT</span> </div> <div style=\"width: fit-content; display: inline-block; background-color: #181414; margin-right: 15px; margin-top: 20px;\"> <img src=\"https://www.minecraft.net/content/dam/games/minecraft/screenshots/netheritescrap-header.jpg.transform/minecraft-image-large/image.jpg\" style=\"width: 350px; height: 169px;\"> <br><span style=\"font-family: 'bloxatregular'; font-size: 20px;\">TAKING INVENTORY:<br> NETHERITE SCRAP</span> </div> <br> <img class=\"buttonMC\" id=\"loadMoreButton\" src=\"assets/loadNews.png\" style=\"margin-right: auto; margin-left: auto; margin-top: 20px;\" alt=\"Load More\"> </div> </div> <script>document.getElementById('loadMoreButton').onclick = function() { document.getElementById('loadMoreButton').src = 'https://cdn.discordapp.com/attachments/775926683920236574/832596473291997214/newsNo.png'}</script>"
}
 
//READ Request Handlers
app.get('/', (req, res) => {
res.send('Welcome To Official Bee Launcher RESTful API.');
});
 
app.get('/api/books', (req,res)=> {
res.send(books);
});

app.get('/api/news', (req, res) => {
   if(req.headers['user-agent'] === "BeeLauncher") {
  res.json(news);
    } else {
      res.send('Can You Contact Nishant1500 , Cuz It seems you don\'t have access tokens\n' + JSON.stringify(req.headers))
      }
  // res.send('{\"en": \"<div class=\"newsContents\" id=\"newsContents\" style=\"text-align: center; font-family: \'bloxatregular\'; opacity: 0; transition: opacity 1.2s ease; overflow-y: scroll; height: 450px;\"> <span style=\"font-size: 20px; font-family: \'bloxatregular\';\">NEWS</span> <div class=\"newsContentContainer\"> <div style=\"width: fit-content; display: inline-block; background-color: #181414; margin-right: 15px; margin-top: 20px;\"> <img src=\"https://www.minecraft.net/content/dam/games/minecraft/screenshots/snapshot-21w15a-header.jpg.transform/minecraft-image-large/image.jpg\" style=\"width: 350px; height: 169px;\"> <br><span style=\"font-family: \'bloxatregular\'; font-size: 20px;\">NEW:<br> SNAPSHOT 21W15A</span> </div> <div style=\"width: fit-content; display: inline-block; background-color: #181414; margin-right: 15px; margin-top: 20px;\"> <img src=\"https://cdn.discordapp.com/attachments/775926683920236574/832546357662187541/unknown.png\" style=\"width: 350px; height: 169px;\"> <br><span style=\"font-family: \'bloxatre
})
 
app.get('/api/books/:id', (req, res) => {
const book = books.find(c => c.id === parseInt(req.params.id));
 
if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
res.send(book);
});
 
//CREATE Request Handler
app.post('/api/books', (req, res)=> {
 
const { error } = validateBook(req.body);
if (error){
res.status(400).send(error.details[0].message)
return;
}
const book = {
id: books.length + 1,
title: req.body.title
};
books.push(book);
res.send(book);
});
 
//UPDATE Request Handler
app.put('/api/books/:id', (req, res) => {
const book = books.find(c=> c.id === parseInt(req.params.id));
if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
 
const { error } = validateBook(req.body);
if (error){
res.status(400).send(error.details[0].message);
return;
}
 
book.title = req.body.title;
res.send(book);
});
 
//DELETE Request Handler
app.delete('/api/books/:id', (req, res) => {
 
const book = books.find( c=> c.id === parseInt(req.params.id));
if(!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
 
const index = books.indexOf(book);
books.splice(index,1);
 
res.send(book);
});
 
function validateBook(book) {
const schema = {
title: Joi.string().min(3).required()
};
return Joi.validate(book, schema);
 
}
 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));