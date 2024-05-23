/* eslint-disable react/prop-types */
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import Heading from "../../ui/Heading";
import { Sizes } from "../../utils/constants";
import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  @media(max-width: ${Sizes.minStatsSize}px) {
    padding: 2.4rem 1rem;
  }

`;

const populateStartData = (isDarkMode) => {
  return [
    {
      weight: "Low",
      value: 0,
      color: isDarkMode ? "#b91c1c": "#ef4444",
    },
    {
      weight: "Medium",
      value: 0,
      color: isDarkMode ? "#c2410c" : "#f97316",
    },
    {
      weight: "High",
      value: 0,
      color: isDarkMode ? "#a16207" : "#eab308",
    }
  ];
  
}

const prepareData = (startData, achievements) => {
  const incArrayValue = (arr, field) => {
    return arr.map((obj) => {
      return obj.weight === field ? { ...obj, value: obj.value + 1 } : obj
    });
  }

  return achievements.reduce((arr, cur) => {
    const key = cur.weight;
    if (key === 1) return incArrayValue(arr, "Low");
    if (key === 2) return incArrayValue(arr, "Medium");
    if (key === 3) return incArrayValue(arr, "High");
    return arr;
  }, startData)
}

const WeightChart = ({achievements}) => {
  const { isDarkMode } = useDarkMode();
  const startData = populateStartData(isDarkMode);
  const data = prepareData(startData, achievements);

  return (
    <ChartBox>
      <Heading as="h2">Priority Summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="weight"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.weight}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  )
}

export default WeightChart
