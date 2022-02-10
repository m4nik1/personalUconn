import React, { useEffect, useState } from "react";

import { View, Text, ScrollView, StyleSheet, FlatList, Button, Pressable, TouchableOpacity } from "react-native";
import moment from "moment";
import ClassCard from "../components/Class";
import { classItems } from "../data/classData";
import DateSwitch from "../components/ClassDateSwitch";


const Home = props => {

    let dayNumber = moment().format("Do")

    const currentMinutes = moment().format("mm");
    const [day, changeDay] = useState(moment().format('dddd'));
    const [data, changeData] = useState();
    const [dayNum, changeNumber] = useState(dayNumber)
    const [dayCounter, changeCounter] = useState(1);

    let todaysDate = moment().format(" MMM");

    function dayChange() {
        if(dayCounter < 5){ 
            changeCounter(dayCounter+1)
        }
        changeNumber(moment().add(dayCounter, 'days').format('D'));
        changeDay(moment().add(dayCounter, 'days').format('dddd'))
    }

    function backToday() {
        changeNumber(moment().format("Do"));
        changeDay(moment().format('dddd'))
        changeCounter(1)
    }
    

    useEffect(() => {
        changeData(classItems[day])
    }, [currentMinutes, day])

        return (
            <View>
                <View style={styles.classContainer}>
                    <Text style={styles.title}>Classes</Text>
                    <View style={styles.dateContainer}>
                        <TouchableOpacity onPress={() => backToday()}>
                            <Text style={styles.date}>{ day + todaysDate + " " + dayNum }</Text>
                        </TouchableOpacity>
                        <Button style={styles.TomorrowBtn} title="Next" onPress={() => dayChange()} />
                    </View>
                    <FlatList
                        keyExtractor={item => item.id}
                        style={styles.scrollView}
                        data={data}
                        renderItem={itemData => (
                            <ClassCard
                                hour={itemData.item.hour}
                                minute={itemData.item.minute}
                                ClassName={itemData.item.className}
                                Time={itemData.item.time}
                                prof={itemData.item.profName}
                                location={itemData.item.location}
                                mode={itemData.item.mode}
                            />
                        )}
                    />
                </View>
            </View>
        )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column"
    },
    classContainer:{
        alignContent: "center",
        alignItems: "center",
        height: "100%"
    },
    title: {
        alignItems:"center",
        marginTop:50,
        fontSize: 40,
        paddingTop: 20
    },
    scrollView: {
        width: "100%",
        height: "50%"
    },
    backBtn: {
        marginTop: 50,
        marginRight: 300
    },
    dateContainer: {
        flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center'
    },
    date: {
        fontSize: 23
    },
    TomorrowBtn: {
    }
})



export default Home;