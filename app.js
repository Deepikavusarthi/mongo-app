const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://s589690_db_user:test12345@cluster0.fzfyisv.mongodb.net/learnMongo?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    const studentSchema = new mongoose.Schema({
      name: String,
      className: String,
      assignment: String
    });

    const Student = mongoose.model("Student", studentSchema);

    return Student.create({
      name: "Deepika",
      className: "Web Apps",
      assignment: "Assignment 11"
    });
  })
  .then((doc) => {
    console.log("Inserted document:", doc);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error:", err);
    
  });