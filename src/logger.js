require('dotenv-flow').config();

class LoggerService {
    static getInstance() {
      if(!LoggerService._instance) {
        LoggerService._instance = new LoggerService(process.env.LOG_LEVEL);
      }
      return LoggerService._instance;
    }
  
    constructor(logLevel = 'INFO') {
      if (!LoggerService._instance) {
        if (logLevel === 'DEBUG') {
          this._week = (text) => console.debug(text);
        } else if (logLevel === 'INFO') {
          this._week = () => {};
        } else {
          throw new Error('invalid log Level');
        }
        LoggerService._instance = this;
      }
    }
  
    formater(level, text) {
      return `[${new Date().toISOString()}] - [${level}] - [MESSAGE -> ${text}]`;
    }
  
    debug(text) {
      this._week(this.formater('DEBUG', text));
    }
  
    info(text) {
      console.info(this.formater('INFO', text));
    }
  
    warn(text) {
      console.warn(this.formater('WARNING', text));
    }
  
    error(message, err) {
      console.log(this.formater('ERROR', message || err.message));
      console.log('------------ERROR-------------');
      console.error(err);
      console.log('---------END OF ERROR----------');
    }
  }
  
  module.exports = {
    LoggerService
  };