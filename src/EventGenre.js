import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend  } from "recharts";
  
  const EventGenre = ({events}) => {

    const [ data, setData ] = useState([]);
    
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

    const colors = ['#00CCFF', '#32CD32', '#FF7F50', '#EE82EE', '#FFD700'];

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
        <ResponsiveContainer height={300}>
          <PieChart width={400} height={400}>
          <Legend verticalAlign="top"/>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
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
