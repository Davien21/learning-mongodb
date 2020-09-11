const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('Connected to MongoDb...'))
.catch(err=>console.error('Could not connect to MongoDB...',err));

const courseSchema = new mongoose.Schema({
  name: { 
    type : String, 
    required : true,
    minlength : 5,
    maxlength : 255,
    // match : /pattern/
  },
  category : {
    type : String,
    required : true,
    enum : ['web', 'mobile', 'network']
  },
  author : String,
  tags : { 
    type : Array,
    validate : {
      validator : function (v) {
        return v && v.length > 0;
      },
      message : 'A course needs at least one tag'
    }
  },
  date : { type: Date, default: Date.now },
  isPublished : Boolean,
  price : { 
    type : Number, 
    min : 10,
    max : 200,
    required : function () {
      return this.isPublished;
    } 
  }
})
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name : 'Angular Course',
    category : 'web',
    author: 'Mosh',
    tags: null,
    isPublished: true,
    price : 15
  });
  try {
    const result = await course.save();
    console.log(result)
  }catch (err) {
    console.log(err.message);
  }
  
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
  //Approach update first
  // Update directly
  //Optionally:  get the updated document
  if (!id.match(/^[0-9a-fA-F]{24}$/)) return console.log('invalid id');
  const course = await Course.findByIdAndUpdate(id, 
    {
      $set : {
        author : 'Jason',
        isPublished : false
      }
    },{useFindAndModify : false, new : true}
  )
    console.log(course);
}

async function removeCourse(id) {
  //Approach update first
  // Update directly
  //Optionally:  get the updated document
  if (!id.match(/^[0-9a-fA-F]{24}$/)) return console.log('invalid id');
  // const result = await Course.deleteMany({ _id : id})
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

// getCourses();
createCourse();