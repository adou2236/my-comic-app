import MainContent from "@/kitchensink-components/main-content/MainContent";
import { ScrollView } from "react-native";
export default function Home() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <MainContent />
    </ScrollView>
  );
}
