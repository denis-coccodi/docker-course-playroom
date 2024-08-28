const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const mongoose = require('mongoose');

const Favorite = require('./models/favorite');

const app = express();

app.use(bodyParser.json());

app.get('/favorites', async (req, res) => {
  const favorites = await Favorite.find();
  res.status(200).json({
    favorites: favorites,
  });
});

app.post('/favorites', async (req, res) => {
  const favName = req.body.name;
  const favType = req.body.type;
  const favUrl = req.body.url;

  try {
    if (favType !== 'movie' && favType !== 'character') {
      throw new Error('"type" should be "movie" or "character"!');
    }
    const existingFav = await Favorite.findOne({ name: favName });
    if (existingFav) {
      throw new Error('Favorite exists already!');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const favorite = new Favorite({
    name: favName,
    type: favType,
    url: favUrl,
  });

  try {
    await favorite.save();
    res
      .status(201)
      .json({ message: 'Favorite saved!', favorite: favorite.toObject() });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/films');
    res.status(200).json({ movies: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/people', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/people');
    res.status(200).json({ people: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

mongoose.connect(
  // in case the mongodb is running on the host machine, and not in a docker container the 
  // host.docker.internal address, instead on localhost, will tell docker to look for that address in the host macdocker run mongodbhine
  // 'mongodb://host.docker.internal:27017/swfavorites',
  
  // you can contact the mongodb inside a different container by finding its network address with: docker container inspect <containerName>
  // 'mongodb://172.17.0.2:27017/swfavorites',

  // but best is creating a network with: docker network create favorites-net
  // and running the mongo container instance with: 
  // docker run --name mongodb -d --network favorites-net mongo 
  // then creating the image: docker build -t favourites-node .
  // and starting the BE container instance with: docker run --name movies --rm -d -p 3000:3000 --network favorites-net favourites-node 
  // and the address to contact mongo should be as follows: mongodb://<containerName>:27017/swfavorites
  'mongodb://mongodb:27017/swfavorites',
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(3000);
    }
  }
);
