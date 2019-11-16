import React, { Component } from 'react';
import { View, Dimensions, Text, ScrollView } from 'react-native';
import { CalendarList } from "react-native-calendars";
import { connect } from "react-redux";

class SchedulePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markedDates: {},
            agendaDates: {},
            selectedDate: "",
            selectedShifts: []
        }
        this.getShifts = this.getShifts.bind(this);
    }

    componentDidMount() {
        let { shifts } = this.props.user;

        // load data for markedDates and agendaDates
        let markedDates = {};
        let agendaDates = {};
        for (dateKey of Object.keys(shifts)) {
            agendaDates[dateKey] = [{ ...shifts[dateKey] }];
            var date = new Date(...dateKey.split("-"));
            var date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
            if (markedDates[date]) {
                markedDates[date]['dots'].push({ key: dateKey, color: 'black' });
            } else {
                markedDates[date] = {
                    dots: [{ key: dateKey, color: 'black' }]
                }
            }
        }

        // Get the date in the PST time zone (Vancouver)
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc - (3600000 * 8));
        var currentDate = `${nd.getFullYear()}-${nd.getMonth() + 1}-${nd.getDate()}`;
        console.log(currentDate)
        let selectedShifts = Object.values(shifts).filter(shift => shift.date === currentDate);
        console.log(selectedShifts);
        this.setState({
            markedDates,
            agendaDates,
            selectedDate: currentDate,
            currentDate,
            selectedShifts
        });
    }

    componentDidUpdate(prevProps) {
        // if there was a change in the number of shifts for the user
        if (Object.keys(prevProps.user.shifts).length !== Object.keys(this.props.user.shifts).length) {
            // load data for markedDates and agendaDates
            let markedDates = {};
            let agendaDates = {};
            for (dateKey of Object.keys(shifts)) {
                // agendaDates[dateKey] = [{ ...shifts[dateKey] }];
                console.log(dateKey.split("-"))
                var date = new Date(...dateKey.split("-"));
                var date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                if (markedDates[date]) {
                    markedDates[date]['dots'].push({ key: dateKey, color: 'black' });
                } else {
                    markedDates[date] = {
                        dots: [{ key: dateKey, color: 'black' }]
                    }
                }
            }
        }
    }

    getShifts = selectedDate => {
        console.log('SELECTED DATE INPUT', selectedDate);
        let { shifts } = this.props.user;
        let selectedShifts = Object.values(shifts).filter(shift => shift.date === selectedDate);
        console.log(selectedShifts);
        this.setState({ selectedShifts })
    }

    calcHourDiff = (startHour, startMinute, endHour, endMinute) => {
        if (endMinute - startMinute < 0) {
            endHour -= 1;
            var minuteDifference = endMinute + 60 - startMinute;
        } else {
            minuteDifference = endMinute - startMinute;
        }
        var hourDifference = endHour - startHour;
        return [hourDifference, minuteDifference];
    }

    render() {
        let { selectedDate, currentDate, selectedShifts } = this.state;
        let { shifts } = this.props.user;
        let todayOrDate;
        if (selectedDate === currentDate) {
            todayOrDate = `Today's Shifts`;
        } else {
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            console.log(selectedDate)
            var selectedDateArr = selectedDate.split("-");
            var year = selectedDateArr[0];
            var month = selectedDateArr[1];
            var date = selectedDateArr[2];
            todayOrDate = `Shifts for ${months[month - 1]} ${date}, ${year}`;
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#F2F2F2", }}>
                <CalendarList
                    horizontal={true}
                    pagingEnabled={true}
                    calendarWidth={Dimensions.get('window').width}
                    calendarHeight={Dimensions.get('window').height / 2}
                    showScrollIndicator={true}
                    scrollEnabled={true}
                    futureScrollRange={25}
                    pastScrollRange={25}
                    onDayPress={selectedDate => {
                        this.setState({ selectedDate: selectedDate.dateString });
                        this.getShifts(selectedDate.dateString);
                    }}
                    markingType={'multi-dot'}
                    markedDates={this.state.markedDates}
                    style={{
                        marginTop: 60,
                        height: Dimensions.get('window').height / 2,
                        flex: 1
                    }}
                    theme={{
                        backgroundColor: "#F2F2F2",
                        calendarBackground: "#F2F2F2",
                        textMonthFontFamily: "Rubik-Bold",
                        textMonthFontSize: 32,
                        selectedDayBackgroundColor: "#46CDCD",
                        textDayFontFamily: 'Rubik-Regular',
                        textMonthFontFamily: 'Rubik-Regular',
                        textDayHeaderFontFamily: 'Rubik-Regular',
                        'stylesheet.calendar.header': {
                            header: {
                                alignItems: 'flex-start'
                            }
                        }
                    }}
                />
                <ScrollView style={{
                    flex: 1, width: '100%', backgroundColor: "#F2F2F2", flexGrow: 1,
                    marginTop: (-Dimensions.get('window').height / 2) + 100,
                    borderTopLeftRadius: 40, borderTopRightRadius: 40,
                    paddingHorizontal: 25, paddingTop: 20
                }}>
                    <Text style={{ fontFamily: "Rubik-Bold", fontSize: 18, color: "#333333" }}>
                        {todayOrDate}
                        {"\n"}
                        {/* {JSON.stringify(selectedShifts, null, 4)} */}
                    </Text>
                    {selectedShifts.map((shift, i) => {
                        const length = selectedShifts.length;
                        let { date, startTime, endTime } = shift;
                        var startTimeArr = startTime.split(":");
                        var endTimeArr = endTime.split(":");
                        var startHour = startTimeArr[0];
                        var startMinute = startTimeArr[1];
                        var endHour = endTimeArr[0];
                        var endMinute = endTimeArr[1];

                        var diffArr = this.calcHourDiff(startHour, startMinute, endHour, endMinute);
                        var hourDifference = diffArr[0];
                        var minuteDifference = diffArr[1];

                        var startMeridiem = startHour < 12 ? "am" : "pm";
                        var endMeridiem = endHour < 12 ? "am" : "pm";
                        var startHourNormal = startHour < 12 ? startHour : startHour - 12;
                        var endHourNormal = endHour < 12 ? endHour : endHour - 12;
                        const styles = {
                            height: 70, width: '100%', backgroundColor: "#E0E0E0",
                            borderRadius: 15, padding: 10, display: "flex", justifyContent: 'flex-start',
                            flexDirection: "column", marginVertical: 10
                        }

                        let shiftType;
                        if (startHour < 9) {
                            shiftType = "Morning Shift";
                        } else if (startHour < 12) {
                            shiftType = "Mid-Day Shift";
                        } else if (startHour < 21) {
                            shiftType = "Evening Shift";
                        } else {
                            shiftType = "Overnight Shift";
                        }

                        if (i + 1 === length) {
                            return (
                                <View key={i} style={{ ...styles, marginBottom: 40 }}>
                                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 12, color: "#000000", marginVertical: "auto" }}>{shiftType}</Text>
                                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 12, color: "#4F4F4F", marginVertical: "auto" }}>{startHourNormal}:{startMinute}{startMeridiem}-{endHourNormal}:{endMinute}{endMeridiem}</Text>
                                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 12, color: "#4F4F4F", marginVertical: "auto" }}>{hourDifference > 0 ? `${hourDifference} hours` : null}{minuteDifference > 0 ? `${minuteDifference} minutes` : null}</Text>
                                </View>
                            )
                        } else {
                            return (
                                <View key={i} style={styles}>
                                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 12, color: "#000000", marginVertical: "auto" }}>{shiftType}</Text>
                                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 12, color: "#4F4F4F", marginVertical: "auto" }}>{startHourNormal}:{startMinute}{startMeridiem}-{endHourNormal}:{endMinute}{endMeridiem}</Text>
                                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 12, color: "#4F4F4F", marginVertical: "auto" }}>{hourDifference > 0 ? `${hourDifference} ${hourDifference > 1 ? "hours" : "hour"}` : null}{minuteDifference > 0 ? `${minuteDifference} minutes` : null}</Text>
                                </View>
                            )
                        }

                    })}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps, {})(SchedulePage);