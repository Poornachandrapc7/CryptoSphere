import React from "react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Baseurl } from "./baseUrl";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Coindetails.css";
import { BiSolidUpArrow,BiSolidDownArrow } from "react-icons/bi";
import { IoPulse } from "react-icons/io5";
import CoinChart from "./CoinChart";

const Coindetails = () => {
  const [loading, setLoading] = useState(true);
  const [coin,setCoin] = useState([]);
  const [currency,setCurrency] = useState('inr');
  const { id } = useParams();
  const profit = coin.market_data?.price_change_percentage_24h >0;
  const currencySymbol = currency ==='inr' ? '₹': '$'

  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/coins/${id}`);
        // console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getCoin();
  }, [id]);
  return(
  <>
    {
    loading ? <Loader /> : 
      <>
        <div className="coin-detail">
          <div className="coin-info">
          <div className="btn">
             <button onClick={()=>setCurrency('inr')}>INR ₹</button>
             <button onClick={()=>setCurrency('usd')}>USD $</button>
          </div>
            <div className="time">
              Last updated on {coin.last_updated}
              </div>
            <div className="coin-image">
              <img height={"150px"} src={coin.image.large} alt="" />
            </div>
            <div className="coin-name">
              {coin.name}
            </div>
            <div className="coin-price">
              {currencySymbol}{" "}{coin.market_data.current_price[currency]}
            </div>
            <div className="coin-profit">
              {profit ? <BiSolidUpArrow color="green"/> : <BiSolidDownArrow color="red"/>}{" "}{coin.market_data.price_change_percentage_24h}{" %"}
            </div>
            <div className="market-rank">
              <IoPulse color="orange"/>{" # "}{coin.market_cap_rank}
            </div>
            <div className="coin-desc">
              <p>{coin.description['en'].split('.')[0]}</p>
            </div>
          </div>
          <CoinChart currency={currency}/>
        </div>
      </>
    }
  </>
  )
};

export default Coindetails;
