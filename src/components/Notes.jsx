"use client"
import React , { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
const Notes = () => {
  const [data, setData] = useState([]);
  const colors =  ["#ffcccc", "#ccffcc", "#ccccff", "#ffffcc", "#ffccff"];

  useEffect(() => {
    const existingDataString = localStorage.getItem("myData");
    if (existingDataString) {
      const existingData = JSON.parse(existingDataString);
      setData(existingData);
    }
  }, []);

  return (
    <div className='max-w-6xl mx-auto px-5'>
      <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 750: 2, 1024: 3 }} >
        <Masonry gutter='20px'>
          {data.map((item, id) => (
            <div key={id}>
              <div style={{ backgroundColor: colors[id % colors.length] }} className='px-4 py-3 font-bold text-slate-950'>
                Note - {id + 1}
              </div>
              <div 
              className='ProseMirror whitespace-pre-line border border-slate-700 px-6 py-4 rounded-lg' 
              dangerouslySetInnerHTML={{ __html: item.content }} 
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}

export default Notes