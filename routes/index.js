const UserRoute = require('./UserRoute');
const AuthRoute = require('./AuthRoute');
const FrameRoute = require('./FrameRoute');
const SashRoute = require('./SashRoute');
const CompanyRoute = require('./CompanyRoute');
const MaterialRoute = require('./MaterialRoute');
const OpeningSystemRoute = require('./OpeningSystemRoute');
const ProfileRoute = require('./ProfileRoute');
const TypeOfUnitRoute = require('./TypeOfUnitRoute');
const InvoiceRoute = require('./invoiceRoute');

const AllRoutes = (app) => {
    app.use('/api/v1/User', UserRoute);
    app.use('/api/v1/Auth', AuthRoute);
    app.use('/api/v1/Frame', FrameRoute);
    app.use('/api/v1/Sash', SashRoute);
    app.use('/api/v1/Company', CompanyRoute);
    app.use('/api/v1/Material', MaterialRoute);
    app.use('/api/v1/OpeningSystem', OpeningSystemRoute);
    app.use('/api/v1/Profile', ProfileRoute);
    app.use('/api/v1/TypeOfUnit', TypeOfUnitRoute);
    app.use('/api/v1/InvoiceRoute', InvoiceRoute);
}

module.exports = AllRoutes;