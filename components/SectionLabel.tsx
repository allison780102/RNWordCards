import { View, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#383B3D",
    padding: 4,
    borderRadius: 2,
    marginRight: 4,
  },
  label: {
    color: "white",
  },
});

interface SectionLabelProps {
  title: string;
  labelColor: string;
  style?: StyleProp<ViewStyle>;
}

const SectionLabel: React.FC<SectionLabelProps> = (props) => {
  const { title, labelColor, style } = props;

  return (
    <View style={[styles.container, { backgroundColor: labelColor }, style]}>
      <Text style={styles.label}>{title}</Text>
    </View>
  );
};

export default SectionLabel;
