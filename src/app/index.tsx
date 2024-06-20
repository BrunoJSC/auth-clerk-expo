import { Button } from "@/components/button";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(true);
  const googleAuth = useOAuth({ strategy: "oauth_google" });
  async function onGoogleSignIn() {
    try {
      setIsLoading(true);

      const onFlow = await googleAuth.startOAuthFlow();

      if (onFlow.authSessionResult?.type === "success") {
        if (onFlow.setActive) {
          await onFlow.setActive({ session: onFlow.createdSessionId });
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <Button
        title="Entrar com Google"
        icon="logo-google"
        onPress={onGoogleSignIn}
        isLoading={!isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: StatusBar.currentHeight ?? 0,
    justifyContent: "center",
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
