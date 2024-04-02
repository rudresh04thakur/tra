module.exports = async (req, res, next) => {
    if(typeof req.session.toaster != 'undefined'){
        console.log("gopal 1 ----------------------- ",req.session.toaster)
        res.locals.toaster = req.session.toaster;
    }
    if (req.session.profile) {
        res.locals.profile = req.session.profile;
    } 
    next();
};
