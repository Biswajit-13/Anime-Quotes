import React, { useEffect, useState, } from "react";
// import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Share,
} from "react-native";
import * as Clipboard from 'expo-clipboard';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function App() {
  //declaring all the state variables
  const [Anime, setAnime] = useState("Loading...");
  const [Quote, setQuote] = useState("Loading...");
  const [Author, setAuthor] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(false);
  //quotes funcions
  const randomQuote = () => {
    setIsLoading(true);
    fetch("https://animechan.vercel.app/api/random")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAnime(result.anime);
        setQuote(result.quote);
        setAuthor(result.character);
        setIsLoading(false);
      });
  };


  //copy to clipboard
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(Quote + " " + "--" + " " + Author + "," + " " + Anime);
  };

  //share option
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: Quote + " " + "--" + " " + Author + "," + " " + Anime,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


  //a quote everytime we open the app
  useEffect(() => {
    randomQuote();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5372F0",
      }}
    >
      <StatusBar barStyle="light-content" />
      <View
        style={{
          width: "90%",
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 26,
            fontWeight: "600",
            color: "#333",
            marginBottom: 20,
          }}
        >
          {Anime}
        </Text>
        <FontAwesome5
          name="quote-left"
          style={{ fontSize: 20, marginBottom: -12 }}
          color="#000"
        />
        <Text
          style={{
            color: "#000",
            fontSize: 16,
            lineHeight: 26,
            letterSpacing: 1.1,
            fontWeight: "400",
            textAlign: "center",
            marginBottom: 10,
            paddingHorizontal: 30,
          }}
        >
          {Quote}
        </Text>
        <FontAwesome5
          name="quote-right"
          style={{
            fontSize: 20,
            textAlign: "right",
            marginTop: -20,
            marginBottom: 20,
          }}
          color="#000"
        />
        <Text
          style={{
            textAlign: "right",
            fontWeight: "300",
            fontStyle: "italic",
            fontSize: 16,
            color: "#000",
          }}
        >
          —— {Author}
        </Text>
        <TouchableOpacity
          onPress={randomQuote}
          style={{
            backgroundColor: isLoading
              ? "rgba(83, 114, 240, 0.7)"
              : "rgba(83, 114, 240, 1)",
            padding: 20,
            borderRadius: 30,
            marginVertical: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
            {isLoading ? "Loading..." : "New Quote"}
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
             onPress={copyToClipboard}
            style={{
              borderWidth: 2,
              borderColor: "black",
              borderRadius: 50,
              padding: 15,
            }}
          >
            <FontAwesome name="copy" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onShare}
            style={{
              borderWidth: 2,
              borderColor: "#5372F0",
              borderRadius: 50,
              padding: 15,
            }}
          >
            <FontAwesome name="share-square-o" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
