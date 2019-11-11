import React, { Component } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { CalendarList } from "react-native-calendars";
import { connect } from "react-redux";

class SchedulePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markedDates: {},
            agendaDates: {},
            selectedDate: {}
        }
    }

    componentDidMount() {
        let { shifts } = this.props.user;

        // load data for markedDates and agendaDates
        let markedDates = {};
        let agendaDates = {};
        for (dateKey of Object.keys(shifts)) {
            agendaDates[dateKey] = [{ ...shifts[dateKey] }];
            var date = new Date(parseInt(dateKey));
            var date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
            if (markedDates[date]) {
                markedDates[date]['dots'].push({ key: dateKey, color: 'black' });
            } else {
                markedDates[date] = {
                    dots: [{ key: dateKey, color: 'black' }]
                }
            }
        }

        this.setState({
            markedDates,
            agendaDates
        });
    }

    componentDidUpdate(prevProps) {
        // if there was a change in the number of shifts for the user
        if (Object.keys(prevProps.user.shifts).length !== Object.keys(this.props.user.shifts).length) {
            // load data for markedDates and agendaDates
            let markedDates = {};
            let agendaDates = {};
            for (dateKey of Object.keys(shifts)) {
                agendaDates[dateKey] = [{ ...shifts[dateKey] }];
                var date = new Date(parseInt(dateKey));
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

    render() {
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
                    onDayPress={selectedDate => this.setState({ selectedDate })}
                    markingType={'multi-dot'}
                    markedDates={this.state.markedDates}
                    style={{
                        marginTop: 60,
                        height: Dimensions.get('window').height / 2
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
                <View style={{
                    flex: 1, width: '100%', backgroundColor: "#F2F2F2",
                    marginTop: (-Dimensions.get('window').height / 2) + 100,
                    borderTopLeftRadius: 40, borderTopRightRadius: 40,
                    paddingHorizontal: 25, paddingTop: 20
                }}>
                    <Text style={{ fontFamily: "Rubik-Bold", fontSize: 18, color: "#333333" }}>
                        Today's Shifts {"\n"} {this.state.selectedDate.dayString}
                    </Text>
                </View>
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