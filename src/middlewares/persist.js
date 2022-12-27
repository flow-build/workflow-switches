const setPersist = (db_wf, db_sw) => {
    return async (ctx, next) => {
      ctx.state.persist_wf = db_wf;
      ctx.state.persist_sw = db_sw;
      return next();
    };
  };
  
  module.exports = {
    setPersist,
  };
  