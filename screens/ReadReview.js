import React from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

const ReadReview = ({route}) => {

    

    return (
        <View>
          {route.params.Review.map((data, index) => (
            <View key={index}>
              <Text style={{ margin: 50, marginBottom: 0, fontSize: 15, fontWeight: '600' }}>{data[0]}</Text>
              <View style={styles.imgcontainer}>
                {data[2]?.length > 0 ? (
                  <Image source={{ uri: data[2] }} style={styles.avatar} />
                ) : null}
              </View>
              <Text style={{ marginLeft: 40, marginTop: 15, fontSize: 12, color: '#5d5d5d' }}>{data[1]}</Text>
            </View>
          ))}
        </View>
      );


}

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

export default ReadReview;