import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

import ItemsBar from "../components/ItemsBar";
import Colors from "../components/Utility/Colors";
import { useContext, useState } from "react";
import { AppContext } from "../store/AppContext";
import { DescendingRating, DescendingTimesBorrowed } from "../components/Utility/UtilityFunctions";
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
    const [barChartData, setBarChartData] = useState(
        {
            //bottom labels as book titles
            labels: [
                books[0]["title"],
                books[1]["title"],
                books[2]["title"],
                books[3]["title"],
                books[4]["title"],
            ],
            //data -> for example times borrowed, rating etc...
            datasets: [
                {
                    data: [
                        books[0]["timesBorrowed"],
                        books[1]["timesBorrowed"],
                        books[2]["timesBorrowed"],
                        books[3]["timesBorrowed"],
                        books[4]["timesBorrowed"],
                    ],
                },
            ],
        }
    );

    //function to show most borrowed books in the chart
    function mostBorrowed(books) {
        books.sort(DescendingTimesBorrowed);

        setBarChartData({
            //bottom labels as book titles
            labels: [
                books[0]["title"],
                books[1]["title"],
                books[2]["title"],
                books[3]["title"],
                books[4]["title"],
            ],
            //data -> for example times borrowed, rating etc...
            datasets: [
                {
                    data: [
                        books[0]["timesBorrowed"],
                        books[1]["timesBorrowed"],
                        books[2]["timesBorrowed"],
                        books[3]["timesBorrowed"],
                        books[4]["timesBorrowed"],
                    ],
                },
            ],
        })
    }

    //function to show highest rated books in the chart
    function highestRatings(books) {
        books.sort(DescendingRating);

        //if book is rated -> get its rating, otherwise give it 0
        const book1 = (books[0]["rating"] > 0) ? books[0]["rating"] : 0;
        const book2 = (books[1]["rating"] > 0) ? books[1]["rating"] : 0;
        const book3 = (books[2]["rating"] > 0) ? books[2]["rating"] : 0;
        const book4 = (books[3]["rating"] > 0) ? books[3]["rating"] : 0;
        const book5 = (books[4]["rating"] > 0) ? books[4]["rating"] : 0;

        setBarChartData({
            //bottom labels as book titles
            labels: [
                books[0]["title"],
                books[1]["title"],
                books[2]["title"],
                books[3]["title"],
                books[4]["title"],
            ],
            //data -> for example times borrowed, rating etc...
            datasets: [
                {
                    data: [
                        book1,
                        book2,
                        book3,
                        book4,
                        book5,
                    ],
                },
            ],
        })
    }

    //chart cofiguration (colors, opacity, etc...)
    //check the above link for more info on configuration
    const chartConfig = {
        backgroundGradientFrom: "#FEFEFE",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: Colors.color7,
        backgroundGradientToOpacity: 1,
        color: () => Colors.color6,
        // strokeWidth: 5, // optional, default 3
        barPercentage: 0.8,
        backgroundGradientToOpacity: 1,
        fillShadowGradientFromOpacity: 0.8,
        fillShadowGradientFromOffset: 0.6,
    };

    //list of buttons inside the horizontal items bar
    const barItems = [
        //most borrowed button
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#8aabdd" : "#366EA0",
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
              backgroundColor: pressed ? "#8aabdd" : "#366EA0",
            },
            styles.button,
          ]}
          onPress={() => highestRatings(books)}
        >
          <Text style={styles.buttonTextStyle}>Highest Ratings</Text>
        </Pressable>,
    ];

    const screenWidth = (Dimensions.get("window").width) * 1.001;
    const screenheight = (Dimensions.get("window").height) * 0.9;
    return (
        //root container
        <View style={styles.rootContainer}>

            <ItemsBar //horizontal buttons bar
                style={styles.ItemsBar}
                items={barItems}
            />

            <BarChart //bar chart
                style={styles.graphStyle}
                data={barChartData}
                width={screenWidth}
                height={screenheight}
                yAxisLabel=""
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                showValuesOnTopOfBars={true}
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
        borderWidth: 1,
        borderColor: "black",
        height: 85,
        alignItems: "center",
        backgroundColor: Colors.color9
    },
    graphStyle: {
        flex: 1,
    },
    button: {
        borderRadius: 15,
        padding: 15,
        elevation: 5,
        paddingHorizontal: 31,
        borderWidth: 2,
        borderColor: '#eddfb4',
      },
      buttonTextStyle: {
        color: "white",
        fontWeight: "900",
        textAlign: "center",
        letterSpacing: 1.5,
      },
});
