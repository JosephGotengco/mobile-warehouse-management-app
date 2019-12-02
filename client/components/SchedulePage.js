import React, { Component } from 'react';
import { View, Dimensions, Text, ScrollView, Modal, Picker, Alert, Button, TouchableOpacity } from 'react-native';
import { CalendarList } from "react-native-calendars";
import { connect } from "react-redux";
import { addShift, deleteShift } from "./../actions/shiftActions";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Constants from './../constants';


class SchedulePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markedDates: {},
            agendaDates: {},
            selectedDate: "",
            currentDate: {
                dateString: "",
                dateNum: 0,
                month: 0,
                fullYear: 0
            },
            selectedShifts: [],
            modalVisible: false,
            months: Constants.MONTHS,
            startTimes: [],
            endTimes: [],
            amountOfYearsAllowed: 5,
            remainingDays: [],
            allowedYears: [],
            newShift: {
                date: {
                    date: "",
                    month: "",
                    year: ""
                },
                startTime: "",
                endTime: ""
            }
        }
        this.getShifts = this.getShifts.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    componentDidMount() {
        let { shifts } = this.props.user;

        // load data for markedDates and agendaDates
        let markedDates = {};
        let agendaDates = {};
        let selectedShifts = [];
        if (shifts) {
            for (dateKey of Object.keys(shifts)) {
                agendaDates[dateKey] = [{ ...shifts[dateKey] }];
                var date = shifts[dateKey].date;
                console.log(date);
                if (markedDates[date]) {
                    markedDates[date]['dots'].push({ key: dateKey, color: 'black' });
                } else {
                    markedDates[date] = {
                        dots: [{ key: dateKey, color: 'black' }]
                    }
                }
            }
            selectedShifts = Object.values(shifts).filter(shift => shift.date === currentDateString);
        }


        // Get the date in the PST time zone (Vancouver)
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc - (3600000 * 8));

        let currentDateNum = nd.getDate();
        let currentMonth = nd.getMonth();
        let currentFullYear = nd.getFullYear();
        var currentDateString = `${currentFullYear}-${currentMonth + 1}-${currentDateNum}`;
        this.getShifts(currentDateString);

        let currentDate = {
            dateString: currentDateString,
            dateNum: currentDateNum,
            month: currentMonth,
            fullYear: currentFullYear
        }
        let allowedYears = this.getYearsInRange(currentFullYear, this.state.amountOfYearsAllowed);
        let remainingDays = this.getDaysInMonth(currentDateNum, currentMonth + 1, currentFullYear);
        // get start times & end times
        let startTimes = this.getTimeInRange(Constants.START_TIME, Constants.END_TIME - Constants.MINIMUM_SHIFT_LENGTH);
        let endTimes = this.getTimeInRange(Constants.START_TIME + Constants.MINIMUM_SHIFT_LENGTH, Constants.END_TIME);
        this.setState({
            markedDates,
            agendaDates,
            selectedDate: currentDateString,
            currentDate,
            selectedShifts,
            remainingDays,
            allowedYears,
            startTimes,
            endTimes,
            newShift: {
                date: {
                    date: currentDateNum,
                    month: currentMonth,
                    year: currentFullYear
                },
                startTime: startTimes[0].value,
                endTime: endTimes[0].value
            }
        });
    }

    updateMarkedDates = shifts => {
        // load data for markedDates and agendaDates
        let markedDates = {};
        for (dateKey of Object.keys(shifts)) {
            // agendaDates[dateKey] = [{ ...shifts[dateKey] }];
            var date = shifts[dateKey].date;

            if (markedDates[date]) {
                markedDates[date]['dots'].push({ key: dateKey, color: 'black' });
            } else {
                markedDates[date] = {
                    dots: [{ key: dateKey, color: 'black' }]
                }
            }

            this.getShifts(this.state.selectedDate);
        }
        this.setState({ markedDates });
    }

    componentDidUpdate(prevProps) {
        let { shifts } = this.props.user;
        if (shifts) {
            // if there was a change in the number of shifts for the user
            if (!prevProps.user.shifts && Object.keys(shifts).length === 1) {
                // date.year, date.month + 1, date.date
                this.updateMarkedDates(shifts);
            } else if (Object.keys(prevProps.user.shifts).length !== Object.keys(shifts).length) {
                this.updateMarkedDates(shifts);
            }
        } else if (prevProps.user.shifts) {
            if (!shifts && Object.keys(prevProps.user.shifts).length === 1) {
                this.updateMarkedDates({});
                this.setState({ selectedShifts: [] });
            }
        }
    }

    getShifts = selectedDate => {
        let { shifts } = this.props.user;
        if (shifts) {
            let selectedShifts = [];
            for (var key in shifts) {
                if (shifts[key].date === selectedDate) {
                    selectedShifts.push({ key, ...shifts[key] });
                }
            }
            this.setState({ selectedShifts })
        }
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

    getDaysInMonth = (dateNum, month, year) => {
        // returns the remaining days in a month starting from date to the end of the month
        var monthIndex = month - 1;
        var date = new Date(Date.UTC(year, monthIndex, dateNum, 8, 30));
        var days = [];
        while (date.getMonth() === monthIndex) {
            days.push(new Date(date).getDate());
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    getYearsInRange = (year, numOfYears) => {
        years = []
        for (var i = 0; i < numOfYears; i++) {
            years.push(year + i)
        }
        return years
    }

    getTimeInRange = (startMinutes, endMinutes) => {
        var x = 30; //minutes interval
        var times = []; // time array
        var tt = startMinutes; // start time
        var et = endMinutes; // end time
        var ap = ['AM', 'PM']; // AM-PM

        //loop to increment the time and push results in array
        for (var i = 0; tt < et; i++) {
            let o = {}
            var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
            var mm = (tt % 60); // getting minutes of the hour in 0-55 format
            o.value = ("0" + (hh)).slice(-2) + ':' + ("0" + mm).slice(-2);
            o.label = ("0" + (hh % 12 === 0 ? 12 : hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)];
            times[i] = o // pushing data in array in [00:00 - 12:00 AM/PM format]
            tt = tt + x;
        }
        return times
    }

    onSubmit = () => {
        let { newShift } = this.state;
        let { date, startTime, endTime } = newShift;
        console.log(date.year, date.month + 1, date.date, startTime, endTime);
        this.props.addShift(date.year, date.month + 1, date.date, startTime, endTime)
            .then(result => {
                alert(this.props.shiftMsg)
            })
    }

    confirmShiftDelete = key => {
        Alert.alert(
            'Confirm Shift Cancel',
            'Are you sure you want to cancel this shift?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => this.props.deleteShift(key) },
            ],
            { cancelable: true }
        );
    }

    render() {
        let { selectedDate, currentDate, selectedShifts, months } = this.state;
        let todayOrDate;
        if (selectedDate === currentDate.dateString) {
            todayOrDate = `Today's Shifts`;
        } else {
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
                    futureScrollRange={12}
                    pastScrollRange={12}
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
                        selectedDayBackgroundColor: '#1BB9EA',
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
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                        <Text style={{ fontFamily: "Rubik-Bold", fontSize: 18, color: "#333333", display: 'flex', textAlign: 'center' }} >
                            {todayOrDate}
                        </Text>
                        <View style={{ height: 30, width: 30, borderRadius: 50, backgroundColor: '#46CDCD', marginLeft: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="plus" size={25} onPress={() => {
                                this.setModalVisible(true);
                            }}
                            />
                        </View>
                    </View>

                    {selectedShifts.map((shift, i) => {
                        const length = selectedShifts.length;
                        let { key, startTime, endTime } = shift;
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
                            flexDirection: "row", marginVertical: 10
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
                                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 12, color: "#000000", marginVertical: "auto" }}>{shiftType}</Text>
                                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 12, color: "#4F4F4F", marginVertical: "auto" }}>{startHourNormal}:{startMinute}{startMeridiem}-{endHourNormal}:{endMinute}{endMeridiem}</Text>
                                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 12, color: "#4F4F4F", marginVertical: "auto" }}>{hourDifference > 0 ? `${hourDifference} hours` : null}{minuteDifference > 0 ? `${minuteDifference} minutes` : null}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginLeft: 'auto' }}>
                                        <MaterialCommunityIcons name="window-close" size={25} color={"black"}
                                            onPress={() => {
                                                this.confirmShiftDelete(key);
                                            }} />
                                    </View>
                                </View>
                            )
                        } else {
                            return (
                                <View key={i} style={styles}>
                                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 12, color: "#000000", marginVertical: "auto" }}>{shiftType}</Text>
                                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 12, color: "#4F4F4F", marginVertical: "auto" }}>{startHourNormal}:{startMinute}{startMeridiem}-{endHourNormal}:{endMinute}{endMeridiem}</Text>
                                        <Text style={{ fontFamily: "Rubik-Regular", fontSize: 12, color: "#4F4F4F", marginVertical: "auto" }}>{hourDifference > 0 ? `${hourDifference} ${hourDifference > 1 ? "hours" : "hour"}` : null}{minuteDifference > 0 ? `${minuteDifference} minutes` : null}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginLeft: 'auto' }}>
                                        <MaterialCommunityIcons name="window-close" size={25} color={"black"}
                                            onPress={() => {
                                                this.confirmShiftDelete(key);
                                            }} />
                                    </View>
                                </View>
                            )
                        }

                    })}
                </ScrollView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this.setModalVisible(false) }}
                >
                    <TouchableOpacity
                        style={{ marginTop: 22, flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, zIndex: 2 }}
                        activeOpacity={1}
                        onPressOut={() => { this.setModalVisible(false) }}
                    >
                        <TouchableOpacity style={{ backgroundColor: "#E0E0E0", position: 'relative', minWidth: 300, padding: 20, borderRadius: 15 }}
                            activeOpacity={1}
                        >
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: "Rubik-Bold", fontSize: 26 }} >Add a new shift</Text>
                                <View>
                                    <MaterialCommunityIcons name="window-close" size={25} color={"black"}
                                        onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                        }} />
                                </View>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, paddingLeft: 5 }}>Date:</Text>
                            </View>
                            <View style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                                <Picker
                                    selectedValue={this.state.newShift.date.month}
                                    onValueChange={(itemValue, itemIndex) => {
                                        let { newShift } = this.state;
                                        newShift.date.month = itemValue;
                                        let { currentDate } = this.state;
                                        let newRemainingDays;
                                        if (currentDate.month === itemIndex && currentDate.fullYear === newShift.date.year) {
                                            let { dateNum, fullYear } = currentDate;
                                            newRemainingDays = this.getDaysInMonth(dateNum, itemIndex + 1, fullYear);
                                        } else {
                                            newRemainingDays = this.getDaysInMonth(1, itemIndex + 1, newShift.date.year);
                                        }
                                        this.setState({ newShift, remainingDays: newRemainingDays })
                                    }}
                                    style={{ height: 50, width: 100 }}>
                                    {this.state.months.map((month, i) => {
                                        return (<Picker.Item key={i} label={month} value={i} />)
                                    })}
                                </Picker>
                                <Picker
                                    selectedValue={this.state.newShift.date.date}
                                    onValueChange={(itemValue, itemIndex) => {
                                        let { newShift } = this.state;
                                        newShift.date.date = itemValue;
                                        this.setState({ newShift })
                                    }}
                                    style={{ height: 50, width: 90 }}>
                                    {this.state.remainingDays.map((date, i) => {
                                        return (<Picker.Item key={i} label={`${date}`} value={date < 10 ? `0${date}` : `${date}`} />)
                                    })}
                                </Picker>
                                <Picker
                                    selectedValue={this.state.newShift.date.year}
                                    onValueChange={(itemValue, itemIndex) => {
                                        let { newShift, currentDate } = this.state;
                                        newShift.date.year = itemValue;
                                        let newRemainingDays;
                                        let { dateNum, month } = currentDate;

                                        if (currentDate.month === newShift.date.month && currentDate.fullYear === itemValue) {
                                            newRemainingDays = this.getDaysInMonth(dateNum, parseInt(month) + 1, parseInt(itemValue));
                                        } else {
                                            newRemainingDays = this.getDaysInMonth(1, parseInt(month) + 1, parseInt(itemValue));
                                        }
                                        this.setState({ newShift, remainingDays: newRemainingDays })
                                    }}
                                    style={{ height: 50, width: 125 }}>
                                    {this.state.allowedYears.map((year, i) => {
                                        return (<Picker.Item key={i} label={`${year}`} value={year} />)
                                    })}
                                </Picker>
                            </View>
                            <View style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, paddingLeft: 5 }}>From:</Text>
                                    <Picker
                                        selectedValue={this.state.newShift.startTime}
                                        onValueChange={(itemValue, itemIndex) => {
                                            let { newShift } = this.state;
                                            newShift.startTime = itemValue;
                                            this.setState({ newShift })
                                        }}
                                        style={{ height: 50, width: 150 }}>
                                        {this.state.startTimes.map((o, i) => {
                                            return (<Picker.Item key={i} label={`${o.label}`} value={`${o.value}`} />)
                                        })}
                                    </Picker>
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16, paddingLeft: 5 }}>To:</Text>
                                    <Picker
                                        selectedValue={this.state.newShift.endTime}
                                        onValueChange={(itemValue, itemIndex) => {
                                            let { newShift } = this.state;
                                            newShift.endTime = itemValue;
                                            this.setState({ newShift })
                                        }}
                                        style={{ height: 50, width: 150 }}>
                                        {this.state.endTimes.map((o, i) => {
                                            return (<Picker.Item key={i} label={`${o.label}`} value={`${o.value}`} />)
                                        })}
                                    </Picker>
                                </View>
                            </View>
                            <View>
                                <Button title="Add Shift" onPress={this.onSubmit} />
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>

                </Modal>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loggedIn,
        shiftMsg: state.shift.shiftMsg
    }
}

export default connect(mapStateToProps, { addShift, deleteShift })(SchedulePage);