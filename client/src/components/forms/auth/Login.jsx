import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import FormError from "../FormError";
import axios from "axios";
import TextLoader from "@/components/loaders/TextLoader";
import useUserStore from "@/stores/auth";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    // .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);

  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post("https://udemy.dev/api/users/signin", values)
        .then((response) => {
          // console.log(response.data);
          setUser(response.data);
          if (response.data.role === "admin") {
            navigate("/admin/dashboard");
          } else if (response.data.role === "instructor") {
            navigate("/instructor/courses");
          } else {
            navigate("/");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response?.data?.error?.message || error.message);
          setLoading(false);
        });
    },
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-ubunutu text-black/80">
            Login to EduFlex
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="mb-1"
            />
            {formik.touched.email && formik.errors.email && (
              <FormError error={formik.errors.email} />
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="mb-1"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <FormError error={formik.errors.password} />
          )}
        </CardContent>
        <CardFooter>
          <Button
            variant="green"
            type="submit"
            className="w-28"
            onClick={formik.handleSubmit}
            disabled={loading}
          >
            {loading ? <TextLoader /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
