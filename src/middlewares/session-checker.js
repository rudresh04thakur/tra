module.exports = async (req, res, next) => {    
    if(typeof req.session.toaster != 'undefined'){
        res.locals.toaster = req.session.toaster;
        next();
    }
    if (!(req.originalUrl.includes('login') || req.originalUrl.includes('registration')) && typeof req.session.profile != 'undefined') {
        res.locals.profile = req.session.profile;
        next();
    }else{
        next();
    }
    
};
