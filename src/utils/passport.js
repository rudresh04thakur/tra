 new GoogleStrategy({
    clientID: config.get('googleAuth.clientID'),
    clientSecret: config.get('googleAuth.clientSecret'),
    callbackURL: config.get('googleAuth.callbackURL'),
    passReqToCallback: true
}, async (accessToken, refreshToken, profile, done)=> {
    return done
});


// set up passport
const oidcStrategy = new Strategy({
    issuer: 'https://ssaihq.okta.com/oauth2/default',
    authorizationURL: 'https://ssaihq.okta.com/oauth2/default/v1/authorize',
    tokenURL: 'https://ssaihq.okta.com/oauth2/default/v1/token',
    userInfoURL: 'https://ssaihq.okta.com/oauth2/default/v1/userinfo',
    clientID: '0oajv9kkh13BGRZuz4x7',
    clientSecret: 'eQO1E-a5DR2Axmge6Bz5bAAKkfI6VAioQS05HoOrdW4MLW4DdO0o5dwiXAx_7uNd',
    callbackURL: 'https://tr.ssai.app/authorization-code/callback',
    scope: 'openid profile'
  }, (issuer, profile, done) => {
    return done(null, profile);
  });

// giving a name to a strategy so we can refer it in routes
passport.use('oidc', oidcStrategy);
