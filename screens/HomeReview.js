import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation} from "@react-navigation/native";

const HomeReview = ({route}) => {
    /**
   * return에서 출력 시 route.params.ReviewList를 그대로 사용하면 오류 발생 
    -> 새로운 배열 생성 및 복사 후 사용 
  **/
  const Review = route.params.ReviewList
  const navigation = useNavigation();

  //navigation parameter 전달
  const goToPassingParameterScreen = (index) => {
    
    navigation.navigate('ReadReview', {

      Review: Review,
      key: index,

    });
   
};


  
  return (
    <View>
      <ScrollView>
      {Review.map((data, index) => (
        <TouchableOpacity onPress = {goToPassingParameterScreen(index)} key={index}>
          <Text style={{ margin: 50, marginBottom: 0, fontSize: 15, fontWeight: '600' }}>{data[0]}</Text>
          <View style={styles.imgcontainer}>
            {data[2]?.length > 0 ? (
              <Image source={{ uri: data[2] }} style={styles.avatar} />
            ) : null}
          </View>
          <Text style={{ marginLeft: 40, marginTop: 15, fontSize: 12, color: '#5d5d5d' }}>{data[1]}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imgcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    marginLeft: 40,
    marginTop: 15,
  },

  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default HomeReview;
