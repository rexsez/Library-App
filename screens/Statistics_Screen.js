import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

import ItemsBar from "../components/ItemsBar";
import Colors from "../components/Utility/Colors";
import { useContext, useState } from "react";
import { AppContext } from "../store/AppContext";
import {
  DescendingRating,
  DescendingTimesBorrowed,
} from "../components/Utility/UtilityFunctions";
import { Pressable } from "react-native";

/*
more info on charts can be found in the following link:
https://www.npmjs.com/package/react-native-chart-kit
*/
function StatisticsScreen() {
  const appCtx = useContext(AppContext);
  const books = appCtx.books;

  //default is showing most borrowed books (landing in page)
  books.sort(DescendingTimesBorrowed);
  const [title, setTitle] = useState("Number of times borrowed");
  const [barChartData, setBarChartData] = useState({
    //bottom labels as book titles
    labels: [...getFirstTitles(books)],
    //data -> for example times borrowed, rating etc...
    datasets: [
      {
        data: [...getFirstTimesBorrowed(books)],
      },
    ],
  });

  //function to show most borrowed books in the chart
  function mostBorrowed(books) {
    books.sort(DescendingTimesBorrowed);

    setBarChartData({
      //bottom labels as book titles
      labels: [...getFirstTitles(books)],
      //data -> for example times borrowed, rating etc...
      datasets: [
        {
          data: [...getFirstTimesBorrowed(books)],
        },
      ],
    });
    setTitle("Number of times borrowed");
  }

  //function to show highest rated books in the chart
  function highestRatings(books) {
    books.sort(DescendingRating);

    setBarChartData({
      //bottom labels as book titles
      labels: [...getFirstTitles(books)],
      //data -> for example times borrowed, rating etc...
      datasets: [
        {
          data: [...getFirstRatings(books)],
        },
      ],
    });
    setTitle("Rating out of 5");
  }

  //function to get ratings of the first five or less indices
  //Unsorted!
  function getFirstRatings(books) {
    const result = [];
    const length = books.length < 5 ? books.length : 5;
    let rating;
    for (let index = 0; index < length; index++) {
      rating = books[index]["rating"] < 0 ? 0 : books[index]["rating"];
      result.push(rating);
    }
    return result;
  }

  //function to get times borrowed of the first five or less indices
  //Unsorted!
  function getFirstTimesBorrowed(books) {
    const result = [];
    const length = books.length < 5 ? books.length : 5;
    for (let index = 0; index < length; index++) {
      result.push(books[index]["timesBorrowed"]);
    }
    return result;
  }

  //function to get titles of the first five or less indices
  //Unsorted!
  function getFirstTitles(books) {
    const result = [];
    const length = books.length < 5 ? books.length : 5;
    for (let index = 0; index < length; index++) {
      result.push(books[index]["title"]);
    }
    return result;
  }

  //chart cofiguration (colors, opacity, etc...)
  //check the above link for more info on configuration
  const chartConfig = {
    backgroundGradientFrom: Colors.primary500,
    backgroundGradientFromOpacity: 0.2,
    backgroundGradientTo: Colors.primary500,
    backgroundGradientToOpacity: 1,
    backgroundGradientToOpacity: 0.6,
    color: () => Colors.color6,
    // strokeWidth: 5, // optional, default 3
    barPercentage: 0.8,
    fillShadowGradientFromOpacity: 0.8,
    fillShadowGradientFromOffset: 0.3,
  };

  //list of buttons inside the horizontal items bar
  const barItems = [
    //most borrowed button
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#0593bb" : "#0593bb",
          opacity: pressed ? 0.5 : 1,
        },
        styles.button,
      ]}
      onPress={() => mostBorrowed(books)}
    >
      <Text style={styles.buttonTextStyle}>Most Borrowed</Text>
    </Pressable>,

    //highest ratings button
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#0593bb" : "#0593bb",
          opacity: pressed ? 0.5 : 1,
        },
        styles.button,
      ]}
      onPress={() => highestRatings(books)}
    >
      <Text style={styles.buttonTextStyle}>Highest Ratings</Text>
    </Pressable>,
  ];

  const screenWidth = Dimensions.get("window").width * 1.001;
  const screenheight = Dimensions.get("window").height * 0.76;
  return (
    //root container
    <View style={styles.rootContainer}>
      <ItemsBar //horizontal buttons bar
        style={styles.ItemsBar}
        items={barItems}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <BarChart //bar chart
        style={styles.graphStyle}
        data={barChartData}
        width={screenWidth}
        height={screenheight}
        yAxisLabel=""
        chartConfig={chartConfig}
        verticalLabelRotation={45}
        showValuesOnTopOfBars={true}
        fromZero={true}
        // withInnerLines={false}
      />
    </View>
  );
}

export default StatisticsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  ItemsBar: {
    height: 85,
    alignItems: "center",
    backgroundColor: Colors.primary500,
  },
  titleContainer: {
    padding: 15,
    backgroundColor: Colors.primary500,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  titleText: {
    color: "white",
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 1.5,
  },
  graphStyle: {
    flex: 1,
  },
  button: {
    borderRadius: 15,
    padding: 15,
    elevation: 5,
    paddingHorizontal: "5%",
    borderWidth: 2,
    borderColor: "white",
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 1.5,
  },
});
