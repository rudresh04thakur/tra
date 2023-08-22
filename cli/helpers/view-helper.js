/* eslint-disable no-console */
const clc = require('cli-color');
const getYArgs = require('../core/yargs');

const args = getYArgs().argv;

module.exports = {
  /**
   *
   */
  teaser() {
    this.log();
    this.log(clc.underline('Created By - Gopal Thakur'));
    this.log();
  },

  /**
   *
   */
  log() {
    console.log.apply(this, arguments);
  },

  /**
   *
   * @param error
   */
  error(error) {
    let message = error;
    const extraMessages = [];

    if (error instanceof Error) {
      message = !args.debug ? error.message : error.stack;
    }

    if (args.debug && error.original) {
      extraMessages.push(error.original.message);
    }

    this.log();
    console.error(`${clc.red('ERROR:')} ${message}`);
    extraMessages.forEach((message) =>
      console.error(`${clc.red('EXTRA MESSAGE:')} ${message}`)
    );
    this.log();

    process.exit(1);
  },

  /**
   *
   * @param message
   */
  warn(message) {
    this.log(`${clc.yellow('WARNING:')} ${message}`);
  },

  /**
   *
   * @param file
   */
  notifyAboutExistingFile(file) {
    this.error(
      `The file ${clc.blueBright(file)} already exists. ` +
        'Run command with --force to overwrite it.'
    );
  },
};
