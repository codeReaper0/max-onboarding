import {Text, ScrollView, View, Pressable} from "react-native";
import React, {useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import InputField from "@/components/forms/Input";
import Button from "@/components/ui/Button";
import {Picker} from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import SelectField from "@/components/forms/SelectField";
import {Link} from "expo-router";

const schema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email().required("Email is required"),
  phone_number: Yup.string().required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.string().required("DOB is required"),
  location: Yup.string().required("Location is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password")],
    "Password must match"
  ),
  agree: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
});

const genderOptions = [
  {label: "Select Gender", value: ""},
  {label: "Male", value: "male"},
  {label: "Female", value: "female"},
];

const initialValues = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  phone_number: "",
  gender: "",
  dob: "",
  location: "",
  password: "",
  confirm_password: "",
  agree: false,
};

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  return (
    <View style={{flex: 1, backgroundColor: "#000"}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            isValid,
          }) =>
            step === 1 ? (
              <View>
                <Text className="text-primary text-3xl font-robotoSemiBold text-center mb-6">
                  Sign up
                </Text>

                {/* First Name Input */}
                <InputField
                  label="First Name"
                  type="name"
                  name="first_name"
                  value={values.first_name}
                  onChangeText={handleChange("first_name")}
                  onBlur={handleBlur("first_name")}
                  error={errors.first_name}
                  touched={touched.first_name}
                  placeholder="John"
                />

                {/* Last Name Input */}
                <InputField
                  label="Last Name"
                  type="name"
                  name="last_name"
                  value={values.last_name}
                  onChangeText={handleChange("last_name")}
                  onBlur={handleBlur("last_name")}
                  error={errors.last_name}
                  touched={touched.last_name}
                  placeholder="Doe"
                />

                {/* Username Input */}
                <InputField
                  label="Username"
                  type="text"
                  name="username"
                  value={values.username}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  error={errors.username}
                  touched={touched.username}
                  placeholder="User"
                />

                {/* Email Input */}
                <InputField
                  label="Email address"
                  type="email"
                  name="email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={errors.email}
                  touched={touched.email}
                  placeholder="mail@provider.com"
                />

                {/* Phone Number Input */}
                <InputField
                  label="Phone number"
                  type="number"
                  name="phone_number"
                  value={values.phone_number}
                  onChangeText={handleChange("phone_number")}
                  onBlur={handleBlur("phone_number")}
                  error={errors.phone_number}
                  touched={touched.phone_number}
                  placeholder="12345678900"
                />

                {/* Gender Select */}
                <SelectField
                  label="Gender"
                  name="gender"
                  value={values.gender}
                  onValueChange={(itemValue) =>
                    setFieldValue("gender", itemValue)
                  }
                  error={errors.gender}
                  touched={touched.gender}
                  options={genderOptions}
                  bodyClass="mb-4"
                  extraClass="bg-white/5"
                />
                {/* Date of Birth Input */}
                <InputField
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  value={values.dob}
                  onChangeText={handleChange("dob")}
                  onBlur={handleBlur("dob")}
                  error={errors.dob}
                  touched={touched.dob}
                  placeholder="00-00-0000"
                  setFieldValue={setFieldValue}
                />

                {/* Location Input */}
                <InputField
                  label="Location"
                  type="text"
                  name="location"
                  value={values.location}
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                  error={errors.location}
                  touched={touched.location}
                  placeholder="e.g Lagos"
                />

                {/* Password Input */}
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={errors.password}
                  touched={touched.password}
                  placeholder="Enter your password"
                />

                {/* Confirm Password Input */}
                <InputField
                  label="Re-type password"
                  type="password"
                  name="confirm_password"
                  value={values.confirm_password}
                  onChangeText={handleChange("confirm_password")}
                  onBlur={handleBlur("confirm_password")}
                  error={errors.confirm_password}
                  touched={touched.confirm_password}
                  placeholder="12345678900"
                />

                {/* Agree Checkbox */}
                <View className="mb-4">
                  <View className="flex flex-row items-center px-4 gap-2">
                    <Checkbox
                      value={values.agree}
                      onValueChange={(value) => setFieldValue("agree", value)}
                      color={values.agree ? "#F5C200" : undefined}
                    />
                    <Text className="text-primary ml-2 leading-8">
                      By creating an account, I accept the Terms of Service and
                      Privacy Policy of iexplore
                    </Text>
                  </View>
                  {errors.agree && touched.agree && (
                    <Text className="text-xs text-primary mt-1">
                      {errors.agree}
                    </Text>
                  )}
                </View>

                {/* Submit Button */}
                <Button
                  title="Sign up"
                  onPress={handleSubmit}
                  disabled={!isValid}
                />
                <Text className="text-white/70 font-interSemiBold text-sm text-center my-3">
                  Already have an account?{" "}
                  <Link className="text-primary" href={"/login"}>
                    Log in
                  </Link>
                </Text>
              </View>
            ) : (
              <View>
                <Pressable className="mb-12">
                  <Text className="text-primary">Back</Text>
                </Pressable>
                <Text className="text-primary text-3xl font-robotoSemiBold text-center mb-14">
                  Confirmation
                </Text>

                <View className="border border-primary rounded-2xl mx-6 bg-white/5 p-4 mb-10">
                  <Text className="text-primary text-2xl font-interMedium text-center mb-1">
                    28 years old
                  </Text>
                  <Text className="text-white/70 text-sm text-center">
                    (February 18, 1990)
                  </Text>
                </View>

                <Text className="text-white/60 leading-7 text-lg text-center max-w-[250px] mx-auto">
                  As part of our commitment to responsible drinking, please
                  confirm your age displayed above is correct and you are of
                  legal drinking age.
                </Text>

                <Button
                  title="Yes i confirm"
                  onPress={handleSubmit}
                  className="mt-[200px]"
                />
              </View>
            )
          }
        </Formik>
      </ScrollView>
    </View>
  );
}
