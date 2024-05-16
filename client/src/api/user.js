import useUserStore from "@/stores/auth";
import api from "./build-client";

export const getEnrolledCourses = async () => {
  api
    .get("/learner/getusercourses")
    .then((response) => {
      useUserStore.setState({ enrolledCourses: response.data });
      console.log(response.data);
    })
    .catch((error) => console.log(error));
};
