require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema

let PersonSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model('Person', PersonSchema)

const createAndSavePerson = (done) => {

  let person = new Person({name: 'John Doe', age: 30, favoriteFoods: ['pizza']})
  
  person.save((err, data) => {
    if (err) return done(err)
    done(null, data)
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.log(err)
      return done(err, data)
    }
    done(null, data)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find( {name: personName}, (err, data) => {
    if (err) return done(err, data)
    done(null, data)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne( {favoriteFoods: food}, (err, data) => {
    if (err) return done(err, data)
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById( {_id: personId}, (err, data) => {
    if (err) return done(err, data)
    done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById( {_id: personId}, (err, person) => {
    if (err) return done(err, person)
    
    foods = person.favoriteFoods.push(foodToAdd)

    person.save((err, data) => {
      if (err) return done(err, data)
      done(null, data)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
  {
    name: personName
  },
  {
    age: ageToSet
  },
  {
    new: true,
    runValidators: true
  }, (err, data) => {  
    if (err) return done(err, data)
    done(null, data)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
  {
    _id: personId
  },(err, data) => {  
    if (err) return done(err, data)
    done(null, data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove(
    {
      name: nameToRemove
    },(err, data) => {  
      if (err) return done(err, data)
      done(null, data)
    })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch})
    .select('name favoriteFoods')
    .sort('name')
    .limit(2)
    .exec((err, data) => {
      if (err) return done(err, data)

      done(null, data)
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
