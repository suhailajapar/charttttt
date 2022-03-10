import Chart from "@qognicafinance/react-lightweight-charts";
import React, { useEffect, useRef } from "react";
import useState from "react-usestateref";
import useBinanceData from "./binance-data";

const LightWeightChart = () => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [is_loading, setIsLoading] = useState(false);
  const [newData, setNewData] = useState({});
  // const [time, setTime] = useState(0);
  // const [open, setOpen] = useState(0);
  // const [low, setLow] = useState(0);
  // const [high, setHigh] = useState(0);
  // const [close, setClose] = useState(0);

  const chart_ref = useRef(null);
  const [time, open, low, high, close] = useBinanceData(symbol);

  //CHARTS
  const [chart_data, setChartData] = useState([]);
  const [latest_time, setLatestTime] = useState([]);
  const [livetick, setLiveTick] = useState([]);
  const socket = React.useRef(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&limit=1000&interval=1m`
    )
      .then((res) => res.json())
      .then((data) => {
        let curr_data = data.map((d) => {
          return {
            time: d[0] / 1000,
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
          };
        });
        // console.log("curr_data", curr_data);
        //Set historical data
        setChartData(curr_data);
        setIsLoading(false);
        // setLatestTime(
        //   refChart_Data.current[refChart_Data.current.length - 1].time
        // );
        // console.log(refChart_Data.current);
      });
  }, [symbol]);

  // useEffect(() => {
  //   //FOR REAL-TIME DATA
  //   socket.current = new WebSocket(
  //     `wss://stream.binance.com:9443/stream?streams=${symbol?.toLowerCase()}@kline_1m`
  //   );
  //   socket.current.onmessage = (msg) => {
  //     const data = JSON.parse(msg.data);
  //     const { t, o, h, l, c } = data.data.k;
  //     setTime(t / 1000);
  //     setOpen(o);
  //     setHigh(h);
  //     setLow(l);
  //     setClose(c);
  //     setLatestTime(chart_data[chart_data.length - 1][time]);
  //   };
  // }, [symbol]);

  useEffect(() => {
    setNewData(() => {
      return {
        time: time,
        open: open,
        high: high,
        low: low,
        close: close,
      };
    });

    const data_copy = [...chart_data];
    console.log("latest_time", latest_time, "open time", time);
    if (latest_time === time) {
      console.log("same time");
      // console.log("before pop push", chart_data);
      data_copy.pop();
      data_copy.push(newData);
      // console.log("after pop push", chart_data);
    } else {
      console.log("diff time");
      setLatestTime(time);
      data_copy.push(newData);
    }
    setChartData(data_copy);
  }, [close]);

  // useEffect(() => {
  //   //FOR HISTORICAL DATA

  //   fetch(
  //     `https://api.binance.com/api/v3/klines?symbol=${symbol}&limit=1000&interval=1m`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let curr_data = data.map((d) => {
  //         return {
  //           time: d[0] / 1000,
  //           open: parseFloat(d[1]),
  //           high: parseFloat(d[2]),
  //           low: parseFloat(d[3]),
  //           close: parseFloat(d[4]),
  //         };
  //       });
  //       // console.log("curr_data", curr_data);
  //       //Set historical data
  //       setChartData(curr_data);
  //       setLatestTime(
  //         refChart_Data.current[refChart_Data.current.length - 1].time
  //       );
  //       console.log(refChart_Data.current);
  //     });
  //   //FOR REAL-TIME DATA
  //   socket.current = new WebSocket(
  //     `wss://stream.binance.com:9443/stream?streams=${symbol?.toLowerCase()}@kline_1m`
  //   );
  //   socket.current.onmessage = (msg) => {
  //     const data = JSON.parse(msg.data);
  //     const { t, o, h, l, c } = data.data.k;
  //     setTime(t / 1000);
  //     setOpen(o);
  //     setHigh(h);
  //     setLow(l);
  //     setClose(c);

  //     let new_data = {
  //       time: time,
  //       open: open,
  //       high: high,
  //       low: low,
  //       close: close,
  //     };

  //     if (refLatestTime.current === time) {
  //       console.log("same time");
  //       refChart_Data.current.splice(-1, 1, new_data);
  //       console.log(refChart_Data.current);
  //       setChartData(refChart_Data.current);
  //     } else {
  //       let new_data = {
  //         time: time,
  //         open: open,
  //         high: high,
  //         low: low,
  //         close: close,
  //       };
  //       console.log("diff time");
  //       setLatestTime(time);
  //       refChart_Data.current.push(new_data);
  //       setChartData(refChart_Data.current);
  //     }
  //   };

  //   // return () => socket.current.close();
  // }, [symbol]);

  // useEffect(() => {
  //   //FOR REAL-TIME DATA
  //   socket.current = new WebSocket(
  //     `wss://stream.binance.com:9443/stream?streams=${symbol?.toLowerCase()}@kline_1m`
  //   );

  //   socket.current.onmessage = (msg) => {
  //     const data = JSON.parse(msg.data);
  //     const { t, o, h, l, c } = data.data.k;
  //     setTime(t / 1000);
  //     setOpen(o);
  //     setHigh(h);
  //     setLow(l);
  //     setClose(c);

  //     // //FOR HISTORICAL DATA
  //     // fetch(
  //     //   `https://api.binance.com/api/v3/klines?symbol=${symbol}&limit=1000&interval=1m`
  //     // )
  //     //   .then((res) => res.json())
  //     //   .then((data) => {
  //     //     let curr_data = data.map((d) => {
  //     //       return {
  //     //         time: d[0] / 1000,
  //     //         open: parseFloat(d[1]),
  //     //         high: parseFloat(d[2]),
  //     //         low: parseFloat(d[3]),
  //     //         close: parseFloat(d[4]),
  //     //       };
  //     //     });
  //     //     //Set historical data
  //     //     setChartData(curr_data);
  //     //   });
  //   };
  //   return () => socket.current.close();
  // }, [symbol]);

  const options = {
    handleScroll: true,
    handleScale: true,
    alignLabels: true,
    timeScale: {
      rightOffset: 12,
      barSpacing: 3,
      fixLeftEdge: true,
      lockVisibleTimeRangeOnResize: true,
      rightBarStaysOnScroll: true,
      borderVisible: true,
      borderColor: "#404043",
      visible: true,
      timeVisible: true,
      secondsVisible: false,
    },
    priceScale: {
      borderVisible: true,
      borderColor: "##404043",
    },
    watermark: {
      color: "rgba(255, 255, 255, 0.1)",
      visible: true,
      text: "Hikers",
      fontSize: 32,
      horzAlign: "center",
      vertAlign: "center",
    },
    layout: {
      backgroundColor: "rgba(255,255,255, 0)",
      textColor: "#A3A3A3",
      fontSize: 12,
      fontFamily: "sans-serif",
    },
    grid: {
      vertLines: {
        color: "#404043",
        style: 1,
        visible: true,
      },
      horzLines: {
        color: "#404043",
        style: 1,
        visible: true,
      },
    },
  };

  if (is_loading) {
    return <h1>Luding..</h1>;
  }

  return (
    <div>
      {/* <>{console.log("at chart", chart_data)}</> */}
      openTime: {time} open:{open} high:{high} low:{low} close:{close}
      <div style={{ fontSize: "42px" }}>{symbol}</div>
      <div>
        <label name="pair">Select Pair:</label>
        <select
          name="pairs"
          id="pairs"
          onChange={(e) => setSymbol(e.target.value)}
        >
          <option value="BTCUSDT">BTC/USDT</option>
          <option value="ETHUSDT">ETH/USDT</option>
        </select>
      </div>
      <Chart
        // ref={chart_ref}
        options={options}
        candlestickSeries={[
          {
            options: {
              upColor: "#2EB689",
              downColor: "#D05757",
              borderVisible: false,
              wickVisible: true,
              borderColor: "#000000",
              wickColor: "#404043",
              borderUpColor: "#2EB689",
              borderDownColor: "#D05757",
              wickUpColor: "#2EB689",
              wickDownColor: "#D05757",
            },
            data: chart_data,
          },
        ]}
        width={700}
        height={500}
      />
    </div>
  );
};

export default LightWeightChart;
