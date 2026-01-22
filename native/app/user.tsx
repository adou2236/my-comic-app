import MobileProfilePage from "@/kitchensink-components/MobileProfilePage";
import { Text } from "react-native";
export default function Home() {
  return (
    <>
      <MobileProfilePage className="md:hidden" />
      <WebProfilePage className="hidden md:block" />
    </>
  );
}
function WebProfilePage({ className }: { className: string }) {
  return <Text className={className}>WebProfilePage</Text>;
}
