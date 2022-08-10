const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect(
    'mongodb://localhost:27017/test1',
    { useNewUrlparser: true }
    , { useUndifiedTopology: true }
)
    .then(() => console.log(`connected....`))
    .catch((err) => console.log(err)
    );

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        validator(vage) {
            if (validator.isEmail(val)) {
                throw new Error('not a valid email')
            }
        }
    },
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

const Playlist = new mongoose.model('Playlist', playlistSchema);
//using asynchronous programming
const createDocument = async () => {
    try {
        //creating document
        const angularPlaylist = new Playlist({
            name: "D",
            age: 07,
            active: false
        })

        const jsPlaylist = new Playlist({
            name: "Kohli",
            age: 19,
            active: true
        })
        //waiting for document to be created
        const result = await Playlist.insertMany([angularPlaylist]);
        console.log(result);
    }
    //error handling
    catch (err) {
        console.log(err);
    }
}
//calling the function
createDocument();


//Read document from mongoose
const readDoc = async () => {
    const result = await Playlist.find().sort({ age: 1 });
    console.log(result);
}
//calling read function
//readDoc();

//deleting document
const deletePlaylist = async () => {
    try {
        const result = await Playlist.deleteMany({})
    } catch (error) {
        console.log(error)
    }
}
//calling delete finction with id
//deletePlaylist();

//update documents 
const updatePlaylist = async (_id) => {
    try {
        const result = await Playlist.updateOne({ _id: _id }, { $set: { age: 28 } })
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
//calling update
//updatePlaylist("62f34d092dfaab6d9468cd09");