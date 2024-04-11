module.exports = async (req, res, next) => {
    if(typeof req.session.toaster != 'undefined'){
        res.locals.toaster = req.session.toaster;
    }
    if (req.session.profile != 'undefined') {
        res.locals.profile = req.session.profile;
    }
    next();
};
