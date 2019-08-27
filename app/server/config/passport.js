const LocalStrategy = require("passport-local").Strategy;
//Load Up User Model
const User = require("../models/UserModel");

module.exports = passport => {
  // =========================================================================
  // PASSPORT SESSION SET UP
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  // =========================================================================

  //Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //deserialize user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // =========================================================================
  // PASSPORT SESSION LOCAL SIGN UP
  // =========================================================================
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email", //We will override the default username field with email to login
        passwordField: "password",
        passReqToCallback: true //This will allow us to pass the request object to the call back
      },
      (req, email, password, done) => {
        // //Validation

        if (email) email.toLowerCase(); //NO CASE MATCHING!!!!!!

        process.nextTick(() => {
          User.findOne({ email })
            .populate("posts")
            .then(user => {
              if (!user) return done(null, false, "User does not exist");
              if (!user.validatePassword(password))
                return done(
                  null,
                  false,
                  "Password and user combination does not match"
                );

              return done(null, user);
            })
            .catch(err => {
              if (err) return done(err);
            });
        });
      }
    )
  );
};
