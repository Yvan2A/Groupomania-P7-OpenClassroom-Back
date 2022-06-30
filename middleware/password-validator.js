// import passwordValidator
const passwordValidator = require('password-validator');
// Create a schema
let schemaPass = new passwordValidator();
// Regles du mdp
schemaPass
.is().min(4)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123', 'Azerty']); // Blacklist these values
module.exports = (req, res, next) => {
    if(schemaPass.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({error : 'Invalid password : ' + schemaPass.validate('req.body.password', { list : true})});
    }
};