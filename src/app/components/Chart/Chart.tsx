'use client';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import styles from './BarChart.module.css';
import { legendClasses } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
      label: '',
    },
  ],
  height: 300,

};

const valueFormatter = (value: number | null): string => `${value ?? ''}`;

interface DataPoint {
  [key: string]: string | number;
  month: string;
}

const dataset: DataPoint[] = [
  { month: 'Jan', water: 40, steps: 20, calories: 0 },
  { month: 'Feb', water: 30, steps: 15, calories: 10 },
  { month: 'Mar', water: 0, steps: 10, calories: 5 },
  { month: 'Apr', water: 30, steps: 0, calories: 25 },
  { month: 'May', water: 30, steps: 20, calories: 25 },
  { month: 'Jun', water: 20, steps: 15, calories: 10 },
  { month: 'Jul', water: 50, steps: 20, calories: 0 },
  { month: 'Aug', water: 30, steps: 20, calories: 0 },
];



const BarsDataset: React.FC = () => {
  return (
    <div className={styles.chartContainer}>
      <p>Fitness Activity</p>
      <BarChart borderRadius={10}
      grid={{horizontal: true}}
      sx={{
        [`& .${legendClasses.mark}`]: {
          ry: 10,
        },
      }}
        dataset={dataset}
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: 14,
              fontFamily: 'Lufga',
            }
          }}}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[
          { dataKey: 'water', label: 'Water', valueFormatter, color: '#3FBDF1' },
          { dataKey: 'steps', label: 'Steps', valueFormatter, color: '#59A888' },
          { dataKey: 'calories', label: 'Calories', valueFormatter, color: '#7A40F2F2' },
        ]}
        {...chartSetting}
      />
    </div>
  );
};

export default BarsDataset;
