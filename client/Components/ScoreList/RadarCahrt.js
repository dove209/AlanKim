import React from 'react';
import { StyleSheet, View, Text} from "react-native";
import { VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel } from "victory-native";



export default class RadarCahrt extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    let characterData = [
      { '          서비스': data[2], '인테리어': data[1], '상권        ': data[0], '맛': data[3] },
      { '          서비스': 100, '인테리어': 100, '상권        ': 100, '맛': 100 },                     //최고 점수 기준
    ];
    this.state = {
      data: this.processData(characterData),
      maxima: this.getMaxima(characterData)
    };
  }

  getMaxima(data) {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  }

  processData(data) {
    const maxByGroup = this.getMaxima(data);
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return data.map((datum) => makeDataArray(datum));
  }

  render() {
    return (
      <View style={styles.container}>
        <VictoryChart polar
          theme={VictoryTheme.grayscale}
          domain={{ y: [ 0, 1 ] }}
        >
          <VictoryGroup colorScale={["#00B2FF", "#fff"]}
            style={{ data: { fillOpacity: 0.1, strokeWidth: 1.5 } }}
          >
            {this.state.data.map((data, i) => {
              return <VictoryArea key={i} data={data} />;
            })}
          </VictoryGroup>
        {
          Object.keys(this.state.maxima).map((key, i) => {
            return (
              <VictoryPolarAxis key={i} dependentAxis
                style={{
                  axisLabel: { padding:8},
                  axis: { stroke: "none" },
                  grid: { stroke: "grey", strokeWidth: 0.1, opacity: 0.5 }
                }}
                labelPlacement="vertical"
                axisValue={i + 1} label={key}
                // tickFormat={(t) => Math.ceil(t * this.state.maxima[key])}
                tickFormat={() => null}
                tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
              />
            );
          })
        }
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});