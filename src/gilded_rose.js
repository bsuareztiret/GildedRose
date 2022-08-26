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
    const checkItemsName = (name) => {
      if (name.toUpperCase().includes('CONJURED')) {
        return 'CONJURED';
      } if (name === 'Aged Brie') {
        return 'CHEESE';
      } if (name === 'Backstage passes to a TAFKAL80ETC concert') {
        return 'TICKET';
      } if (name === 'Sulfuras, Hand of Ragnaros') {
        return 'LEGEND';
      } else {
        return 'STANDARD';
      }
    }

    const checkItemsSellIn = (sellIn, type) => {
      if (type === 'TICKET' && sellIn <= 5) {
        return 'third';
      } else if (type === 'TICKET' && sellIn <= 10) {
        return 'twice';
      } else if (sellIn > 0) {
        return 'positive';
      } else if (sellIn === 0) {
        return 'zero'
      } else if (sellIn < 0) {
        return 'negative';
      }
    }

    const checkItemsQuality = (qualityResult) => {
      if (qualityResult <= 50 && qualityResult >= 0) {
        return true;
      } else {
        return false;
      }
    }

    for (var i = 0; i < this.items.length; i++) {
      const actualQuality = this.items[i].quality;
      const actualSellIn = this.items[i].sellIn;
      const useCaseName = checkItemsName(this.items[i].name);
      const useCaseSellIn = checkItemsSellIn(this.items[i].sellIn, useCaseName);
      if (useCaseName === 'CONJURED') {
        let conjuredQuality = 0;
        if (useCaseSellIn === 'positive' || useCaseSellIn === 'zero') {
          conjuredQuality = checkItemsQuality(actualQuality - 2) === true ? actualQuality - 2 : actualQuality;
        } else {
          // only -4 my bad
          conjuredQuality = checkItemsQuality((actualQuality - actualQuality) * 2) === true ? (actualQuality - actualQuality) * 2 : actualQuality;
        }
        this.items[i].quality = conjuredQuality;
      } else if (useCaseName === 'CHEESE') {
        let cheeseQuality = checkItemsQuality(actualQuality + 1) === true ? actualQuality + 1 : actualQuality;
        this.items[i].quality = cheeseQuality;
      } else if (useCaseName === 'TICKET') {
        let ticketQuality = checkItemsQuality(actualQuality + 1) === true ? actualQuality + 1 : actualQuality;
        if (useCaseSellIn === 'negative') {
          ticketQuality = 0;
        }
        else if (useCaseSellIn === 'twice') {
          ticketQuality = checkItemsQuality(actualQuality + 2) === true ? actualQuality + 2 : ticketQuality;
        } else if (useCaseSellIn === 'third') {
          ticketQuality = checkItemsQuality(actualQuality + 3) === true ? actualQuality + 3 : ticketQuality;
        }
        this.items[i].quality = ticketQuality;
      } else if (useCaseName === 'STANDARD') {
        let standarQuality = 0;
        this.items[i].sellIn = this.items[i].sellIn - 1;
        if (useCaseSellIn === 'positive' || useCaseSellIn === 'zero') {
          standarQuality = checkItemsQuality(actualQuality - 1) === true ? actualQuality - 1 : actualQuality;
        } else {
          // only - 2, my bad
          standarQuality = checkItemsQuality(actualQuality - actualQuality) === true ? actualQuality - 1 : actualQuality;
        }
        this.items[i].quality = standarQuality;
      }
      if (useCaseName !== 'LEGEND') {
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
