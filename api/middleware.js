let initialId = 2;

function errorHandling(err, req, res, next) { //eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
    });
}

function validateUser(req, res, next) {
    const { username, password } = req.body;
      if(username && username.trim() && password && password.trim()){
        req.newUser = {...req.body, id: initialId++};
        next();
      } else {
        next({status: 400, message: "missing required name field"});
      }
}

  module.exports = {
      validateUser,
      errorHandling,
  };