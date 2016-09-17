module.exports = (function () {
  var autobahn = require('autobahn');
  var poloniex = require('./feeder')('poloniex')

  function init() {
    try {
      var connection     = new autobahn.Connection({
        url  : "wss://api.poloniex.com",
        realm: "realm1"
      });
      connection.onopen  = function (session) {
        console.log('poloniex connected')
        session.subscribe('ticker', function tickerEvent(ticker) {
          if (ticker[0] === 'USDT_BTC') {
            poloniex.priceReceived(ticker[1])
          }
        });
      }
      connection.onclose = function () {
        console.log("Websocket connection closed");
      }
      connection.open();
    } catch (e) {
      console.log(e)
    }
  }

  init()
  return poloniex
})()