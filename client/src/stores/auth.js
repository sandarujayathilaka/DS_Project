import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create()(
  persist(
    (set) => ({
      user: null,
      token: null,
      enrolledCourses: null,
      setUser: (user) => set(() => ({ user })),
      setToken: (token) => set(() => ({ token })),
      setEnrolledCourses: (enrolledCourses) => set(() => ({ enrolledCourses })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
