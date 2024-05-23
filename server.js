const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const dbConnection = require('./config/dbConnection');
const globalError = require('./middlewares/errorMiddleware');
const ApiError = require('./utils/ApiError');

// Import routes
const UserRoute = require('./routes/UserRoute');
const AuthRoute = require('./routes/AuthRoute');
const FrameRoute = require('./routes/FrameRoute');
const SashRoute = require('./routes/SashRoute');
const CompanyRoute = require('./routes/CompanyRoute');
const MaterialRoute = require('./routes/MaterialRoute');
const OpeningSystemRoute = require('./routes/OpeningSystemRoute');
const ProfileRoute = require('./routes/ProfileRoute');
const TypeOfUnitRoute = require('./routes/TypeOfUnitRoute');
const bodyParser = require('body-parser');

dotenv.config({ path: 'config.env' });

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// لتتمكن من التعامل مع بيانات JSON
app.use(express.json());

// لتتمكن من التعامل مع بيانات application/x-www-form-urlencoded

// لتمكين المراجعة في وضع التطوير
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`${process.env.NODE_ENV}`);
}

// Connect to DB
dbConnection();

// Routes
app.use('/api/v1/User', UserRoute);
app.use('/api/v1/Auth', AuthRoute);
app.use('/api/v1/Frame', FrameRoute);
app.use('/api/v1/Sash', SashRoute);
app.use('/api/v1/Company', CompanyRoute);
app.use('/api/v1/Material', MaterialRoute);
app.use('/api/v1/OpeningSystem', OpeningSystemRoute);
app.use('/api/v1/Profile', ProfileRoute);
app.use('/api/v1/TypeOfUnit', TypeOfUnitRoute);

// Handle unknown routes
app.all('*', (req, res, next) => {
    return next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
});

// Global error handling
app.use(globalError);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error(`Unhandled Rejection: ${error}`);
    server.close(() => {
        console.log('Shutting down...');
        process.exit(1);
    });
});
