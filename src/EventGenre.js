import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
  
  const EventGenre = ({events}) => {

    const [ data, setData ] = useState([]);
    
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

    const colors = ['#E91E63', '#BB36D1', '#8258D1', '#57ACDC', '#57DCBE'];

    useEffect(() => {
        const getData = () => {
            const data = genres.map((genre) => {
               const value = events.filter(event => event.summary.includes(genre)).length;
               return { name: genre, value } 
            });
            return data;
        };
        setData(() => getData())
    }, [events]);

      return (
        <ResponsiveContainer height={400}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              labelLine={false}
              label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
  }

  export default EventGenre;
