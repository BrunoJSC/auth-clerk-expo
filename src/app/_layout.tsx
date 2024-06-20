import { router, Slot } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { tokenCache } from "@/storage/tokenCache";

const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      router.replace("(auth)");
    } else {
      router.replace("(public)");
    }
  }, []);

  return isLoaded ? (
    <Slot />
  ) : (
    <ActivityIndicator
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    />
  );
}

export default function LayoutAuth() {
  return (
    <ClerkProvider
      publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
}
