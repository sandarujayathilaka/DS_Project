const Learner = require("../models/Learner");

const boughtCourse = async (req, res) => {
  const { userId, courses } = req.body;

  try {
    let learner = await Learner.findOne({ userId });

    if (!learner) {
      // If user doesn't exist, create a new learner entry
      learner = await Learner.create({
        userId,
        enrolledCourses: courses,
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
  const { userId } = req.body; // Assuming userId is passed as a parameter in the URL

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
getAllEnrolledUsers
};
