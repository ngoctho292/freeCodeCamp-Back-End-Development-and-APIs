// lesson 1: Install and setup Mongoose
// Step 1: Go to Shell on Replit
// npm install mongodb --save
// npm install mongoose@5.11.15 (requirement to the lesson mongoose v5.11.15)
// Step 2: Go to MongoDB Atlas create MONGO-URI LINK --> YOUR URI
// Step 3: Create .env file, go to Secrets tab on Replit
// KEY: MONGO-URI
// VALUE: YOUR URI (mongodb+srv://ngoctho:PASSWORD@cluster0.bodfkod.mongodb.net/?retryWrites=true&w=majority --> my uri)
// NOTE: Edit your PASSWORD
// Step 4: Add code in myApp.js
const mongoose = require('mongoose');
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

//lesson 2: Create a model
const personSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
  }
);
const Person = mongoose.model("Person",personSchema);

//lesson 3: Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  const yourName = new Person({
    name: "thone2",
    age: 34,
    favoriteFoods: ["vegetable","mango"]})
  yourName.save(function(err, data) {
    if (err) return console.log(err);
    done(null,data);
  });
};
// NOTE: If error: Creating and saving a db item should succeed (Test timed out)
// Database access -> Edit User -> Select Build-in Role -> Read and write to any database

//lesson 4: Create Many Records with model.create()
const arrayOfPeople = [
  {name: "Nick", age: 22, favoriteFoods: ["Apple"]},
  {name: "Jonh", age: 23, favoriteFoods: ["Fruits"]},
  {name: "Roleee", age: 42, favoriteFoods: ["Mango"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

//lesson 5: Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({name: personName},(err, name) =>{
    if (err) return console.log(err);
    done(null , name);
  })
};

//lesson 6: Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: [food]}, (err,data) =>{
    if (err) return console.log(err);
    done(null , data);
  })
};

//lesson 7: Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

//lesson 8: Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(err,person)=>{
    if (err) return console.log(err);
    //arr.push
    person.favoriteFoods.push(foodToAdd);
    //update
    person.save((err,updateData)=>{
      if (err) return console.log(err);
      done(null,updateData);
    })
  })
};

//lesson 9: Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

//lesson 10: Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err,data) => {
    if(err) return console.log(err);
    done(null, data);
  });
};

//lesson 11: Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove((err, data) =>{
    if(err) return console.log(err);
    data.name = nameToRemove;
    done(null , data);
  })
};

//lesson 12: Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  const foodToSearch = "burrito";
  const favFoods = { favoriteFoods: foodToSearch };
  Person.find(favFoods)
  .sort({ name: 1 }) // or "asc"; 1 asc -1 desc
  .limit(2)
  .select({age: 0}) // or "-age"; 0 hide, 1 show
  .exec((err, people) => {
    (err) ? done(err) : done(null,people);
  });
};
