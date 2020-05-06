const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bodyParser = require('body-parser');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const userdb = JSON.parse(fs.readFileSync('server/users.json', 'UTF-8'));
const SECRET_KEY = '123456789';
const expiresIn = '1h';

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

function isAuthenticated({ email, password }) {
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1;
}

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!isAuthenticated({ email, password })) {
    return res.status(401).json({
      code: 401,
      message: 'Incorrect email or password'
    });
  }

  return res.status(200).json({
    access_token: createToken({ email, password })
  });
});

server.get('/user/profile', (req, res) => {
  try {
    const userData = verifyToken(req.headers.authorization.split(' ')[1]);

    res.status(200).json(userdb.users
      .map(({ name, email }) => ({ name, email }))
      .find(({ email }) => email === userData.email));
  } catch (err) {
    res.status(401).json({
      code: 401,
      message: 'Authorization token is not valid'
    });
  }
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    return res.status(401).json({
      code: 401,
      message: 'Authorization header is missing or incorrect'
    });
  }

  try {
    verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    res.status(401).json({
      code: 401,
      message: 'Authorization token is not valid'
    });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running')
});
