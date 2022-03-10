import React from "react";

const useBinanceData = (symbol) => {
  const [time, setTime] = React.useState(0);
  const [open, setOpen] = React.useState(0);
  const [low, setLow] = React.useState(0);
  const [high, setHigh] = React.useState(0);
  const [close, setClose] = React.useState(0);
  const [ticker, setTicker] = React.useState(0);
  const socket = React.useRef(null);

  React.useEffect(() => {
    socket.current = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${symbol.toLowerCase()}@kline_1m`
    );
  }, []);

  React.useEffect(() => {
    socket.current.onmessage = (msg) => {
      // if (ticker % 30 === 0) {
      const data = JSON.parse(msg.data);
      // const { E } = data.data;
      const { t, o, h, l, c } = data.data.k;
      setTime(t);
      setOpen(o);
      setHigh(h);
      setLow(l);
      setClose(c);
      // }
      // setTicker((prev) => prev + 1);
    };

    return () => socket.current.close();
  }, [symbol]);

  return [time, open, low, high, close];
};

export default useBinanceData;
