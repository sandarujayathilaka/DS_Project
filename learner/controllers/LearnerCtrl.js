const { get } = require("mongoose");
const Learner = require("../models/Learner");
const { default: axios } = require("axios");

//add new record to lerner when bought course
const boughtCourse = async (req, res) => {
  console.log("boutCourse");
  const { userId, courses, chapters } = req.body;

  try {
    let learner = await Learner.findOne({ userId });

    if (!learner) {
      learner = await Learner.create({
        userId,
        enrolledCourses: courses,
        chapters,
      });
    } else {
      courses.forEach((course) => {
        const existingCourseIndex = learner.enrolledCourses.findIndex(
          (c) => c.courseId === course.courseId
        );
        if (existingCourseIndex === -1) {
          learner.enrolledCourses.push(course);
        }
      });
      await learner.save();
    }

    await axios.delete(`http://cart-srv:4000/api/cart/deletecart/${userId}`);

    res.status(201).json(learner);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//enroll to specific course
const enrollToCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const result = await Learner.updateOne(
      { userId, "enrolledCourses.courseId": courseId },
      { $set: { "enrolledCourses.$.enrollStatus": "enrolled" } }
    );

    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ error: "Course not found in enrolled courses" });
    }

    res.status(200).json({ message: "Course enrolled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//unenroll from specific course
const unenrollFromCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const result = await Learner.updateOne(
      { userId, "enrolledCourses.courseId": courseId },
      { $set: { "enrolledCourses.$.enrollStatus": "pending" } }
    );

    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ error: "Course not found in enrolled courses" });
    }
    res.status(200).json({ message: "Course unenrolled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all courses of specific user
const getAllUserCourse = async (req, res) => {
  const userId = req.currentUser.id; 
console.log("UserId",userId)
  try {
    const learner = await Learner.findOne({ userId });

    if (!learner) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(learner.enrolledCourses);
  } catch (error) {
    console.error("Error fetching user courses:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all enrolled courses of specific user
const getAllEnrolledCourses = async (req, res) => {
  const userId = req.currentUser.id; 

  try {
    const learner = await Learner.findOne({ userId });

    if (!learner) {
      return res.status(404).json({ error: "User not found" });
    }

    const enrolledCourses = learner.enrolledCourses.filter(
      (course) => course.enrollStatus === "enrolled"
    );

    res.status(200).json(enrolledCourses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all pending enrolled courses of specific user
const getPendingEnrolledCourses = async (req, res) => {
  const userId = req.currentUser.id; 

  try {
    const learner = await Learner.findOne({ userId });

    if (!learner) {
      return res.status(404).json({ error: "User not found" });
    }

    const pendingEnrolledCourses = learner.enrolledCourses.filter(
      (course) => course.enrollStatus === "pending"
    );

    res.status(200).json(pendingEnrolledCourses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//calculate progress of specific user
const calProgress = async (req, res) => {
  const { courseId } = req.body;
  userId = req.currentUser.id;

  try {
    const learner = await Learner.findOne({ userId });

    if (!learner) {
      return res.status(404).json({ error: "User not found" });
    }

    const enrolledCourse = learner.enrolledCourses.find(
      (course) => course.courseId === courseId
    );

    if (!enrolledCourse) {
      return res.status(404).json({ error: "Course not found for this user" });
    }

    const totalChapters = enrolledCourse.chapters.length;
    const completedChapters = enrolledCourse.chapters.filter(
      (chapter) => chapter.status === "completed"
    ).length;

    const progress = Math.round((completedChapters / totalChapters) * 100);

    res.status(200).json({ progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//change chapter status of specific user
const changeChapterStatus = async (req, res) => {
  const { courseId, chapterId, status } = req.body;
  console.log("status",status,chapterId,courseId)
  const userId = req.currentUser.id;

  console.log(courseId, chapterId, status, userId);

  try {
    const learner = await Learner.findOne({ userId });
    if (!learner) {
      return res.status(404).json({ error: "User not found" });
    }

    const enrolledCourse = learner.enrolledCourses.find(
      (course) => course.courseId === courseId
    );
    console.log(enrolledCourse)
    if (!enrolledCourse) {
      return res.status(404).json({ error: "Course not found for this user" });
    }

    console.log(enrolledCourse.chapters)

    const chapterToUpdate = enrolledCourse.chapters.find(
      (chapter) => chapter._id === chapterId
    );
    console.log("chapterToUpdate", chapterToUpdate);
    if (!chapterToUpdate) {
      return res
        .status(404)
        .json({ error: "Chapter not found for this course" });
    }

    chapterToUpdate.status = status;

    learner.markModified("enrolledCourses");

    await learner.save();

    res.status(200).json({ message: "Chapter status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update note of specific user
const updateNote = async (req, res) => {
  const { courseId, note } = req.body;
  console.log(req.currentUser.id);
  const userId = req.currentUser.id;

  try {
    const learner = await Learner.findOne({ userId });
    if (!learner) {
      return res.status(404).json({ error: "User not found" });
    }

    const enrolledCourse = learner.enrolledCourses.find(
      (course) => course.courseId === courseId
    );
    if (!enrolledCourse) {
      return res.status(404).json({ error: "Course not found for this user" });
    }

    enrolledCourse.note = note;

    learner.markModified("enrolledCourses");
    await learner.save();

    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get note of specific user
const getNote = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.currentUser.id;
  console.log("note",userId)
  
  try {
    const learner = await Learner.findOne({ userId });
    if (!learner) {
      return res.status(404).json({ error: "User not found" });
    }

    const enrolledCourse = learner.enrolledCourses.find(
      (course) => course.courseId === courseId
    );

    if (!enrolledCourse) {
      return res.status(404).json({ error: "Course not found for this user" });
    }

    res.status(200).json({ note: enrolledCourse.note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




const getAllEnrolledUsers = async (req, res) => {
  const users = await Learner.find();
  res.send(users);
};

module.exports = {
  boughtCourse,
  enrollToCourse,
  unenrollFromCourse,
  getAllEnrolledCourses,
  getPendingEnrolledCourses,
  getAllUserCourse,
  calProgress,
  changeChapterStatus,
  updateNote,
  getNote,
  getAllEnrolledUsers,
};
