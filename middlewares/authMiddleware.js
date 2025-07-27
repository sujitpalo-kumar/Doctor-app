const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    console.log(authHeader,"kumar",req.headers)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({
        message: 'Authorization header missing or malformed',
        success: false,
      });
    }

    const token = authHeader.split(" ")[1];
   
    JWT.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(401).send({
          message: 'Auth Failed',
          success: false
        });
      } else {
                if (!req.body) {
          req.body = {};
        }

        req.body.usersId = decode.id;
        console.log(decode.id,"kumarss",)
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: 'Auth Failed',
      success: false
    });
  }
};
