import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import DatePicker from "@dietime/react-native-date-picker";
import { postTrip } from "../../api";

export default function TripAdder({ setShowForm, setTripsChanged }) {
  const [tripName, setTripName] = useState("");

  const [startPicker, setStartPicker] = useState(false);
  const [endPicker, setEndPicker] = useState(false);

  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [newTrip, setNewTrip] = useState({});

  const { signedInUser, setSignedInUser } = useContext(UserContext);

  useEffect(() => {
    if (Object.keys(newTrip).length !== 0) {
      postTrip(newTrip).then((response) => {
        setTripsChanged(true);
        setShowForm(false);
      });
    }
  }, [newTrip]);

  const currentYear = new Date().getFullYear();

  function handleTripNameInput(text) {
    setTripName(text);
  }

  function handleFromPress() {
    setStartPicker(true);
  }

  function handleSetStartDate() {
    setStartPicker(false);
    const dateStr = new Date(date).toISOString();
    setStartDate(dateStr);
  }

  function handleToPress() {
    setEndPicker(true);
  }

  function handleSetEndDate() {
    setEndPicker(false);
    const dateStr = new Date(date).toISOString();
    setEndDate(dateStr);
  }

  function formatDate(date) {
    return new Date(date).toDateString();
  }

  const tripToAdd = {
    name: tripName,
    startdate: startDate,
    enddate: endDate,
    admin: signedInUser.username,
  };

  function handleCreateTrip() {
    setNewTrip(tripToAdd);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Trip Name Input */}
        <Text>TRIP NAME:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={handleTripNameInput}
        />

        {/* Start Date Picker */}
        <Pressable onPress={handleFromPress} style={styles.setDateBtn}>
          <Text style={styles.setDateText}>
            FROM: {startDate ? formatDate(startDate) : ""}
          </Text>
        </Pressable>

        {startPicker && (
          <View>
            <DatePicker
              value={date}
              onChange={(value) => setDate(value)}
              format="dd-mm-yyyy"
              startYear={currentYear}
              endYear={currentYear + 50}
              fontSize={15}
            />

            <Pressable onPress={handleSetStartDate} style={styles.setDateBtn}>
              <Text style={styles.setDateText}>SET START DATE</Text>
            </Pressable>
          </View>
        )}
        {/* End Date Picker */}
        <Pressable onPress={handleToPress} style={styles.setDateBtn}>
          <Text style={styles.setDateText}>
            TO: {endDate ? formatDate(endDate) : ""}
          </Text>
        </Pressable>

        {endPicker && (
          <View>
            <DatePicker
              value={date}
              onChange={(value) => setDate(value)}
              format="dd-mm-yyyy"
              startYear={currentYear}
              endYear={currentYear + 50}
              fontSize={15}
            />

            <Pressable onPress={handleSetEndDate} style={styles.setDateBtn}>
              <Text style={styles.setDateText}>SET END DATE</Text>
            </Pressable>
          </View>
        )}

        {/* Create Trip Button */}
        {startDate && endDate ? (
          <Pressable
            style={styles.createTripBtn}
            onPress={() => handleCreateTrip()}
          >
            <Text style={styles.createTripText}>CREATE TRIP!</Text>
          </Pressable>
        ) : null}
        <Pressable
          style={styles.cancelTripBtn}
          onPress={() => setShowForm(false)}
        >
          <Text style={styles.createTripText}>CANCEL</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    flex: 1,
    padding: 50,
    backgroundColor: "#F8F1FF",
  },
  textInput: {
    backgroundColor: "white",
    color: "black",
    borderColor: "#423219",
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    width: "100%",
    alignSelf: "center",
  },
  setDateBtn: {
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    // borderColor: "#423219",
    // borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    marginVertical: 5,
    backgroundColor: "#9A7AA0",
  },
  setDateText: {
    fontWeight: "bold",
    fontSize: 15,
    // backgroundColor: "#9A7AA0",
    color: "#FBFAF8",
  },
  createTripBtn: {
    backgroundColor: "#9A7AA0",
    alignSelf: "center",
    alignItems: "center",
    // width: "30%",
    width: "100%",
    // borderColor: "#291E0E",
    // borderWidth: 3,
    borderRadius: 5,
    paddingVertical: 10,
    marginVertical: 5,
  },
  cancelTripBtn: {
    backgroundColor: "#263D42",
    alignSelf: "center",
    alignItems: "center",
    // width: "30%",
    width: "100%",
    // borderColor: "#291E0E",
    // borderWidth: 3,
    borderRadius: 5,
    paddingVertical: 10,
    marginVertical: 5,
  },
  createTripText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#FBFAF8",
  },
});
