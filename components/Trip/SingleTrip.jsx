import { Text, View, StyleSheet, ScrollView } from "react-native";
import TripNameHeader from "./TripNameHeader";
import TravelCard from "../Travel/TravelCard";
import StayCard from "../Stay/StayCard";
import ActivityCard from "../Activity/ActivityCard";
import MemberCard from "../Members/MemberCard";
import { useEffect, useState } from "react";
import TripNavBar from "./TripNavBar";
import { getTripById } from "../../api";
import Chat from "../Chat/Chat";

export default function SingleTrip({ route }) {
  const { trip_id } = route.params;
  const [navTab, setNavTab] = useState("Travel");
  const [chosenTrip, setChosenTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modifyTrip, setModifyTrip] = useState(false);
  const chat = new Chat();

  function formatDate(date) {
    return new Date(date).toDateString();
  }

  useEffect(() => {
    getTripById(trip_id).then((data) => {
      setIsLoading(false);
      setChosenTrip(data);
      setModifyTrip(false);
    });
  }, [modifyTrip]);

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View>
        <TripNavBar setNavTab={setNavTab} />
        <TripNameHeader formatDate={formatDate} chosenTrip={chosenTrip} />
        {navTab === "Travel" ? (
          <TravelCard chosenTrip={chosenTrip} setModifyTrip={setModifyTrip} />
        ) : null}
        {navTab === "Stay" ? (
          <StayCard chosenTrip={chosenTrip} setModifyTrip={setModifyTrip} />
        ) : null}
        {navTab === "Activities" ? (
          <ActivityCard chosenTrip={chosenTrip} setModifyTrip={setModifyTrip} />
        ) : null}
        {navTab === "Members" ? (
          <MemberCard chosenTrip={chosenTrip} setModifyTrip={setModifyTrip} />
        ) : null}
        {navTab === "Chat" ? (
          <Chat chosenTrip={chosenTrip} setModifyTrip={setModifyTrip} />
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    paddingTop: 10,
    backgroundColor: "#D7CCB2",
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
    borderColor: "#423219",
    borderWidth: 2,
    borderRadius: 5,
  },
  text: {
    color: "black",
    textAlign: "center",
    fontSize: 40,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
