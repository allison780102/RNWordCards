import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Word } from "../models/word";
import WordRootItem from "../components/WordRootItem";
import PagerView from "react-native-pager-view";
import HeaderTitle from "../components/HeaderTitle";
import SectionLabel from "../components/SectionLabel";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SentenceItem from "../components/SentenceItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  colorBlock: {
    width: "100%",
    height: 16,
    backgroundColor: "#DB544E",
  },
  pageContainer: {
    width: "100%",
    height: "100%",
    padding: 16,
  },
  word: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  phoneticContainer: {
    flexDirection: "row",
  },
  phonetic: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: 12,
  },
  explanationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sentencesContainer: {
    marginBottom: 8,
  },
  BottomButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#383B3D",
    paddingHorizontal: 32,
    alignItems: "center",
  },
  labelConatiner: {
    flexDirection: "row",
    marginBottom: 4,
  },
  explanationTextDivider: {
    marginHorizontal: 4,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  noteText: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 8,
    lineHeight: 22,
  },
  label: {
    marginBottom: 12,
  },
  wordTypeText: {
    marginLeft: 4,
  },
  soundButton: {
    marginLeft: 8,
  },
});

type RootStackParamList = {
  CardScreen: undefined;
};

interface CardScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "CardScreen">;
}

const CardScreen: React.FC<CardScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [datas, setDatas] = useState<Word[] | null>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const playerRemovedRef = useRef(false);

  const defaultAudioUrl = datas?.[0]?.audio_url;
  const player = useAudioPlayer();
  const playerStatus = useAudioPlayerStatus(player);

  const playAudio = () => {
    if (!datas?.[pageNumber]?.audio_url) return;
    if (playerStatus.playing) player.pause();

    // to play sound again `seekTo(0)` is needed
    player.seekTo(0);
    player.play();
  };

  const onPressPrevious = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const onPressNext = () => {
    if (pageNumber < (datas?.length || 0) - 1) {
      setPageNumber(pageNumber + 1);
    }
  };

  const onPageSelected = (e: { nativeEvent: { position: number } }) => {
    const newPage = e.nativeEvent.position;
    setPageNumber(newPage);

    playAudio();
  };

  const scrollViewContentStyle = useMemo(() => {
    return { paddingBottom: insets.bottom + 96 };
  }, [insets.bottom]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HeaderTitle
          title="單字卡練習"
          subtitle={`${pageNumber + 1} of ${datas?.length || 0}`}
        />
      ),
      headerRight: () => (
        <TouchableOpacity>
          <AntDesign name="ellipsis1" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, pageNumber, datas]);

  useEffect(() => {
    // TODO: fetch data by API, need to add loading state
    // const { data, error, isLoading } = useSimpleApi<{ cards: Word[] }>('/cards')
    const dummyData = require("../data/words.json");
    setDatas(dummyData.cards);
  }, []);

  useEffect(() => {
    pagerRef.current?.setPage(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    const url = datas?.[pageNumber]?.audio_url;
    if (url) player.replace(url);
  }, [datas, pageNumber]);

  useEffect(() => {
    return () => {
      if (!playerRemovedRef.current) {
        try {
          player.remove();
        } catch (e) {
          console.log("player remove error: ", e);
        } finally {
          playerRemovedRef.current = true;
        }
      }
    };
  }, [player]);

  return (
    <View style={styles.container}>
      <View style={styles.colorBlock} />
      <PagerView
        style={styles.container}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={onPageSelected}
      >
        {datas &&
          datas.map((data, idx) => {
            const noteRoots = (data?.word_roots ?? []).filter((r) => !r.part);
            const partRoots = (data?.word_roots ?? []).filter(
              (r) => r.part && r.note
            );

            return (
              <View key={data.word + idx} style={styles.pageContainer}>
                <ScrollView
                  nestedScrollEnabled
                  directionalLockEnabled
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={scrollViewContentStyle}
                >
                  <Text style={styles.word}>{data?.word}</Text>
                  <View style={styles.phoneticContainer}>
                    <Text style={styles.phonetic}>/{data?.phonetic}/</Text>
                    <TouchableOpacity
                      style={styles.soundButton}
                      onPress={playAudio}
                    >
                      <AntDesign name="sound" size={24} color="gray" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.explanationContainer}>
                    <SectionLabel title="解釋" labelColor="#383B3D" />
                    <Text style={styles.wordTypeText}>
                      {data?.explanations[0].word_types[0]}
                    </Text>
                    <Text style={styles.explanationTextDivider}>|</Text>
                    <Text>{data?.explanations[0].translations[0]}</Text>
                  </View>
                  <View style={styles.sectionDivider} />
                  <View style={styles.sentencesContainer}>
                    <View style={styles.labelConatiner}>
                      <SectionLabel
                        title="例句"
                        labelColor="#F6CB4C"
                        style={styles.label}
                      />
                    </View>
                    {data?.explanations[0].sentences.length > 0 &&
                      data?.explanations[0].sentences.map((sentence, sIdx) => (
                        <SentenceItem
                          key={`sentence-${sIdx}`}
                          sentence={sentence}
                        />
                      ))}
                  </View>
                  <View>
                    <View style={styles.labelConatiner}>
                      <SectionLabel
                        title={"單字拆解"}
                        labelColor="#65B7D7"
                        style={styles.label}
                      />
                    </View>
                    {noteRoots.length > 0 &&
                      noteRoots.map((root, rIdx) => (
                        <Text
                          key={`note-${root.id ?? rIdx}`}
                          style={styles.noteText}
                        >
                          {root.note}
                        </Text>
                      ))}
                    {partRoots.length > 0 &&
                      partRoots.map((root, index) => (
                        <WordRootItem
                          key={root.id}
                          root={root}
                          showHeader={index === 0}
                        />
                      ))}
                  </View>
                </ScrollView>
              </View>
            );
          })}
      </PagerView>
      <View
        style={[
          styles.BottomButtonContainer,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity onPress={onPressPrevious}>
          <MaterialIcons name="navigate-before" size={48} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="star" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressNext}>
          <MaterialIcons name="navigate-next" size={48} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardScreen;
