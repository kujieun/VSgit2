import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ReviewContent from './ReviewContent';
import HomeReview from './HomeReview';
import ReadReview from './ReadReview';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ReviewContent" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeReview" component={HomeReview} />
        <Stack.Screen name="ReviewContent" component={ReviewContent} />
        <Stack.Screen name="ReadReview" component={ReadReview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
