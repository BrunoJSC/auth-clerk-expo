import { Button } from "@/components/button";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const { user } = useUser();
  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá Usuário {user?.fullName}</Text>

      <Button icon="exit" title="Sair" onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: StatusBar.currentHeight ?? 0,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
