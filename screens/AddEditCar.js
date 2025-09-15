import React, { useEffect, useState, useMemo } from "react";
import { ScrollView, View, Text, TextInput, Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { rtdb } from "../database/firebase";
import { ref, push, update } from "firebase/database";
import { GlobalStyle as GS } from "../styles/GlobalStyle";

// Standard-felter til en bil
const initialState = { brand: "", model: "", year: "", licensePlate: "" };

// Dansk label-tekst til felterne
const labels = {
  brand: "Mærke",
  model: "Model",
  year: "År",
  licensePlate: "Nummerplade",
};

export default function AddEditCar({ navigation, route }) {
  const [nyBil, setNyBil] = useState(initialState);

  // Er vi på "Redigér bil"-skærmen?
  const erRediger = useMemo(() => route?.name === "Edit Car", [route?.name]);

  // Hvis vi kommer fra detaljer med en bil, så forudfyld felterne
  useEffect(() => {
    if (erRediger) {
      const bilObjekt = route?.params?.car?.[1];
      if (bilObjekt) setNyBil({ ...initialState, ...bilObjekt });
    }
    // Ryd data når skærmen lukkes
    return () => setNyBil(initialState);
  }, [erRediger]);

  // Opdater ét felt ad gangen
  const ændrTekst = (nøgle, værdi) =>
    setNyBil((prev) => ({ ...prev, [nøgle]: værdi }));

  // Gem ny bil eller opdater eksisterende
  const gem = async () => {
    const { brand, model, year, licensePlate } = nyBil;

    // Simpel validering
    if (!brand?.trim() || !model?.trim() || !String(year).trim() || !licensePlate?.trim()) {
      return Alert.alert("Et af felterne er tomt.");
    }

    try {
      if (erRediger) {
        const id = route?.params?.car?.[0];
        if (!id) return Alert.alert("Kunne ikke finde bilens ID.");
        await update(ref(rtdb, `Cars/${id}`), { brand, model, year, licensePlate });
        Alert.alert("Bilen er opdateret.");
        // Navigér tilbage til detaljer med opdaterede data
        navigation.navigate("Car Details", { car: [id, { ...nyBil }] });
      } else {
        await push(ref(rtdb, "/Cars/"), { brand, model, year, licensePlate });
        Alert.alert("Bilen er gemt.");
        setNyBil(initialState);
      }
    } catch (e) {
      Alert.alert(e?.message || "Noget gik galt.");
    }
  };

  return (
    <SafeAreaView style={GS.container}>
      <ScrollView contentContainerStyle={GS.skærmIndhold}>
        {Object.keys(initialState).map((nøgle) => (
          <View style={GS.række} key={nøgle}>
            <Text style={GS.etiket}>{labels[nøgle]}</Text>
            <TextInput
              value={String(nyBil[nøgle] ?? "")}
              onChangeText={(v) => ændrTekst(nøgle, v)}
              style={GS.input}
              placeholder={labels[nøgle]}
              keyboardType={nøgle === "year" ? "number-pad" : "default"}
            />
          </View>
        ))}

        <Button title={erRediger ? "Gem ændringer" : "Tilføj bil"} onPress={gem} />
      </ScrollView>
    </SafeAreaView>
  );
}
