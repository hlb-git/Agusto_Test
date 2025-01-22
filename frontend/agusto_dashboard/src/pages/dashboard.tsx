import {BarChartComponent} from '../components/barchart';
import {AreaChartComponent} from '../components/areachart';
import {ScatterPlotComponent} from '../components/scatterplot';
import {KPICard} from '../components/kpimetrics';
import {useState, useEffect} from 'react';
import axios from 'axios';
import './dashboard.css';


export function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [kpiMetrics, setKpiMetrics] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    totalProfit: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    const requestData: any = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5050/api/metrics'
        );
        let totalRevenue = 0;
        let totalExpenses = 0;
        let totalProfit = 0;
        let totalCustomers = 0;
        
        for (const item of response.data) {
          totalRevenue += item.revenue;
          totalExpenses += item.expenses;
          totalProfit += item.profit;
          totalCustomers += item.customer_count;
        }

        setKpiMetrics({
          totalRevenue,
          totalExpenses,
          totalProfit,
          totalCustomers,
        });

        setData(response.data);

      } catch (error) {
        console.log('Error:', error);
      };
    }
    requestData();
  }, []);

  return(
 <div className="dboard-wrapper">
      <h1 className="dboard-title">Welcome to Dashboard</h1>
      <div className="dboard-container">
        <div className="chart-item">
          <BarChartComponent data={data} />
        </div>
        <div className="chart-item">
          <AreaChartComponent data={data} />
        </div>
        <div className="chart-item">
          <ScatterPlotComponent data={data} />
        </div>
        <div className="chart-item kpi">
          <h3> Total Revenue: <p className='figure'>
          N{kpiMetrics.totalRevenue}</p></h3>
          <h3> Total Expenses: <p className='figure'>
          N{kpiMetrics.totalExpenses}</p></h3>
          <h3> Total Profit: <p className='figure'>
          N{kpiMetrics.totalProfit}</p></h3>
          <h3> Total Customers: <p className='figure'>
          {kpiMetrics.totalCustomers}</p></h3>
        </div>
      </div>
    </div>
  )
};
