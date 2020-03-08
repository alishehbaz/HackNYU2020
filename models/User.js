const mongoose = require('mongoose');

//Connect
mongoose.connect(`mongodb://urrarefubd5wsgeopsid:FZJFSB59fFyE0scLQczy@b8myi3588oqnhzj-mongodb.services.clever-cloud.com:27017/b8myi3588oqnhzj`, { useNewUrlParser: true, useUnifiedTopology: true}).
catch(error => console.log(error));

//Schema Export
//Nabeel was here :)
const UsersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    class: [
        {
            classId: String,
            className: String
        }
    ],
    classWork: [
        {
            classId: String,
            classWorkTitle: String,
            classWorkDesc: String
        }
    ]
});

const Users = mongoose.model('Users', UsersSchema, 'Users');

module.exports = Users;