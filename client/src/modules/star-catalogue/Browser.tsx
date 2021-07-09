import React, { useEffect, useState } from 'react';
import { usePaginationQuery } from '../../hooks/usePaginationQuery';

export const StarBrowser: React.FC = () => {
  const [data, setData] = useState([]);
  const [metadata, setMetadata] = useState({
    page: 0,
    count: 20,
    totalCount: 0,
    pageCount: 0,
  });
  const {
    response,
    isLoading,
    navigate,
  } = usePaginationQuery('stars', metadata);

  useEffect(() => {
    if (response && !isLoading) {
      console.log(response);
      setData(response.data)
    }
  })

  return (
    <div className="w-full lg:w-1/2 p-12">
      <h4>Star Catalogue</h4>
      <div className="mt-4">
        {data && data.map((star: any, index: number) => {
          return (
            <div className="flex" key={index}>
              <div className="w-3/12">
                <span>{star.id}</span>
              </div>
              <div className="w-3/12">
                <span>{star.dist}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

