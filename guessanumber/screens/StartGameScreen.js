import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../constants/colors";
import Card from "../components/Card";
import Input from "../components/Input";

const StartGameScreen = (props) => {
  const [enteredvalue, setenteredvalue] = useState("");
  const [isconfirmed, setisconfirmed] = useState(false);
  const [selectednumber, setnumber] = useState();

  const numberinputhandler = (inputtext) => {
    setenteredvalue(inputtext.replace(/[^0-9]/g, ""));
  };
  const resetinputhandler = () => {
    setenteredvalue("");
    setisconfirmed(false);
  };

  const confirminputhandler = () => {
    if (
      Number.isNaN(enteredvalue) ||
      +enteredvalue <= 0 ||
      +enteredvalue > 99
    ) {
      Alert.alert("Invalid Input", "Enter a valid number!", [
        { text: "Okay", style: "destructive", onPress: resetinputhandler },
      ]);
      return;
    }
    setisconfirmed(true);
    setnumber(+enteredvalue);
    setenteredvalue("");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card styles={styles.inputcontainer}>
          <Text>Select a Number</Text>
          <Input
            onChangeText={numberinputhandler}
            value={enteredvalue}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            // keyboardType="numeric"
            maxLength={2}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.btn}>
              <Button
                onPress={resetinputhandler}
                title="Reset"
                onPress={() => {}}
                color={colors.accent}
              />
            </View>
            <View style={styles.btn}>
              <Button
                onPress={confirminputhandler}
                title="Confirm"
                onPress={() => {}}
                color={colors.primary}
              />
            </View>
          </View>
        </Card>
        {isconfirmed && <Text>Chosen number is : {selectednumber}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  inputcontainer: { width: 300, maxWidth: "80%", alignItems: "center" },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  btn: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
});

export default StartGameScreen;
