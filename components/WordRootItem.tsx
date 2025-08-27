import { View, Text, StyleSheet } from "react-native";
import { WordRoot } from "../models/word";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    marginBottom: 6,
    paddingHorizontal: 2,
  },
  headerPartConatiner: {
    width: "20%",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "600",
  },
  headerNoteContainer: {
    marginLeft: 10,
  },
  rootContainer: {
    flexDirection: "row",
    borderRadius: 16,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#E9E9E9",
  },
  rootPartContainer: {
    padding: 10,
    width: "20%",
    borderRightWidth: 1,
    borderRightColor: "#E9E9E9",
    alignItems: "center",
    backgroundColor: "#F6F7FB",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  rootPartText: {
    color: "#98BDF9",
    fontWeight: "500",
  },
  rootNoteConatiner: {
    padding: 10,
  },
});

interface WordRootItemProps {
  root: WordRoot;
  showHeader?: boolean;
}

const WordRootItem: React.FC<WordRootItemProps> = (props) => {
  const { root, showHeader } = props;

  return (
    <View>
      {showHeader && (
        <View style={styles.headerContainer}>
          <View style={styles.headerPartConatiner}>
            <Text style={styles.headerText}>詞素</Text>
          </View>
          <View style={styles.headerNoteContainer}>
            <Text style={styles.headerText}>解析</Text>
          </View>
        </View>
      )}
      <View style={styles.rootContainer}>
        <View style={styles.rootPartContainer}>
          <Text style={styles.rootPartText}>{root.part}</Text>
        </View>
        <View style={styles.rootNoteConatiner}>
          <Text>{root.note}</Text>
        </View>
      </View>
    </View>
  );
};

export default WordRootItem;
