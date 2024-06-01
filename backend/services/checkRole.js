const config = require("../config.json");


// To forbid any other role user rather than "Admin" role
function AllowAdminOnly(req, res, next) {
    if (res.locals.role === config.USER_ADMIN)
        next();
    else
        return res.sendStatus(401);
}

module.exports = { AllowAdminOnly: AllowAdminOnly };