const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('Connected to MongoDb...'))
.catch(err=>console.error('Could not connect to MongoDB...',err));

const courseSchema = new mongoose.Schema({
  name: String,
  author:String,
  tags:[String],
  date: { type: Date, default: Date.now },
  isPublished : Boolean,
  price :Number
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
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course
  .find({author: "Mosh", isPublished:true})
  .skip((pageNumber -1) * pageSize)
  .limit(pageSize)
  .sort({name:1})
  .count()
  console.log(courses);
}

async function updateCourse(id) {
  // course.set({
  //   isPublished : true,
  //   author : 'Chidiebere'
  // })
  //Approach : Query first
  //findById()
  //Modify its properties
  //save()

  //Approach update first
  // Update directly
  //Optionally:  get the updated document
  if (!id.match(/^[0-9a-fA-F]{24}$/)) return console.log('invalid id');
  const course = await Course.findByIdAndUpdate(id, {
    $set : {
      author : 'Jason',
      isPublished : false
    }
  },{useFindAndModify : false, new : true})
    console.log(course);
}

// getCourses();
updateCourse('5a68fde3f09ad7646ddec17e');
