module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    ILLUSTRY_SERVER_PORT: process.env.PORT || 3000,
    ILLUSTRY_SERVER_URL: process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING || 'mongodb+srv://vladimir:password1234@cluster0.zkjem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    }