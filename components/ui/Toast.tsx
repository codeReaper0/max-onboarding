import React, {
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {Image, LayoutChangeEvent, StyleSheet} from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export interface IToast {
  show: (
    text: string,
    type: "info" | "success" | "error",
    duration: number
  ) => void;
  hide: (callback?: () => void) => void;
}

type ConfigProps = {
  text?: string;
  type?: "info" | "success" | "error";
  duration: number;
};

interface Props {
  ref: Ref<IToast>;
  duration?: number;
  onHide?: () => void;
}

const Toast = React.forwardRef<IToast, Omit<Props, "ref">>(
  ({duration = 400, onHide}, ref) => {
    const [toastHeight, setToastHeight] = useState(0);
    const [config, setConfig] = useState<ConfigProps>({
      text: undefined,
      type: undefined,
      duration: 0,
    });
    const visibleState = useRef(false);
    const timer = useRef<NodeJS.Timeout | null>(null);

    const transY = useSharedValue(-100); // Start above screen

    useImperativeHandle(ref, () => ({
      show,
      hide,
    }));

    useEffect(() => {
      if (config.text) {
        showToast();
        timer.current = setTimeout(() => {
          hideToast();
        }, 4000);
      }

      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    }, [config]);

    const rView = useAnimatedStyle(() => {
      return {
        transform: [{translateY: transY.value}],
      };
    });

    return (
      <Animated.View
        onLayout={handleViewLayout}
        style={[styles.container, rView]}
      >
        <Animated.View style={styles.outerContainer}>
          <Animated.View
            style={[
              styles.innerContainer,
              {backgroundColor: generateBackgroundColor()},
            ]}
          >
            <Image source={generateImage()} style={styles.image} />
            <Animated.Text style={styles.text}>{config?.text}</Animated.Text>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );

    function show(
      text: string,
      type: "info" | "success" | "error",
      duration: number
    ) {
      setConfig({text, type, duration});
    }

    function hide(callback?: () => void) {
      hideToast(callback);
    }

    function generateImage() {
      if (config?.type === "success") {
        return require("icons/success.png");
      } else if (config?.type === "error") {
        return require("icons/error.png");
      } else {
        return require("icons/info.png");
      }
    }

    function generateBackgroundColor() {
      if (config?.type === "success") {
        return "#F5C200";
      } else if (config?.type === "error") {
        return "#f00a1d";
      } else {
        return "#0077ed";
      }
    }

    function showToast() {
      if (!visibleState.current) {
        visibleState.current = true;
        transY.value = withTiming(20, {
          duration: config.duration,
          easing: Easing.out(Easing.ease),
        });
      }
    }

    function hideToast(callback?: () => void) {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      transY.value = withTiming(
        -100,
        {
          duration: config.duration,
          easing: Easing.in(Easing.ease),
        },
        () => {
          runOnJS(handleOnFinish)(callback);
        }
      );
    }

    function handleOnFinish(callback?: () => void) {
      setConfig({
        text: undefined,
        type: undefined,
        duration: 0,
      });
      if (onHide) {
        onHide();
      }
      if (callback) {
        callback();
      }
      visibleState.current = false;
    }

    function handleViewLayout(event: LayoutChangeEvent) {
      setToastHeight(event.nativeEvent.layout.height);
    }
  }
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  outerContainer: {
    maxWidth: "100%",
    borderRadius: 30,
    overflow: "hidden",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 12,
    borderRadius: 30,
    minWidth: 100,
  },
  image: {
    width: 20,
    height: 20,
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 12,
    flexShrink: 1,
  },
});

export default Toast;
