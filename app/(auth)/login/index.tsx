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
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

export default function LoginPage() {
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
          }) => (
            <View>
              <Text className="text-primary text-3xl font-robotoSemiBold text-center mb-6">
                Log in
              </Text>

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

              {/* Submit Button */}
              <Button
                title="Log in"
                onPress={handleSubmit}
                disabled={!isValid}
              />
              <Text className="text-white/70 font-interSemiBold text-sm text-center my-3">
                Already have an account?{" "}
                <Link className="text-primary" href={"/register"}>
                  Sign up
                </Link>
              </Text>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}
