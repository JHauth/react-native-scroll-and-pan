import React, { useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Animated, {
  useDerivedValue,
  useSharedValue,
  useWorkletCallback,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';
import ReText from './components/ReText';

/**
 * Gesture states 
 * (see https://docs.swmansion.com/react-native-gesture-handler/docs/under-the-hood/states-events)
 */
const STATES = {
  0: 'UNDETERMINED',
  1: ' FAILED',
  2: 'BEGAN',
  3: 'CANCELLED',
  4: 'ACTIVE',
  5: 'END',
};

export default function App() {
  const panRef = useRef(null);
  const scrollRef = useRef(null);

  // Log values
  const touchPosition = useSharedValue({ x: null, y: null });
  const touchPositionX = useDerivedValue(() => {
    return `x: ${touchPosition.value.x}`;
  });
  const touchPositionY = useDerivedValue(() => {
    return `y: ${touchPosition.value.y}`;
  });

  const state = useSharedValue([STATES[0], 'null', 'null']);
  const stateString = useDerivedValue(() => {
    return `${state.value[0]}\n${state.value[1]}\n${state.value[2]}`;
  });

  const appendState = useWorkletCallback((arr, value) => {
    return [value].concat(arr.slice(0, 2));
  }, []);

  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      state.value = appendState(state.value, STATES[e.state]);
    })
    .onStart((e) => {
      state.value = appendState(state.value, STATES[e.state]);
    })
    .onUpdate((e) => {
      if (state.value[0] !== STATES[e.state]) {
        state.value = appendState(state.value, STATES[e.state]);
      }
      touchPosition.value = { x: e.absoluteX, y: e.absoluteY };
    })
    .onEnd((e) => {
      state.value = appendState(state.value, STATES[e.state]);
    })
    .onFinalize((e) => {
      state.value = appendState(state.value, STATES[e.state]);
      touchPosition.value = { x: null, y: null };
    })
    .simultaneousWithExternalGesture(scrollRef)
    .withRef(panRef);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/** Logger */}
        <View style={{ padding: 16, height: 180, justifyContent: 'flex-end' }}>
          <ReText text={touchPositionX} />
          <ReText text={touchPositionY} />
          <Text>Gesture States (New -> Old):</Text>
          <ReText text={stateString} />
        </View>
        {/** ScrollView with pan gesture */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={{ flex: 1 }}>
            <ScrollView
              disallowInterruption={false}
              scrollEnabled={true}
              ref={scrollRef}
              style={{ flex: 1 }}
              simultaneousHandlers={panRef}>
              <Text>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet.
              </Text>
            </ScrollView>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}
