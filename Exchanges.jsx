import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios';
import { Baseurl } from './baseUrl.js'; 
import Loader from './Loader.js';
import "./Exchanges.css";
import OurModel from './ourModel.jsx';

const Exchanges = () => {
  const [loading,setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);


  useEffect(()=>{
    const getExchangesData=async()=>{
      const {data} = await axios.get(`${Baseurl}/exchanges`);
      // console.log({data});
      setExchanges(data);
      setLoading(false);
    }
    getExchangesData();
  },[])


  return (
    <>
    {
      loading ? <Loader /> : <> 
      <Header />
      <div className="model">
        <OurModel />
      </div>
    <div className='ontop'>
      {
        exchanges.map((item,i)=>{
          return(
      <div key={i} className='ex-cards'>
        <div className="images">
            <img height={"70px"} src={item.image} alt="" />
        </div>
        <div className="name">
            {item.name}
        </div>
        <div className="price">
            {item.trade_volume_24h_btc.toFixed(0)}
        </div>
        <div className="rank">
            {item.trust_score_rank}
        </div>
      </div>
          )
        })
      }
    </div>
    </>
    }
    </>
    
  )
}

export default Exchanges
