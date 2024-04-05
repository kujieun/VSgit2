import React, { useState } from 'react'
import { View, Button, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const ReviewContent = ({ navigation }) => {
    
    //navigation parameter 전달
    const goToPassingParameterScreen = () => {
        if (navigation) {
          navigation.navigate('HomeReview', {

            // ReviewList: ReviewList,

          });
        } else {
          console.error("Navigation object is undefined");
          // Handle the case where navigation object is undefined
        }
    };

    const [avatar, setAvatar] = useState('')
    const [title, setTitle] = useState('여행기 제목(필수)')
    const [content, setContent] = useState('이번 여행은 어떤 여행이었나요? 여행에 대한 한 줄 요약 또는 여행 꿀팁을 남겨보세요.')
    const [val_title, Valtitle] = useState(0)
    const [val_content, Valcontent] = useState(0)
    const [userID, setID] = useState(0)

    //초기화 방지
    const [ReviewList, setReviewList] = useState([])

    const saveDataToServer = async () => {
        try {
            // 서버로 데이터를 전송하기 위한 POST 요청 보내기
            const response = await axios.post('https://your-server-url.com/save-review', {
                avatar: avatar,
                title: title,
                content: content,
            });
            
            // 서버로부터 응답 받은 데이터 처리
            console.log('서버 응답:', response.data);
            
            // 서버에서 생성된 사용자 ID 받아오기
            const serverUserID = response.data.userID;

            // AsyncStorage를 사용하여 사용자 ID 저장
            await AsyncStorage.setItem('userID', serverUserID);

            // 리뷰 목록 화면으로 이동
            goToPassingParameterScreen();
        } catch (error) {
            console.error('서버 통신 오류:', error);
        }
    };

    //이미지 선택
    const addImage = () => {
        launchImageLibrary({}, response => {
          setAvatar(response.assets[0].uri);
        });
    };

    //날짜 선택
    const selectDay = () => {
        console.log('selectDay');
    }

    //title 초기화
    const changeTitle = () => {
        if(val_title == 0)
            setTitle('');
        Valtitle(1);
    }

    //content 초기화
    const changeContent = () => {
        if(val_content == 0)
            setContent('');
        Valcontent(1);
    }

    // //데이터 저장
    // const saveData = async (avatar, title, content) => {
    //     setID(userID+1)

    //     try {
    //       if (avatar !== undefined) {
    //         await AsyncStorage.setItem({userID}+'avatar', JSON.stringify(avatar));
    //       }
    //       if (title !== undefined) {
    //         await AsyncStorage.setItem({userID}+'title', JSON.stringify(title));
    //       }
    //       if(content !== undefined) {
    //         await AsyncStorage.setItem({userID}+'content', JSON.stringify(content));
    //     }
         
    //     } catch (e) {
    //       // saving error
    //       console.error('데이터 저장 오류:', e.message);
    //     }

    //     //작성한 내용들을 배열에 저장
    //     const resultArray = await loadData(); //저장소 값 불러옴
    //     ReviewList.push(resultArray) //배열에 push

    //     goToPassingParameterScreen();
    // }

    
    // //데이터 불러오기(데이터 반환)
    // const loadData = async () => {
    //     try {
    //         const title = JSON.parse(await AsyncStorage.getItem({userID}+'title'));
    //         const content = JSON.parse(await AsyncStorage.getItem({userID}+'content'));
    //         const avatar = JSON.parse(await AsyncStorage.getItem({userID}+'avatar'));
        
    //         //새롭게 저장한 값 반환(제목, 내용, 사진)
    //         return [title, content, avatar];

    //     } catch(e) {
    //     // error reading value
    //     }
    // }






    return (
        <View style = {{ flex: 1, backgroundColor : 'white'}}>
            {/* 페이지 관리 구간 */}
            <View style = {styles.container}>
                

                {/* 페이지 타이틀 */}
                <View>
                    <Text style = {{marginTop: 40, marginLeft: 150}}> 여행기 공유 </Text>
                </View>

                {/* 페이지 이동 버튼 */}
                <View style = {{marginLeft: 110, marginTop: 29,}}>
                    <Button title = '✔️' onPress={() => saveDataToServer}/>
                </View>
            </View>

            {/* 이미지 삽입 구간 */}
            <View  style={styles.container}>
                {/* 이미지 추가 버튼 */}
                <View style={styles.btncontainer}>
                    <Button title="+" onPress={() => addImage() }/>
                </View>
                {/* 이미지가 추가되는 공간 */}
                <View style={styles.imgcontainer}>
                    {avatar?.length > 0 ? (
                    <Image source={{uri: avatar}} style={styles.avatar} />
                    ) : null}
                    
                </View>
            </View>

            {/* 제목 입력 */}
            <View style={{borderBottomWidth: 5, borderBottomColor: '#eaeaea'}}>
                <TextInput style = {{margin:20, padding: 7, marginBottom: 10, 
                borderBottomWidth: 1, borderBottomColor: '#eaeaea', fontSize: 25, color:'#a6a6a6'}} 
                        onPressIn={changeTitle}
                        value={title}
                        multiline //여러줄 입력가능
                        onChangeText={title => setTitle(title)}//textInput에서 값을 바꿀수 있도록
                />

                <TextInput style = {{margin:25, padding: 7, marginTop:0, marginBottom: 10, fontSize: 18, color:'#a6a6a6'}} 
                        onPressIn={changeContent}
                        value={content} 
                        multiline //여러줄 입력가능
                        onChangeText={content => setContent(content)}//textInput에서 값을 바꿀수 있도록
                />
            </View>

            {/* 일정 */}
            <View style = {{marginTop: 10,}}>
                {/* <Button title="일정 다시 가져오기" onPress={() => addImage() }/> */} 

                <TouchableOpacity style={{ margin: 15, width: 80, height: 50, backgroundColor: '#1478ff', paddingHorizontal: 21.5, paddingVertical: 14.5, borderRadius: 100}}
                    onPress = {selectDay}>
                        <Text style = {{color: 'white'}}>Day 1</Text>
                </TouchableOpacity>
            </View>

            <View style = {styles.container}>
                <Text style = {{ margin: 15, fontSize: 18, fontWeight: '500', marginRight: 260, }}> Day 1 </Text>
                <Button title = '✏️'/>
            </View>

            <View>
                <Text style = {{ margin: 15, fontSize: 15, fontWeight: '500', }}>1. 동대구역</Text>
                <Text style = {{ margin: 15, fontSize: 15, fontWeight: '500', }}>2. 더 현대 대구</Text>
                <Text style = {{ margin: 15, fontSize: 15, fontWeight: '500', }}>3. 호텔 인터불고</Text>
                <Text style = {{ margin: 15, fontSize: 15, fontWeight: '500', }}>4. 앞산 전망대</Text>

            </View>
        
        </View>
    
    )
}

//이미지 스타일
const styles = StyleSheet.create({
    //가로로정렬
    container:{
        flex: 1,
        flexDirection:'row',
    },
    //버튼
    btncontainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eaeaea',
      width: 87,
      height: 87,
      margin: 20,
      marginRight: 0,
    },
    //이미지 삽입 공간
    imgcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#bbd9f8',
        width: 87,
        height: 87,
        margin: 20,
    },
    //컨테이너 비 이미지 크기
    avatar: {
      width: '100%',
      height: '100%',
    },
  });

  export default ReviewContent;