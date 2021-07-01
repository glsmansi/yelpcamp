const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  userCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20);
    const camp = new Campground({
      author: "60d03df11be3743790080793",
      location: `${(cities[random1000].city, cities[random1000].state)}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url:
            "https://res.cloudinary.com/dux55o1xq/image/upload/v1624675847/Yelpcamp/kuxjqejiaj5xrr9q8lfx.jpg",
          filename: "Yelpcamp/kuxjqejiaj5xrr9q8lfx",
        },
        {
          url:
            "https://res.cloudinary.com/dux55o1xq/image/upload/v1624674967/Yelpcamp/eo557uncbsq5tmkg3chr.jpg",
          filename: "Yelpcamp/eo557uncbsq5tmkg3chr",
        },
      ],
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, commodi.",
      price: price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
