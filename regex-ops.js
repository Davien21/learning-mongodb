const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('Connected to MongoDb...'))
.catch(err=>console.error('Could not connect to MongoDB...',err));

const courseSchema = new mongoose.Schema({
  name: String,
  author:String,
  tags:[String],
  date: { type: Date, default: Date.now },
  isPublished : Boolean
})
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name : 'Angular Course',
    author: 'Mosh',
    tags: ['angular','frontend'],
    isPublished: true
  });
  const result = await course.save();
  console.log(result)
}

async function getCourses() {
  //or 
  //and

  const courses = await Course
  // .find({author: "Mosh",isPublished:true})
  //Contains  mosh and is case-insensitive
  .find({author: /.*Mosh.*/i})
  .limit(10)
  .sort({name:1})
  .select({name:1,tags:1})
  console.log(courses);
}
getCourses();
// createCourse();
