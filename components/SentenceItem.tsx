import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  playIcon: {
    marginRight: 8,
  },
  sentence: {
    flexShrink: 1,
    fontSize: 16,
  },
});

interface SentenceItemProps {
  sentence: string;
}

const SentenceItem: React.FC<SentenceItemProps> = (props) => {
  const { sentence } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Octicons style={styles.playIcon} name="play" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.sentence}>{sentence}</Text>
    </View>
  );
};

export default SentenceItem;
