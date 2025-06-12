
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)]



const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6837280163bf4e44b38d0720',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quae fuga officia numquam autem sequi, facere illo consectetur veritatis aspernatur eligendi, sunt repudiandae fugiat, distinctio vitae eaque. Asperiores, porro tempora.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dizufkn2v/image/upload/v1749299156/YelpCamp/j9b8vlunub3kby1iuzrd.avif',
                    filename: 'YelpCamp/knnndlz4rnnggfv2dcup',
                },
                {
                    url: 'https://res.cloudinary.com/dizufkn2v/image/upload/v1749299154/YelpCamp/knnndlz4rnnggfv2dcup.avif',
                    filename: 'YelpCamp/e5ynz5qw9nunb10c4jur',
                },
                {
                    url: 'https://res.cloudinary.com/dizufkn2v/image/upload/v1749299155/YelpCamp/e5ynz5qw9nunb10c4jur.avif',
                    filename: 'YelpCamp/j9b8vlunub3kby1iuzrd',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})