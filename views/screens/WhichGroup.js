import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Group from './Group';

const WhichGroup = () => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://bb25-118-235-15-248.ngrok-free.app/api/v1/img/group',
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MjEsIm1lbWJlcl9pZCI6NDcsInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi7J207IS47KeEIiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUQxTDZkWGhwNEtIbXNEcHRERGxDN2tScXN2bGh1akhuSnhXSWNsTjUtMEJ1VlpJTWpNSk1ILWZIWnZLQlNKMmpDZktZek04enJFQTNpbFZlT0s2VGN2d01qdTg3MHYwX1hOeUF4aUdqaTJzV0huSlZRX1pITTc2UE9xdHNSNGtHcGwzcWhDNFdvY1NGNTNURGF6bVZ2R2p5ZEgzQlIzYUNnWUtBYUFTQVJNU0ZRSEdYMk1pZU5RT2pUemxGdGJTa2d5RHlxX2lIZzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTEtMDhUMjI6MTU6MjMuMDAwWiJ9LCJpYXQiOjE3MDA1NDg1ODksImV4cCI6MTcwMDU1MjE4OX0.ARscscnmebeLWC2yzmeqQFcQkPtDzZL1MBIzjgxI3kk',
        },
      });

      // console.log(response.data);
      const extractedData = response.data.data.map(item => ({
        name: item.name, //기수
        url: item.url, //이미지
      }));
      setData(extractedData);

      // console.log(extractedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(data);
    fetchData();
  }, [data]);

  return <Group data={data} />;
};

export default WhichGroup;
