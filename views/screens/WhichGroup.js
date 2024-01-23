import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios를 import 하세요.
import Group from './Group';

const WhichGroup = ({ token }) => {
  const [data, setData] = useState();
  const [fileData, setFileData] = useState(null);


  const fetchGroup = async () => {
    console.log('fetchGroup 실행');
    if (!token) {
      setFileData([]);
      return;
    }

    try {
      const response = await axios({
        method: 'get',
        url: 'https://api.writeyoume.com/api/v1/img/group',
        headers: { Authorization: token },
      });
      console.log('데이터:', response.data);
      setFileData(response.data.data);
    } catch (error) {
      console.error('에러:', error);
      setFileData([]);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, [token]);

  return <Group token={token} fileData={fileData} />;
};

export default WhichGroup;
