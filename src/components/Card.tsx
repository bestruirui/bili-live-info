import '../styles/card.scss';
import LiveInfo from '../interface/LiveInfo';
import moment from 'moment';
import  {useState} from 'react'

const liveStatus = (status: number | string) => {
  if (typeof status === 'string') {
    status = parseInt(status);
  }
  switch (status) {
    case 0:
      return <><span className='status off'></span>未开播</>;
    case 1:
      return <><span className='status on'></span>直播中</>;
    case 2:
      return <><span className='status play'></span>轮播中</>;
    default:
      return <><span className='status unknown'></span>未知</>;
  }
};

function Time (timestart: string) {
  const [now, setNow] = useState(Number) 

  const timelive = () => {
    let timestartunix = moment(timestart);
    let timenow =  moment().format('YYYY-MM-DD HH:mm:ss') ;
    const live =(moment(timenow).diff(moment(timestartunix),'seconds' ));
    setNow(live);
  }
  setInterval(timelive, 1000);

  return (
    <div >
      直播时长:{Math.floor(now/3600) <= 9 ? "0" + Math.floor(now/3600) :Math.floor(now/3600)}小时{Math.floor((now/60)%60) <= 9 ? "0" + Math.floor((now/60)%60) : Math.floor((now/60)%60)}分钟{now%60 <= 9 ? "0" + now%60 : now%60}秒
    </div>
  )
}
















const image = (url: string | undefined) => {
  if (!url) {
    return undefined;
  }
  return <img src={url} alt={url} />;
};

const Card = ({ data }: { data: LiveInfo }) => {
  return (
    <div className='card'>
      <div>{image(data.room_cover) ?? image(data.user_cover) ?? image(data.cover) ?? <span>没有封面图</span>}</div>
      <div className='card-content'>
        <h2>{data.title ?? ''}</h2>
        <div> 
          {data.uname ?? ''}
         
        </div>
        
      </div>
      <div className='card-bottom'>
        <div className='card-status'>{liveStatus(data.live_status)}</div>
        {/* <div><span>{data.roomid?.toString() ?? ''}</span></div> */}
        
        <div className='fenqu'>
          {data.area_v2_name?.toString() ?? ''}分区
        </div>
        <div className='online'>人气值：{data.online?.toString() ?? ''}</div>
        
      </div>
      {Time(data.live_time)}

    </div>
  );
};

export default Card;
