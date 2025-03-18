import {Text, ScrollView, View} from "react-native";
import React, {useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import InputField from "@/components/forms/Input";
import Button from "@/components/ui/Button";
import {Link, useRouter} from "expo-router";
import {useToast} from "@/contexts/ToastProviders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAuth} from "@/contexts/AuthContexts";
import apiEndpoints from "@/lib/axios";

// Define the validation schema
const schema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// Define the initial values
const initialValues = {
  email: "",
  password: "",
};

const LoginPage: React.FC = () => {
  const {showToast} = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();

  const handleLogin = async (values: {email: string; password: string}) => {
    setLoading(true);
    try {
      const response = await apiEndpoints.login(values);
      console.log(response.data);
      await login(response.data.access, response.data.user);

      showToast("Login successful!", "success");
      router.replace("/home");
    } catch (error: any) {
      console.log(error);
      console.log(error.response.data);
      showToast(
        error.response?.data?.non_field_errors[0] ||
          "An error occurred. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

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
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
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
                title={loading ? "Logging in..." : "Log in"}
                onPress={handleSubmit}
                disabled={!isValid || loading}
              />
              <Text className="text-white/70 font-interSemiBold text-sm text-center my-3">
                Don't have an account?{" "}
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
};

export default LoginPage;
