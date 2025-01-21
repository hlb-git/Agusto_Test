import {useState, useEffect} from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts';

export const BarChartComponent = () => {
  const [data, setData] = useState<any>('');

  useEffect(() => {
    const requestData: any = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5050/api/metrics'
        );

        setData(response.data);

      } catch (error) {
        console.log('Error:', error);
      };
    }
    requestData();
  }, []);

  return (
    <div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#8884d8" />
          <Bar dataKey="expenses" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )

};
