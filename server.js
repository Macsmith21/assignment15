const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let recipes = [
    {
        "name": "Beaded JellyFish",
        "img": "bead-jellyfish.jpg",
        "description": "Create a hanging jellyfish using eggcartons and multicolored beads",
        "ingredients": [
            "string",
            "egg cartons",
            "beads"
        ]
    },
    {
        "name": "Character Bookmarks",
        "img": "bookmarks.jpeg",
        "description": "Create a little birdy bookmark to always remin you were you were",
        "ingredients": [
            "yellow construction paper",
            "orange construction paper",
            "black construction paper"
        ]
    },
    {
        "name": "Button Flowers",
        "img": "button-flowers.jpeg",
        "description": "Create a fun bouquet of flowers with your favorite buttons",
        "ingredients": [
            "multicolored buttons",
            "multicolored flet",
            "green straws",
            "ribbon"
        ]
    },
    {
        "name": "Cheerio Necklaces",
        "img": "cheerio-necklace.webp",
        "description": "Create a fun and edible necklace",
        "ingredients": [
            "Cheerios or Fruit Loops",
            "Elastic string"
        ]
    },
    {
        "name": "Cotton Ball Cupcakes",
        "img": "cotton-ball-cupcakes.webp",
        "description": "Decorate your fun filled cupcake however you want.",
        "ingredients": [
            "Construction Paper",
            "Cotton Balls",
            "Black Sharpie",
            "Glitter"
        ]
    },
    {
        "name": "School Themed Mason Jars",
        "img": "decorated-jars.jpeg",
        "description": "Let's make mason jars to ",
        "ingredients": [
            "Construction Paper",
            "Cotton Balls",
            "Black Sharpie",
            "Glitter"
        ]
    },
    {
        "name": "Egg Carton Flowers",
        "img": "egg-carton-flowers.jpg",
        "description": "Make a beautiful bouquet with egg cartons and other items you can find around the house",
        "ingredients": [
            "Egg Cartons",
            "Butons",
            "Green Pipe Cleaner",
            "Ribbon",
            "Canvas"
        ]
    },
    {
        "name": "Finger Puppets",
        "img": "finger-puppets.jpeg",
        "description": "These little critters are easy to make, and will entertain your little one while they make a show.",
        "ingredients": [
            "Pom-poms",
            "Googly Eyes",
            "Pipe Cleaner"
        ]
    },
    {
        "name": "Ribbon Flower Headbands",
        "img": "flower-headbands.jpg",
        "description": "Let your little one show off her new style with these pretty and customizable headbands",
        "ingredients": [
            "Plain headband",
            "Ribbon",
            "Buttons",
            "Gems"
        ]
    },
    {
        "name": "Hand Print Fish Puppets",
        "img": "handprint-fish.jpg",
        "description": "We all need to take every opportunity we can to remember those tiny hands, and what better way to do it, then to make fish puppets!",
        "ingredients": [
            "Popsicle sticks",
            "Cardstock",
            "Gems",
            "Googly Eyes"
        ]
    },
    {
        "name": "Hand Print Tree",
        "img": "hand-print-tree.jpeg",
        "description": "This is a fun way to get your little one into finger painting.",
        "ingredients": [
            "Watercolor Paper",
            "Finger paint"
        ]
    },
    {
        "name": "Melted Bead Bowl",
        "img": "melted-bead-bowl.jpeg",
        "description": "All they need to do is shape their faviorte design, warm it up and they have a brand new bowl.",
        "ingredients": [
            "Beads",
            "Bowl",
            "Parchment paper"
        ]
    },
    {
        "name": "Monster Kites",
        "img": "monster-rolls.jpg",
        "description": "Let's make those scary toilet paper rolls fly!",
        "ingredients": [
            "Toilet paper rolls",
            "Paint",
            "Tissue Paper",
            "String"
        ]
    },
    {
        "name": "Pool Noodle Boats",
        "img": "noodle-boats.png",
        "description": "Let's make a boat that will actually float, due to the floating bottom of a pool noodle.",
        "ingredients": [
            "Pool Noodle",
            "Straw",
            "Plastic Paper"
        ]
    },
    {
        "name": "Paper Plate Bees",
        "img": "paper-plate-bees.jpeg",
        "description": "Let's have fun with making cute little bees, or big bees actually.",
        "ingredients": [
            "Paper Plate",
            "Googly Eyes",
            "Close Pins",
            "Black pom poms",
            "Yellow Paint",
            "Black Paint"
        ]
    },
    {
        "name": "Paper Plate Dinosaurs",
        "img": "paper-plate-dinosaurs.jpg",
        "description": "Who would have thought that half a paper plate would be the base of a dinosaur.",
        "ingredients": [
            "Paper Plate",
            "Paint",
            "Close Pins",
            "Construction Paper"
        ]
    },
    {
        "name": "Porcupine Leafs",
        "img": "porcupine-leaf.webp",
        "description": "Let's turn an ordinary paper plate into a fun filled mask.",
        "ingredients": [
            "Leafs",
            "Berries",
            "Acorns",
            "Construction Paper"
        ]
    },
    {
        "name": "Rainbow Cloud",
        "img": "rainbow-cloud.webp",
        "description": "Some cotton and color and you'll have a beautiful rainbow.",
        "ingredients": [
            "Paper Plate",
            "Cotton Balls",
            "Construction Paper"
        ]
    },
    {
        "name": "Fun Shaped Crayons",
        "img": "shaped-crayons.jpg",
        "description": "Let's melt some crayons together and let them harden into fun shapes.",
        "ingredients": [
            "Broken Crayons",
            "Mold"
        ]
    },
    {
        "name": "Straw Farris Wheel",
        "img": "straw-faris-wheel.jpg",
        "description": "It might be too small to ride, but this farris wheel is the most colorful of all.",
        "ingredients": [
            "Multicolored straws",
            "Platform"
        ]
    },
    {
        "name": "Sunny String",
        "img": "sun-string.jpg",
        "description": "Let's practice our fine motor skills while we weave the string into a fun sun.",
        "ingredients": [
            "Yellow String",
            "Paper Plate",
            "Yellow construction paper",
            "Yellow and Orange beads"
        ]
    },
    {
        "name": "Tissue Ballerinas",
        "img": "tisue-dancer.jpeg",
        "description": "These beautiful dancers will look great on display",
        "ingredients": [
            "Pipe cleaner",
            "Tissue Paper",
            "Elastics"
        ]
    },
    {
        "name": "Toilet Paper Roll Animals",
        "img": "toilet-paper-animals.jpeg",
        "description": "These beautiful dancers will look great on display",
        "ingredients": [
            "Toilet Paper Rolls",
            "Construction Paper",
            "Googly Eyes"
        ]
    },
    {
        "name": "Toilet Paper Butterfly",
        "img": "toilet-paper-butterfly.jpg",
        "description": "Such a sweat little flyer",
        "ingredients": [
            "Toilet Paper Rolls",
            "Construction Paper",
            "Googly Eyes",
            "Buttons"
        ]
    },
    {
        "name": "Valentines Jar",
        "img": "valentines-jar.webp",
        "description": "So much hearts all in one",
        "ingredients": [
            "Clay",
            "Glitter"
        ]
    }
];

app.get("/api/recipes", (req, res) => {
  res.send(recipes);
});

app.post("/api/recipes", upload.single("img"), (req, res) => {
  const result = validateRecipe(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const recipe = {
    _id: recipes.length + 1,
    name: req.body.name,
    description: req.body.description,
    ingredients: req.body.ingredients.split(","),
  };

  if (req.file) {
    recipe.img =  req.file.filename;
  }

  recipes.push(recipe);
  res.send(recipes);
});

const validateRecipe = (recipe) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    ingredients: Joi.allow(""),
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
  });

  return schema.validate(recipe);
};

app.listen(3000, () => {
  console.log("serving port 3000");
});