import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

interface HeaderTitleProps {
  title: string;
  subtitle?: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = (props) => {
  const { title, subtitle } = props;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
        {title}
      </Text>
      {subtitle && (
        <Text style={{ fontSize: 14, color: "lightgray" }}>{subtitle}</Text>
      )}
    </View>
  );
};

export default HeaderTitle;
