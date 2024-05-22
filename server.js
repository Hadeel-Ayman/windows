const express = require('express');
const app = express();
const dotenv = require('dotenv');
const dbConnection = require('./config/dbConnection')
const morgan = require('morgan');
const globalError = require('./middlewares/errorMiddleware');
const UserRoute = require('./routes/UserRoute')
const AuthRoute = require('./routes/AuthRoute')
const FrameRoute = require('./routes/FrameRoute')
const SashRoute = require('./routes/SashRoute')
const CompanyRoute = require('./routes/CompanyRoute')
const MaterialRoute = require('./routes/MaterialRoute')
const OpeningSystemRoute = require('./routes/OpeningSystemRoute')
const ProfileRoute = require('./routes/ProfileRoute')
const TypeOfUnitRoute = require('./routes/TypeOfUnitRoute');
const ApiError = require('./utils/ApiError');
const cors = require('cors')
dotenv.config({ path: 'config.env' })


// Middleware

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions))

app.use(express.json())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
    console.log(`${process.env.NODE_ENV}`)
}


app.use(express.urlencoded({ extended: true }));

// connsct DB
dbConnection()

app.use('/api/v1/User', UserRoute)
app.use('/api/v1/Auth', AuthRoute)
app.use('/api/v1/Frame', FrameRoute)
app.use('/api/v1/Sash', SashRoute)
app.use('/api/v1/Company', CompanyRoute)
app.use('/api/v1/Material', MaterialRoute)
app.use('/api/v1/OpeningSystem', OpeningSystemRoute)
app.use('/api/v1/Profile', ProfileRoute)
app.use('/api/v1/TypeOfUnit', TypeOfUnitRoute)


// app.use('/api/v1/Auth', AuthRoute)
// app.use('/api/v1/Auth', AuthRoute)
// app.use('/api/v1/Auth', AuthRoute)
// app.use('/api/v1/Auth', AuthRoute)


app.all('*', (req, res, next) => {
    return next(new ApiError(`Cant find this route ${req.originalUrl}`, 400))
})

// handle the error on express
app.use(globalError)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`${PORT}`)
})


process.on('unhandledRejection', (error) => {
    console.error(`unhandledRejection ${error}`)
    server.close(() => {
        console.log('shutting down ....')
        process.exit(1)
    })
})