const mongoose = require('mongoose');

//Connect
mongoose.connect(`mongodb://u02zm13zgdt5usfgxe6o:FNvpWyDQNbSSvN2MBi5a@bsa1w0kpy1pg7x4-mongodb.services.clever-cloud.com:27017/bsa1w0kpy1pg7x4`, { useNewUrlParser: true, useUnifiedTopology: true}).
catch(error => console.log(error));

//Schema Export
//Nabeel was here :)
const UsersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    class: [
        {
            className: String
        }
    ]
});

const Users = mongoose.model('Users', UsersSchema, 'Users');

module.exports = Users;