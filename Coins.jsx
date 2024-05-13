import React from 'react';
import { useState, useEffect } from 'react';
import { Baseurl } from './baseUrl';
import Loader from './Loader';
import axios from 'axios';
import Header from './Header';
import { Link } from 'react-router-dom';
import "./Coins.css";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('inr');
  const [search, setSearch] = useState([]);
  const currencySymbol = currency === 'inr' ? '₹' : '$'

  useEffect(() => {
    const getCoinsData = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`)
        setCoins(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    getCoinsData();
  }, [currency])

  return (
    <>
      {
        loading ? <Loader /> :
          <>
            <Header />
            <div className="search-bar">
              <input type="text" placeholder='Search your Coins' className='input' onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="btns">
              <button onClick={() => setCurrency('inr')}>INR ₹</button>
              <button onClick={() => setCurrency('usd')}>USD $</button>
            </div>
            {
              coins.filter((data) => {
                if (data === "") {
                  return data
                } else if (data.name.toString().toLowerCase().includes(search.toString().toLowerCase())) {
                  return data
                }
              }).map((coindata, i) => {
                return (
                  <CoinCard key={i} coindata={coindata} i={i} id={coindata.id} currencySymbol={currencySymbol} />
                )
              })
            }
          </>
      }
    </>
  )
}

const CoinCard = ({ coindata, i, currencySymbol, id }) => {
  const profit = coindata.price_change_percentage_24h > 0;
  return (
    <Link to={`/coins/${id}`} style={{ color: 'white', textDecoration: 'none' }} >
      <div key={i} className='ex-cards'>
        <div className="images">
          <img height={"70px"} src={coindata.image} alt="" />
        </div>
        <div className="name">
          {coindata.name}
        </div>
        <div className="price">
          {currencySymbol + " "}{coindata.current_price.toFixed(0)}
        </div>
        <div style={profit ? { color: "green" } : { color: "red" }} className="rank">
          {profit ? "+" + coindata.price_change_percentage_24h.toFixed(2) : coindata.price_change_percentage_24h.toFixed(2)}
        </div>
      </div>
    </Link>
  )
}

export default Coins;

