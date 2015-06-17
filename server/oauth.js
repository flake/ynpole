isProdEnv = function () {
    if (process.env.ROOT_URL == "http://localhost:3000/") {
        return false;
    } else {
        return true;
    }
}
 
ServiceConfiguration.configurations.remove({
    service: 'google'
});
 
ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.remove({
    service: 'twitter'
});
 
ServiceConfiguration.configurations.remove({
    service: 'github'
});
 
if (isProdEnv()) {
    ServiceConfiguration.configurations.insert({
        service: 'github',
        clientId: '00000',
        secret: '00000'
    });
    ServiceConfiguration.configurations.insert({
        service: 'twitter',
        consumerKey: '00000',
        secret: '00000'
    });
    ServiceConfiguration.configurations.insert({
        service: 'google',
        appId: '864167858348-v656ur375b5iru3pqn30t4skkmhguavc.apps.googleusercontent.com',
        secret: 'NRDbUt8TLzPdd0kLHvDhod7q'
    });
    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: '1375718669423207',
        secret: 'f50d75922a13885d1195b7957698ae3d'
    });
} else {
    // dev environment
    ServiceConfiguration.configurations.insert({
        service: 'github',
        clientId: '11111',
        secret: '11111'
    });
    ServiceConfiguration.configurations.insert({
        service: 'twitter',
        consumerKey: '11111',
        secret: '11111'
    });
    ServiceConfiguration.configurations.insert({
        service: 'google',
        clientId: '688362045263-9a64jb9flkd753o704tkjjmcv87mlfpo.apps.googleusercontent.com',
        secret: '951nSxbsNGFF-WelnaaRg1Ic'
    });
    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: '1375718669423207',
        secret: 'f50d75922a13885d1195b7957698ae3d'
    });
}
 
Accounts.onCreateUser(function (options, user) {
    if (user.services) {
        if (options.profile) {
            user.profile = options.profile
        }
        var service = _.keys(user.services)[0];
        var email = user.services[service].email;
        if (!email) {
            if (user.emails) {
                email = user.emails.address;
            }
        }
        if (!email) {
            email = options.email;
        }
        if (!email) {
            // if email is not set, there is no way to link it with other accounts
            return user;
        }
        
        // see if any existing user has this email address, otherwise create new
        var existingUser = Meteor.users.findOne({'emails.address': email});

        if(existingUser && service == "password")
            throw new Meteor.Error("email", "Email address is already registered.");

        if (!existingUser) {
            // check for email also in other services
            var existingGitHubUser = Meteor.users.findOne({'services.github.email': email});
            var existingGoogleUser = Meteor.users.findOne({'services.google.email': email});
            var existingTwitterUser = Meteor.users.findOne({'services.twitter.email': email});
            var existingFacebookUser = Meteor.users.findOne({'services.facebook.email': email});
            var doesntExist = !existingGitHubUser && !existingGoogleUser && !existingTwitterUser && !existingFacebookUser;
            if (doesntExist) {
                Meteor.setTimeout(function(){
                    Accounts.sendVerificationEmail(user._id);
                }, 2 * 1000);
                // return the user as it came, because there he doesn't exist in the DB yet
                return user;
            } else {
                existingUser = existingGitHubUser || existingGoogleUser || existingTwitterUser || existingFacebookUser;
                if (existingUser) {
                    if (user.emails) {
                        // user is signing in by email, we need to set it to the existing user
                        existingUser.emails = user.emails;
                    }
                }
            }
        }
 
        // precaution, these will exist from accounts-password if used
        if (!existingUser.services) {
            existingUser.services = { resume: { loginTokens: [] }};
        }
 
        // copy accross new service info
        existingUser.services[service] = user.services[service];
 /*       existingUser.services.resume.loginTokens.push(
            user.services.resume.loginTokens[0]
        );*/
 
        // even worse hackery
        Meteor.users.remove({_id: existingUser._id}); // remove existing record
        return existingUser;    		      // record is re-inserted
    }
});