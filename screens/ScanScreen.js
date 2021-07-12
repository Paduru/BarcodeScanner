import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function ScanScreen() {
  const [hasPermissions, setHasPermissions] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [buttonClicked, setButtonClicked] = useState("normal");
  const [scannedData, setScannedData] = useState("");

  const handlePermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();

    setHasPermissions(status === "granted");
    setButtonClicked("clicked");
  };

  const handleScen = ({ type, data }) => {
    setScannedData(data);
    setButtonClicked("normal");
  };

  if (buttonClicked === "clicked" && hasPermissions) {
    return (
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleScen} />
    );
  } else if (buttonClicked === "normal") {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 100, height: 100, marginBottom: 25 }}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg",
          }}
        />
        <TouchableOpacity style={styles.button} onPress={handlePermissions}>
          <Text style={{ color: "white" }}> Scan code </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
  },
  inputBox: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    textAlign: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 25,
    justifyContent: "center",
  },
});
