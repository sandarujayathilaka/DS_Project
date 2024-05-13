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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useUserStore from "@/stores/auth";
import { useNavigate } from "react-router-dom";
import api from "@/api/build-client";

const LoginSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "student",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      api
        .post("/users/signup", values)
        .then((response) => {
          // console.log(response.data);
          setUser(response.data?.user);
          setToken(response.data?.token);
          if (response.data?.user?.role === "instructor") {
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
            Sign Up to EduFlex
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="mb-1"
            />
            {formik.touched.name && formik.errors.name && (
              <FormError error={formik.errors.name} />
            )}
          </div>
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
          <RadioGroup
            defaultValue="student"
            className="flex gap-6"
            value={formik.values.role}
            onValueChange={(value) => formik.setFieldValue("role", value)}
          >
            <div className="flex items-center space-x-2 mt-4">
              <RadioGroupItem value="student" id="student" />
              <Label htmlFor="student" className="cursor-pointer">
                Student
              </Label>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <RadioGroupItem value="instructor" id="instructor" />
              <Label htmlFor="instructor" className="cursor-pointer">
                Instructor
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button
            variant="green"
            type="submit"
            className="w-28"
            onClick={formik.handleSubmit}
            disabled={loading}
          >
            {loading ? <TextLoader /> : "Sign Up"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
