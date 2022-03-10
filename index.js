const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: Date,
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => {
    console.log("Connected to MongoDB/mongo-exercises database...");
  })
  .catch((err) => {
    console.error("Couldn't connect to the database!", err);
  });

// (1) Tüm yayınlanmış backend kurslarını listele
// async function getCourses() {
//   const courseList = await Course.find({ tags: "backend", isPublished: true });
//   console.log(courseList);
// }

// (2) Listelenen kursları adlarına göre sırala
// async function getCourses() {
//   const courseList = await Course.find({ isPublished: true }).sort({ name: 1 });
//   console.log(courseList);
// }

// (3) Sadece isimleri ve yayıncılarını seç ve listele
async function getCourses() {
  return await Course.find({ isPublished: true })
    .sort("name") // { name: 1 } ile aynı
    .select("name author"); // { name: 1, author: 1 } ile aynı
}

async function start() {
  const courseList = await getCourses();
  console.log(courseList);
}

start();
