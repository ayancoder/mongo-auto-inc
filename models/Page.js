const mongoose = require('mongoose');
const Counter = require('./Counter');
const cron = require('node-cron');

const PageSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  officeName: {type: String},
  dcoketId: { type: String },
  
});

PageSchema.pre("save", async function (next) {
  if (this.isNew) {
    const officeName = this.officeName;
    console.log(officeName);
    const id = await Counter.getNextId("Pages", officeName);
    const event = new Date();
    const mon = event.getMonth() + 1;
    const day = event.getDate();
    const year = event.getFullYear();

    const dateStr = mon + "-" + day + "-" + year;
    const dcoketId = officeName + ":" + dateStr + ":" + id;
    this.dcoketId = dcoketId;
    next();
  } else {
    next();
  }
});
/*
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * * 
 */
// run the corn job at 1 st jan
cron.schedule("0 1 0 1 January *", (req, res, next) => {

  Counter.find({ model: "Pages" }, function (err, counters) {
    counters.forEach((counter) => {
      console.log(counter);
      Counter.counterReset("Pages", counter.identifier);
    });
  });
}); 

const Page = mongoose.model("Page", PageSchema);
module.exports = Page;
