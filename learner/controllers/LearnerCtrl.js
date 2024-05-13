const { get } = require("mongoose");
const Learner = require("../models/Learner");

const boughtCourse = async (req, res) => {
  const { userId, courses,chapters } = req.body;

  try {
    let learner = await Learner.findOne({ userId });

    if (!learner) {
      // If user doesn't exist, create a new learner entry
      learner = await Learner.create({
        userId,
        enrolledCourses: courses,
        chapters,
      });
    } else {
      // If user exists, add new courses to enrolledCourses array
      courses.forEach((course) => {
        // Check if the course is already enrolled
        const existingCourseIndex = learner.enrolledCourses.findIndex(
          (c) => c.courseId === course.courseId
        );
        if (existingCourseIndex === -1) {
          // If course not enrolled, add it
          learner.enrolledCourses.push(course);
        } else {
          // If course already enrolled, update its details
          learner.enrolledCourses[existingCourseIndex].thumbnail =
            course.thumbnail;
          learner.enrolledCourses[existingCourseIndex].title = course.title;
          // No need to update enrollStatus as it's already pending
        }
      });
      await learner.save();
    }

    res.status(201).json(learner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const enrollToCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // Update the enrollStatus directly in the database
    const result = await Learner.updateOne(
      { userId, "enrolledCourses.courseId": courseId },
      { $set: { "enrolledCourses.$.enrollStatus": "enrolled" } }
    );

    if (result.nModified === 0) {
      // If no document is modified, it means the course wasn't found
      return res
        .status(404)
        .json({ error: "Course not found in enrolled courses" });
    }

    // Enrollment status updated successfully
    res.status(200).json({ message: "Course enrolled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const unenrollFromCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // Update the enrollStatus directly in the database
    const result = await Learner.updateOne(
      { userId, "enrolledCourses.courseId": courseId },
      { $set: { "enrolledCourses.$.enrollStatus": "pending" } }
    );

    if (result.nModified === 0) {
      // If no document is modified, it means the course wasn't found
      return res
        .status(404)
        .json({ error: "Course not found in enrolled courses" });
    }

    // Enrollment status updated successfully
    res.status(200).json({ message: "Course unenrolled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUserCourse = async (req, res) => {
  const userId = "663dbf52047945ec5914b733"; // Assuming userId is passed as a parameter in the URL

  try {
    // Find the user
    const learner = await Learner.findOne({ userId });

    if (!learner) {
      return res.status(404).json({ error: "User not found" });
    }
    // If the learner is found, return the enrolled courses
    return res.status(200).json(learner.enrolledCourses);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error fetching user courses:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const getAllEnrolledCourses = async (req, res) => {
  const { userId } = req.body; // Assuming userId is passed as a parameter in the URL

  try {
    // Find the user
    const learner = await Learner.findOne({ userId });

    if (!learner) {
      return res.status(404).json({ error: "User not found" });
    }

    // Filter enrolled courses with status "enrolled"
    const enrolledCourses = learner.enrolledCourses.filter(
      (course) => course.enrollStatus === "enrolled"
    );

    res.status(200).json(enrolledCourses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPendingEnrolledCourses = async (req, res) => {
  const { userId } = req.body; // Assuming userId is passed as a parameter in the URL

  try {
    // Find the user
    const learner = await Learner.findOne({ userId });

    if (!learner) {
      return res.status(404).json({ error: "User not found" });
    }

    // Filter enrolled courses with status "pending"
    const pendingEnrolledCourses = learner.enrolledCourses.filter(
      (course) => course.enrollStatus === "pending"
    );

    res.status(200).json(pendingEnrolledCourses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const calProgress = async (req, res) => {
  const { courseId } = req.body;
  userId = "663dbf52047945ec5914b733";

  try {
    // Fetch the user
    const learner = await Learner.findOne({ userId });

    if (!learner) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the enrolled course
    const enrolledCourse = learner.enrolledCourses.find(
      (course) => course.courseId === courseId
    );

    if (!enrolledCourse) {
      return res.status(404).json({ error: "Course not found for this user" });
    }

    // Calculate progress
    const totalChapters = enrolledCourse.chapters.length;
    const completedChapters = enrolledCourse.chapters.filter(
      (chapter) => chapter.status === "completed"
    ).length;

    // Calculate progress and round to the nearest integer
    const progress = Math.round((completedChapters / totalChapters) * 100);

    res.status(200).json({ progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changeChapterStatus = async (req, res) => {
  const { courseId, chapterId, status } = req.body;
  const userId = "663dbf52047945ec5914b733";

  try {
    // Find the learner
    const learner = await Learner.findOne({ userId });
    if (!learner) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the enrolled course
    const enrolledCourse = learner.enrolledCourses.find(
      (course) => course.courseId === courseId
    );
    if (!enrolledCourse) {
      return res.status(404).json({ error: "Course not found for this user" });
    }

    // Find the chapter within the enrolled course
    const chapterToUpdate = enrolledCourse.chapters.find(
      (chapter) => chapter.chapterId === chapterId
    );
    if (!chapterToUpdate) {
      return res
        .status(404)
        .json({ error: "Chapter not found for this course" });
    }

    // Update the chapter status
    chapterToUpdate.status = status;

    // Mark the learner document as modified
    learner.markModified("enrolledCourses");

    // Save the changes
    await learner.save();

    res.status(200).json({ message: "Chapter status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  const { courseId, note } = req.body;
  const userId = "663dbf52047945ec5914b733";

  try {
    // Find the learner
    const learner = await Learner.findOne({ userId });
    if (!learner) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the enrolled course
    const enrolledCourse = learner.enrolledCourses.find(
      (course) => course.courseId === courseId
    );
    if (!enrolledCourse) {
      return res.status(404).json({ error: "Course not found for this user" });
    }

    // Update the note
    enrolledCourse.note = note;

    // Mark the learner document as modified
    learner.markModified("enrolledCourses");
    
    // Save the changes
    await learner.save();

    res.status(200).json({ message: "Note updated successfully" });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getNote = async (req, res) => {
  const { courseId } = req.body;
  const userId = "663dbf52047945ec5914b733";
  
  try {
    // Find the learner
    const learner = await Learner.findOne({ userId });
    if (!learner) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the enrolled course

    const enrolledCourse = learner.enrolledCourses.find(
      (course) => course.courseId === courseId
    );

    if (!enrolledCourse) {
      return res.status(404).json({ error: "Course not found for this user" });
    }

    // Return the note
    res.status(200).json({ note: enrolledCourse.note });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}









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
  getNote
};
