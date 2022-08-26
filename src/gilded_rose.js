class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    const debugFunction = (item) => {
      console.log('SellIn:', item.sellIn);
      console.log('Quality:', item.quality);
    }
    const checkItemsName = (name) => {
      if (name.toUpperCase().includes('CONJURED')) {
        return 'Conjured';
      } if (name === 'Aged Brie') {
        return 'Cheese';
      } if (name === 'Backstage passes to a TAFKAL80ETC concert') {
        return 'Ticket';
      } if (name === 'Sulfuras, Hand of Ragnaros') {
        return 'Legend';
      } else {
        return 'Standard';
      }
    }
    const checkItemsSellIn = (sellIn, type) => {
      if (type === 'Ticket' && sellIn <= 5) {
        return 'Third';
      } else if (type === 'Ticket' && sellIn <= 10) {
        return 'Twice';
      } else if (sellIn > 0) {
        return 'Positive';
      } else if (sellIn === 0) {
        return 'Zero'
      } else if (sellIn < 0) {
        return 'Negative';
      }
    }

    const checkItemsQuality = (qualityResult, type) => {
      if (type === 'UP' && qualityResult <= 50) {
        return true;
      } else if (type === 'DOWN' && qualityResult >= 0) {
        return true;
      } else {
        return false;
      }
    }

    for (var i = 0; i < this.items.length; i++) {
      const actualQuality = this.items[i].quality;
      const actualSellIn = this.items[i].sellIn;
      // console.log('__________')
      const useCaseName = checkItemsName(this.items[i].name);
      const useCaseSellIn = checkItemsSellIn(this.items[i].sellIn, useCaseName);
      if (useCaseName === 'Conjured') {
        // console.log('useCaseName:', useCaseName);
        // console.log('useCaseSellIn:', useCaseSellIn);
        // debugFunction(this.items[i]);
        let conjuredQuality = 0;
        if (useCaseSellIn === 'Positive' || useCaseSellIn === 'Zero') {
          conjuredQuality = checkItemsQuality(actualQuality - 2, 'DOWN') === true ? actualQuality - 2 : actualQuality;
        } else {
          conjuredQuality = checkItemsQuality(actualQuality - actualQuality, 'DOWN') === true ? (actualQuality - actualQuality) * 2 : actualQuality;
        }
        this.items[i].quality = conjuredQuality;
        this.items[i].sellIn = actualSellIn - 1;
      } else if (useCaseName === 'Cheese') {
        // console.log('useCaseName:', useCaseName);
        // console.log('useCaseSellIn:', useCaseSellIn);
        // debugFunction(this.items[i]);
        let cheeseQuality = checkItemsQuality(actualQuality + 1, 'UP') === true ? actualQuality + 1 : actualQuality;
        this.items[i].quality = cheeseQuality;
        this.items[i].sellIn = actualSellIn - 1;
      } else if (useCaseName === 'Ticket') {
        // console.log('useCaseName:', useCaseName);
        // console.log('useCaseSellIn:', useCaseSellIn);
        // debugFunction(this.items[i]);
        let ticketQuality = checkItemsQuality(actualQuality + 1, 'UP') === true ? actualQuality + 1 : actualQuality;
        if (useCaseSellIn === 'Twice') {
          ticketQuality = checkItemsQuality(actualQuality + 2, 'UP') === true ? actualQuality + 2 : ticketQuality;
        } else if (useCaseSellIn === 'Third') {
          ticketQuality = checkItemsQuality(actualQuality + 3, 'UP') === true ? actualQuality + 3 : ticketQuality;
        }
        // console.log('TICKETQUALITY', ticketQuality);
        this.items[i].quality = ticketQuality;
        this.items[i].sellIn = actualSellIn - 1;
      } else if (useCaseName === 'Standard') {
        // console.log('useCaseName:', useCaseName);
        // console.log('useCaseSellIn:', useCaseSellIn);
        // debugFunction(this.items[i]);
        let standarQuality = 0;
        this.items[i].sellIn = this.items[i].sellIn - 1;
        if (useCaseSellIn === 'Positive' || useCaseSellIn === 'Zero') {
          standarQuality = checkItemsQuality(actualQuality - 1, 'DOWN') === true ? actualQuality - 1 : actualQuality;
        } else {
          standarQuality = checkItemsQuality(actualQuality - actualQuality, 'DOWN') === true ? actualQuality - 1 : actualQuality;
        }
        this.items[i].quality = standarQuality;
        this.items[i].sellIn = actualSellIn - 1;
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
