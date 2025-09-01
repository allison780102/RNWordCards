import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    color: "lightgray",
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
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

export default HeaderTitle;
