const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User_Auth = require('../models/auth');
const Cliente = require('../models/clientesHibituais');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { Email, Password, Nome, Matriculas, isAdmin } = req.body;

    let respFind;
    let respSave;

    const hashedPw = await bcrypt.hash(Password, 12);
    console.log('email - ', Email);
    console.log('Password - ', Password);
    console.log('hashedPw - ', hashedPw);

    respFind = await User_Auth.findOne({ where: { email: Email } });
    if (respFind) {
      res.status(200).json({
        status: 200,
        received: req.body,
        message: 'Email address already exists!',
        data: { respFind },
      });
      console.log('respFind', respFind);
    }
    if (!respFind) {
      let newUser_Auth = new User_Auth({
        email: Email,
        password: hashedPw,
        isAdmin: true,
      });
      if (!isAdmin) {
        const new_Cliente = new Cliente({
          nome: Nome,
          matriculas: Matriculas,
        });
        const respNewCliente = await new_Cliente.save();
        newUser_Auth = new User_Auth({
          cliente: respNewCliente._id,
          email: Email,
          password: hashedPw,
          isAdmin: false,
        });
      }
      respSave = await newUser_Auth.save();

      res.json({
        status: 201,
        message: 'User created!',
        data: {
          token: createToken(
            newUser_Auth.email,
            newUser_Auth.isAdmin,
            newUser_Auth._id.toString(),
            newUser_Auth.cliente !== undefined
              ? newUser_Auth.cliente.toString()
              : null
          ),
          isAdmin: newUser_Auth.isAdmin,
          userAuthId: newUser_Auth._id.toString(),
          userClientId:
            newUser_Auth.cliente != undefined
              ? newUser_Auth.cliente.toString()
              : null,
        },
      });
      console.log('respSave', respSave);
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
exports.login = async (req, res, next) => {
  const { Email, Password } = req.body;

  try {
    const user = await User_Auth.findOne({ email: Email });
    if (!user) {
      const error = new Error('Could not find a user with that email.');
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(Password, user.password);

    if (!isEqual) {
      const error = new Error('Wrong password!!');
      error.statusCode = 401;
      throw error;
    }

    res.status(200).json({
      status: 201,
      message: 'User loggedin!',
      data: {
        token: createToken(user.email, user.isAdmin, user._id.toString()),
        isAdmin: user.isAdmin,
        userAuthId: user._id.toString(),
        userClientId:
          user.cliente != undefined ? user.cliente.toString() : null,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const createToken = (email, isAdmin, id) => {
  const token = jwt.sign(
    {
      email: email,
      isAdmin: isAdmin,
      userId: id,
    },
    'supersecretsecret',
    { expiresIn: '1h' }
  );
  return token;
};
