// Alle fælles styles til appen samles her
import { StyleSheet } from "react-native";

export const GlobalStyle = StyleSheet.create({
  // Layout
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },

  // Afstande
  skærmIndhold: { padding: 16 },
  listeIndhold: { padding: 12 },
  række: { marginBottom: 12 },

  // Tekst
  etiket: { fontWeight: "600", marginBottom: 6, textTransform: "capitalize" },
  værdi: { color: "#333" },
  titel: { fontWeight: "600", fontSize: 16, marginBottom: 4 },

  // Inputs / kort
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  kort: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#0003",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  // Linjeopdeling til detaljevisning
  rækkeMedBundlinje: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
