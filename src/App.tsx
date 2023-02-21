import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import SmallCard from './components/SmallCard';
import Card from './components/Card';
import SimpleTable from './components/SimpleTable';
import LiveInfo from './interface/LiveInfo';

const setRoomId = (roomId: number | string, url: string) => {
  return url.replace(/\{ROOM_ID\}/g, roomId.toString() ?? '27178028');
};

const getInfo = async (roomId: number): Promise<LiveInfo | undefined> => {
  if (!process.env.REACT_APP_BILIBILI_LIVE_INFO_API) {
    return;
  }
  let url = setRoomId(roomId, process.env.REACT_APP_BILIBILI_LIVE_INFO_API);
  if (process.env.REACT_APP_USE_BACKEND?.toLowerCase() === 'true') {
    url = setRoomId(roomId, `/api`);
  }
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
  const json = await response.json();
  if (!json.data) {
    return;
  }
  const result: LiveInfo[] = Object.values(json.data);
  return result[0];
};

const App = () => {
  const [room, setRoom] = useState(27178028);
  const [liveInfo, setLiveInfo] = useState<LiveInfo>();

  const changeRoom = async () => {
    const info = await getInfo(room);
    setLiveInfo(info);
  };

  useEffect(() => {
    (async () => {
      await changeRoom();
    })();
  }, []);

  return (
    <React.StrictMode>
    {/*  <div> */}
      {/* <div className='input'>
        <label htmlFor='roomId'>直播间号：</label>
        <input
          type={'number'}
          id='roomId'
          name='roomId'
          value={room}
          min='0'
          onChange={(e) => setRoom(parseInt(e.target.value))}
        />
        <button onClick={changeRoom}>获取直播间信息</button>
      </div> */}
      
      {liveInfo && <Card data={liveInfo} />}

      {/* <h1>表格</h1>
      {liveInfo && <SimpleTable data={liveInfo} />} */}
    {/* </div> */}
    </React.StrictMode>
  );
};

export default App;
