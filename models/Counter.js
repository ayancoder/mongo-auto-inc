var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* const counterSchema = new Schema(
  {
  _id: {type: String, required: true},
  seq: { type: Number, default: 0 }
  }
);

counterSchema.index({ _id: 1, seq: 1 }, { unique: true })

const counterModel = mongoose.model('counter', counterSchema);

const autoIncrementModelID = function (modelName, doc, next) {
  counterModel.findByIdAndUpdate(        // ** Method call begins **
    modelName,                           // The ID to find for in counters model
    { $inc: { seq: 1 } },                // The update
    { new: true, upsert: true },         // The options
    function(error, counter) {           // The callback
      if(error) return next(error);

      doc.id = counter.seq;
      next();
    }
  );                                    
} */

const counterSchema = new Schema({
  model: { type: String, required: true },
  identifier: { type: String ,required: true, index: { unique: true }},
  seq: { type: Number, default: 0 },
});

counterSchema.statics.getNextId = async function (modelName,identifierName, callback) {

  let incr = await this.findOne({
    model: modelName,
    identifier: identifierName,
  });

  if (!incr)
    incr = await new this({
      model: modelName,
      identifier: identifierName,
    }).save();

  incr.seq++;
  incr.save();
  return incr.seq;

};

counterSchema.statics.counterReset = async function (modelName, identifierName, callback) {
  const filter = { model: modelName, identifier: identifierName };
  const update = { seq: 0 };

  await Counter.findOneAndUpdate(filter, update, {
    new: true,
  });
};

const Counter = mongoose.model("TicketCounter", counterSchema);

module.exports = Counter;