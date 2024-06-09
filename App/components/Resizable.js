import { Dimensions } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export function Resizable({ children, onChange }) {
  const scale = useSharedValue(1);
  const startScale = useSharedValue(0);

  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate((event) => {
      scale.value = clamp(
        startScale.value * event.scale,
        0.5,
        Math.min(width / 100, height / 100)
      );
      onChange(scale.value);
    })
    .runOnJS(true);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pinch}>{children}</GestureDetector>
    </GestureHandlerRootView>
  );
}
