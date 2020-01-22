import * as React from 'react';
import BarChart from '../../components/BarChart';
import {Sources} from '../../constants/SourceMap';

export default function Dashboard() {
  const [data, setData] = React.useState([]);

  const arrangeDataForBarChart = (data: any[]) => {
    return data.map(
      (row: {_id: {productName: string; product: string}; result: [{source: string; clicks: string}]}) => ({
        id: row._id.product,
        productName: row._id.productName,
        amazon: row.result.find(r => r.source === Sources.Amazon.valueOf())?.clicks,
        facebook: row.result.find(r => r.source === Sources.Facebook.valueOf())?.clicks,
        google: row.result.find(r => r.source === Sources.Google.valueOf())?.clicks,
        linkedin: row.result.find(r => r.source === Sources.LinkedIn.valueOf())?.clicks,
        twitter: row.result.find(r => r.source === Sources.Twitter.valueOf())?.clicks
      })
    );
  };

  React.useEffect(() => {
    fetch('/api/productstatistics')
      .then(results => results.json())
      .then(data => {
        setData(data.productstatistics);
      });
  }, []);

  return (
    <div>
      <BarChart data={arrangeDataForBarChart(data)} />
    </div>
  );
}
