import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, ScrollView, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";
import { RFValue } from "react-native-responsive-fontsize";
import { Container, Content, View } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Highlighter from "react-native-highlight-words";
import SkeletonContent from 'react-native-skeleton-content';
import Header from "../../components/Headers/Common";
import Typography from "../../components/Typography";
import SearchField from "../../components/SearchField";
// import { banks } from "../../constants/constants";
import global from "../../utils/GlobalStyles";

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 26,
    paddingHorizontal: "5%",
  },
  highlight: {
    backgroundColor: "rgba(255, 55, 55, 0.3)",
  },
  text: {
    fontFamily: "SharpSansBook",
    fontSize: RFValue(14),
    lineHeight: RFValue(21),
    letterSpacing: 0.2,
    width: "80%",
  },
  textTitle: {
    fontFamily: "SharpSansSemibold",
    fontSize: RFValue(14),
    lineHeight: RFValue(21),
    letterSpacing: 0.2,
    width: "80%",
  },
});

export default function ProfileSelectBanks({ navigation, route }) {
  const { from } = route.params ? route.params : "ProfileOptions";
  const referencesInfo = useSelector(state => state.references.references);
  const { banks } = referencesInfo;
  const [searchValue, setSearchValue] = useState("");
  const [highlightedWords, setHiglightedWords] = useState([]);
  const onSearch = (_value) => {
    setSearchValue(_value);
    setHiglightedWords(_value.split());
  };
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);

  const showSection = (sectionId) => {
    if (searchValue === "") {
      if (sectionId !== "") {
        return (
          <React.Fragment>
            <View style={styles.box}>
              <Text style={styles.textTitle}>{sectionId}</Text>
            </View>
            <View style={global.rowSeparator} />
          </React.Fragment>
        );
      }
    }

    return true;
  };

  const skeletonCount = 10;
  const renderSkeleton = (i) => {
    const randomLength = Math.floor(Math.random() * 4);
    const randomLengthList = ["25%", "35%", "45%", "55%"];
    const titleLength = randomLengthList[randomLength];
    return (
      <Grid key={`Skeleton-${i}`}>
        <SkeletonContent
          containerStyle={global.content}
          isLoading={isSkeletonLoading}
          layout={[
            { width: titleLength, height: 20, marginTop: "1%" },
          ]}
        />
        <Row style={global.rowSeparator} />
      </Grid>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setIsSkeletonLoading(false);
    }, 1000);
  }, []);

  return (
    <Container>
      <Header contained="solid" transparent back backAction={() => navigation.goBack()} actionButton="left" />
      <View style={[global.content, global.contentNoTopPadding]}>
        <Typography text="Select a Bank" type="title3" />
      </View>

      <SearchField value={searchValue} onChangeText={(_value) => onSearch(_value)} />

      <Content>
        <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="always">
          <View flex={1} onStartShouldSetResponder={() => true}>
            {(isSkeletonLoading)
              ? [...Array(skeletonCount)].map((e, i) => renderSkeleton(i))
              : (
                <Grid>
                  {banks.filter(
                    data => data.content.find(content => content.name.toUpperCase().includes(searchValue.toUpperCase())),
                  ).map((_row, key) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Row key={`section-${_row.section}-${key}`}>
                      <Col>
                        {showSection(_row.section)}
                        <View>
                          {_row.content.filter(content => content.name.toUpperCase().includes(searchValue.toUpperCase())).map((_item) => (
                            <React.Fragment key={`row-${_item.name}-${_item.key}`}>
                              <TouchableOpacity transparent style={styles.box} onPress={() => { setSearchValue(""); setHiglightedWords([]); navigation.navigate("ProfileNewBankDetails", { bankId: _item.key, bankName: _item.name, bankAccountNoLength: _item.account_number_length, from }); }}>
                                <Highlighter
                                  highlightStyle={styles.highlight}
                                  searchWords={highlightedWords}
                                  textToHighlight={_item.name}
                                  style={styles.text}
                                />
                              </TouchableOpacity>

                              <View style={global.rowSeparator} />
                            </React.Fragment>
                          ))}
                        </View>
                      </Col>
                    </Row>
                  ))}
                </Grid>
              )}
          </View>
        </ScrollView>
      </Content>
    </Container>
  );
}

ProfileSelectBanks.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any),
};


ProfileSelectBanks.defaultProps = {
  route: null,
};
