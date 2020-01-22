import React, {PureComponent} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {Sources} from '../constants/SourceMap';

interface Props {
  data: any[];
}

export default class Example extends PureComponent<Props> {
  render() {
    return (
      <BarChart
        width={window.screen.width * 0.8}
        height={300}
        data={this.props.data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray='4 4' />
        <XAxis dataKey='id' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={Sources.Amazon.valueOf().toLowerCase()} stackId='a' fill='#8884d8' />
        <Bar dataKey={Sources.Facebook.valueOf().toLowerCase()} stackId='a' fill='#82ca9d' />
        <Bar dataKey={Sources.Google.valueOf().toLowerCase()} stackId='a' fill='#ffc658' />
        <Bar dataKey={Sources.LinkedIn.valueOf().toLowerCase()} stackId='a' fill='#4484d8' />
        <Bar dataKey={Sources.Twitter.valueOf().toLowerCase()} stackId='a' fill='#32ca9d' />
      </BarChart>
    );
  }
}
