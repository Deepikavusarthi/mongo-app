const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
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