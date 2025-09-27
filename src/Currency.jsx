import { useEffect, useState } from 'react' 
import './Currency.css' 
import currencyImg from './assets/currency.gif' 
import axios from "axios"; 

export const Currency = () => { 
  const [amount, setAmount] = useState(1); 
  const [fromCurrency, setFromCurrency] = useState("USD"); 
  const [toCurrency, setToCurrency] = useState("INR"); 
  const [convertedCurrency, setConvertedCurrency] = useState(null); 
  const [exchangeRate, setExchangeRate] = useState(null); 
  
  useEffect(() => { 
    const exchangeCurrency = async() => { 
      try{ 
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`; 
        const res = await axios.get(url); 
        setExchangeRate(res.data.rates[toCurrency]); 
      }catch(err){ 
        console.error("Error in fetching exchange rate:", err); 
      } }; 
      exchangeCurrency(); 
    },[fromCurrency, toCurrency]);
    
    useEffect(() => { 
      if(exchangeRate !== null) { 
        setConvertedCurrency((amount * exchangeRate).toFixed(2)); 
      } },[amount, exchangeRate]); 

      const handleAmountChange = (e) => { 
        const value = parseFloat(e.target.value); 
        setAmount(isNaN(value) ? 0 : value); 
      }; 

      const fromCurrencyChange = (e) => { 
        setFromCurrency(e.target.value); 
      }; 
      
      const toCurrencyChange = (e) => { 
        setToCurrency(e.target.value); 
      }; 
      
      return ( 
      <> 
      <div className="currency-converter">
         <div className="image"> 
          <img src={currencyImg} alt="currency Img" />
         </div> <div className="data-container"> 
          <h1>Currency Converter</h1> 
        <div className="input-container"> 
          <label htmlFor="amt">Amount</label> 
          <input type="number" id="amt" value={amount} onChange={handleAmountChange} /> 
        </div> 
        <div className="input-container"> 
          <label htmlFor="from">From Currency</label> 
          <select id="from" value={fromCurrency} onChange={fromCurrencyChange}> 
            <option value="INR">Indian Rupee</option>
             <option value="USD">US Dollars</option> 
             <option value="AUD">Australian Dollars</option> 
             <option value="CNY">Chinese Yen</option> 
             <option value="JPY">Japanese Yen</option>
             <option value="AED">United Arab Emirates Dirham</option>
              <option value="BRL">Brazilian Real</option>
              <option value="DKK">Danish Krone</option>
              <option value="EGP">Egyptian Pound</option>
              <option value="IDR">Indonesian Rupiah</option>
              <option value="KRW">South Korean Won</option>
              <option value="LKR">Sri Lankan Rupee</option>
              <option value="RUB">Russian Ruble</option>
              <option value="UZS">Uzbekistan Som</option>
              <option value="VND">Vietnamese Dong</option>
              <option value="ZAR">South African Rand</option>
              <option value="ZWL">Zimbabwean Dollar</option>
          </select>
          </div> 
          <div className="input-container"> 
            <label htmlFor="from">To Currency</label> 
            <select id="to" value={toCurrency} onChange={toCurrencyChange}> 
              <option value="INR">Indian Rupee</option> 
              <option value="USD">US Dollars</option> 
              <option value="AUD">Australian Dollars</option> 
              <option value="CNY">Chinese Yen</option> 
              <option value="JPY">Japanese Yen</option> 
              <option value="AED">United Arab Emirates Dirham</option>
              <option value="BRL">Brazilian Real</option>
              <option value="DKK">Danish Krone</option>
              <option value="EGP">Egyptian Pound</option>
              <option value="IDR">Indonesian Rupiah</option>
              <option value="KRW">South Korean Won</option>
              <option value="LKR">Sri Lankan Rupee</option>
              <option value="RUB">Russian Ruble</option>
              <option value="UZS">Uzbekistan Som</option>
              <option value="VND">Vietnamese Dong</option>
              <option value="ZAR">South African Rand</option>
              <option value="ZWL">Zimbabwean Dollar</option>
            </select> </div> 
            <div className="result"> 
              <p>{amount} {fromCurrency} is equal to {convertedCurrency} {toCurrency}</p>
            </div>
            </div> 
            </div>
          </>       
        
        ) }





// import { useEffect, useState } from "react";
// import axios from "axios";
// import currencyImg from "./assets/currency.gif";
// import "./Currency.css";

// export const Currency = () => {
//   const [amount, setAmount] = useState(1);
//   const [fromCurrency, setFromCurrency] = useState("USD");
//   const [toCurrency, setToCurrency] = useState("INR");
//   const [convertedCurrency, setConvertedCurrency] = useState("0.00");
//   const [exchangeRate, setExchangeRate] = useState(null);
//   const [symbols, setSymbols] = useState({});
//   const [loading, setLoading] = useState(true);

//   // Fetch currency symbols
//   useEffect(() => {
//     axios
//       .get("https://api.exchangerate.host/symbols")
//       .then((res) => {
//         setSymbols(res.data.symbols);
//         setLoading(false); // Data loaded
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // Fetch exchange rate when currencies change
//   useEffect(() => {
//     if (!fromCurrency || !toCurrency) return;
//     axios
//       .get(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`)
//       .then((res) => setExchangeRate(res.data.rates[toCurrency]))
//       .catch((err) => console.error(err));
//   }, [fromCurrency, toCurrency]);

//   // Calculate converted currency
//   useEffect(() => {
//     if (exchangeRate !== null) {
//       setConvertedCurrency((amount * exchangeRate).toFixed(2));
//     }
//   }, [amount, exchangeRate]);

//   return (
//     <div className="currency-converter">
//       <div className="image">
//         <img src={currencyImg} alt="Currency" />
//       </div>
//       <div className="data-container">
//         <h1>Currency Converter</h1>

//         <div className="input-container">
//           <label>Amount</label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
//           />
//         </div>

//         <div className="input-container">
//           <label>From Currency</label>
//           <select
//             value={fromCurrency}
//             onChange={(e) => setFromCurrency(e.target.value)}
//             disabled={loading}
//           >
//             {loading ? (
//               <option>Loading...</option>
//             ) : (
//               Object.keys(symbols).map((code) => (
//                 <option key={code} value={code}>
//                   {code} - {symbols[code].description}
//                 </option>
//               ))
//             )}
//           </select>
//         </div>

//         <div className="input-container">
//           <label>To Currency</label>
//           <select
//             value={toCurrency}
//             onChange={(e) => setToCurrency(e.target.value)}
//             disabled={loading}
//           >
//             {loading ? (
//               <option>Loading...</option>
//             ) : (
//               Object.keys(symbols).map((code) => (
//                 <option key={code} value={code}>
//                   {code} - {symbols[code].description}
//                 </option>
//               ))
//             )}
//           </select>
//         </div>

//         <div className="result">
//           <p>
//             {amount} {fromCurrency} = {convertedCurrency} {toCurrency}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };






// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const CurrencyConverter = () => {
//   const [symbols, setSymbols] = useState({});
//   const [exchangeRate, setExchangeRate] = useState(null);
//   const [fromCurrency, setFromCurrency] = useState('USD');
//   const [toCurrency, setToCurrency] = useState('INR');
//   const [amount, setAmount] = useState(1);

//   useEffect(() => {
//     // Fetch currency symbols
//     axios.get('https://api.exchangerate.host/symbols')
//       .then(response => setSymbols(response.data.symbols))
//       .catch(error => console.error('Error fetching symbols:', error));
//   }, []);

//   useEffect(() => {
//     // Fetch exchange rate
//     if (fromCurrency && toCurrency) {
//       axios.get(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`)
//         .then(response => setExchangeRate(response.data.rates[toCurrency]))
//         .catch(error => console.error('Error fetching exchange rate:', error));
//     }
//   }, [fromCurrency, toCurrency]);

//   const handleAmountChange = (e) => {
//     setAmount(e.target.value);
//   };

//   return (
//     <div>
//       <input type="number" value={amount} onChange={handleAmountChange} />
//       <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
//         {Object.keys(symbols).map((code) => (
//           <option key={code} value={code}>
//             {code} - {symbols[code].description}
//           </option>
//         ))}
//       </select>
//       <span> to </span>
//       <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
//         {Object.keys(symbols).map((code) => (
//           <option key={code} value={code}>
//             {code} - {symbols[code].description}
//           </option>
//         ))}
//       </select>
//       <div>
//         {exchangeRate && (
//           <p>
//             {amount} {fromCurrency} = {(amount * exchangeRate).toFixed(2)} {toCurrency}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CurrencyConverter;





// import { useEffect, useState } from "react";
// import axios from "axios";
// import currencyImg from "./assets/currency.gif";
// import "./Currency.css";

// export const Currency = () => {
//   const [amount, setAmount] = useState(1);
//   const [fromCurrency, setFromCurrency] = useState("USD");
//   const [toCurrency, setToCurrency] = useState("INR");
//   const [convertedCurrency, setConvertedCurrency] = useState("0.00");
//   const [exchangeRate, setExchangeRate] = useState(null);
//   const [symbols, setSymbols] = useState({});

//   // Fetch currency codes + names once
//   useEffect(() => {
//     axios.get("https://api.exchangerate.host/symbols")
//       .then(res => setSymbols(res.data.symbols))
//       .catch(err => console.error(err));
//   }, []);

//   // Fetch exchange rate whenever currencies change
//   useEffect(() => {
//     if (!fromCurrency || !toCurrency) return;

//     axios.get(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`)
//       .then(res => setExchangeRate(res.data.rates[toCurrency]))
//       .catch(err => console.error(err));
//   }, [fromCurrency, toCurrency]);

//   // Calculate converted amount
//   useEffect(() => {
//     if (exchangeRate !== null) {
//       setConvertedCurrency((amount * exchangeRate).toFixed(2));
//     }
//   }, [amount, exchangeRate]);

//   return (
//     <div className="currency-converter">
//       <div className="image">
//         <img src={currencyImg} alt="Currency" />
//       </div>
//       <div className="data-container">
//         <h1>Currency Converter</h1>

//         <div className="input-container">
//           <label>Amount</label>
//           <input
//             type="number"
//             value={amount}
//             onChange={e => setAmount(parseFloat(e.target.value) || 0)}
//           />
//         </div>

//         <div className="input-container">
//           <label>From Currency</label>
//           <select
//             value={fromCurrency}
//             onChange={e => setFromCurrency(e.target.value)}
//           >
//             {Object.keys(symbols).map(code => (
//               <option key={code} value={code}>
//                 {code} – {symbols[code].description}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="input-container">
//           <label>To Currency</label>
//           <select
//             value={toCurrency}
//             onChange={e => setToCurrency(e.target.value)}
//           >
//             {Object.keys(symbols).map(code => (
//               <option key={code} value={code}>
//                 {code} – {symbols[code].description}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="result">
//           <p>{amount} {fromCurrency} = {convertedCurrency} {toCurrency}</p>
//         </div>
//       </div>
//     </div>
//   );
// };





// import { useEffect, useState } from 'react'
// import './Currency.css'
// import currencyImg from './assets/currency.gif'
// import axios from "axios";


// export const Currency = () => {
    
//    const [amount, setAmount] = useState(1);
//    const [fromCurrency, setFromCurrency] = useState("USD");
//    const [toCurrency, setToCurrency] = useState("INR");
//    const [convertedCurrency, setConvertedCurrency] = useState(null);
//    const [exchangeRate, setExchangeRate] = useState(null);
//    const [symbols, setSymbols] = useState({});

//    useEffect(() => {
//     const currencySymbols = async() => {
//       try{
//         const res = await axios.get("https://api.exchangerate.host/symbols"); 
//         setSymbols(res.data.symbols);
//       }catch(err){
//         console.error("Error in fetching exchange rate:", err);
//       }
//     };
//     currencySymbols();
//    },[]);

//    useEffect(() => {
//     const currencyRate = async() => {
//        try {
//         const url = `https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`;
//         const res = await axios.get(url);
//         setExchangeRate(res.data.rates[toCurrency]);
//       } catch (err) {
//         console.error("Error fetching exchange rate:", err);
//       }  
//     };
//     if (fromCurrency && toCurrency) {
//       currencyRate();
//     }
//    }, [fromCurrency, toCurrency]);

//    useEffect(() => {
//     if(exchangeRate !== null) {
//         setConvertedCurrency((amount * exchangeRate).toFixed(2));
//     }
//    },[amount, exchangeRate]);

//    const handleAmountChange = (e) => {
//        const value = parseFloat(e.target.value);
//        setAmount(isNaN(value) ? 0 : value);
//    };

//    const fromCurrencyChange = (e) => {
//     setFromCurrency(e.target.value);
//    };

//    const toCurrencyChange = (e) => {
//     setToCurrency(e.target.value);
//    };

//   return (
//     <>
//         <div className="currency-converter">
//             <div className="image">
//               <img src={currencyImg} alt="currency Img" />
//             </div>
//             <div className="data-container">
//                 <h1>Currency Converter</h1>
//                 <div className="input-container">
//                     <label htmlFor="amt">Amount</label>
//                     <input type="number"  id="amt" value={amount} onChange={handleAmountChange} />
//                 </div>
//                   <div className="input-container">
//                     <label htmlFor="from">From Currency</label>
//                     <select id="from" value={fromCurrency} onChange={fromCurrencyChange} disabled={Object.keys(symbols).length === 0} >
//                         {Object.keys(symbols).length === 0 ? (
//       <option>Loading currencies…</option>
//     ) : (
//       Object.keys(symbols).map((code) => (
//         <option key={code} value={code}>
//           {code} - {symbols[code].description}
//         </option>
//       ))
//     )}
//                     </select>
//                  </div>
//                  <div className="input-container">
//                     <label htmlFor="from">To Currency</label>
//                     <select id="to" value={toCurrency} onChange={toCurrencyChange} disabled={Object.keys(symbols).length === 0}>
//                         {Object.keys(symbols).length === 0 ? (
//       <option>Loading currencies…</option>
//     ) : (
//       Object.keys(symbols).map((code) => (
//         <option key={code} value={code}>
//           {code} - {symbols[code].description}
//         </option>
//       ))
//     )}
//                     </select>
//                  </div>
//                   <div className="result">
//                 <p>{amount} {fromCurrency} is equal to {convertedCurrency} {toCurrency}</p>
//             </div>
//             </div>
//         </div>
//     </>
//   )
// }
