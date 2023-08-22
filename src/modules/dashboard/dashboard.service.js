const bcrypt = require('bcryptjs');
const User = require('../../db/models/User');
const JwtService = require('./jwt.service');
const { BadRequestError, NotFoundError } = require('../../utils/api-errors');

const AuthService = {
  /**
   * Logs in a user and generates a token.
   * @async
   * @function
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} If the user is not found.
   */
  doLogin: async (requestBody) => {
    const { phone, password } = requestBody;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const isValidPass = bcrypt.compareSync(password, user.password);
    if (!isValidPass) {
      throw new BadRequestError('Username or Password is invalid!');
    }

    const payload = {
      employeeCode: user.id,
      role: user.role,
    };

    const accessToken = await JwtService.generateJWT({
      payload,
    });
    return {
      accessToken,
      ...payload,
    };
  },
};

module.exports = AuthService;
