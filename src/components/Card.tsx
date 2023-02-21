import CardData from '../interface/CardData';
import '../styles/card.scss';
import LiveInfo from '../interface/LiveInfo';

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
          {data.area_v2_name?.toString() ?? ''}
        </div>
        <div className='online'>在线人数：{data.online?.toString() ?? ''}</div>
      </div>
    </div>
  );
};

export default Card;
