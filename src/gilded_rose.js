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
      let updatedQuality = 0;
      if (useCaseName === 'CONJURED') {
        if (useCaseSellIn === 'positive' || useCaseSellIn === 'zero') {
          // maybe it will crack here sometimes, I need to investigate
          updatedQuality = checkItemsQuality(actualQuality - 2) === true ? actualQuality - 2 : actualQuality;
        } else {
          updatedQuality = checkItemsQuality(actualQuality - 4) === true ? actualQuality - 4 : 0;
        }
        // this.items[i].quality = conjuredQuality;
      } else if (useCaseName === 'CHEESE') {
        updatedQuality = checkItemsQuality(actualQuality + 1) === true ? actualQuality + 1 : actualQuality;
        // this.items[i].quality = cheeseQuality;
      } else if (useCaseName === 'TICKET') {
        updatedQuality = checkItemsQuality(actualQuality + 1) === true ? actualQuality + 1 : actualQuality;
        if (useCaseSellIn === 'negative') {
          updatedQuality = 0;
        }
        else if (useCaseSellIn === 'twice') {
          updatedQuality = checkItemsQuality(actualQuality + 2) === true ? actualQuality + 2 : updatedQuality;
        } else if (useCaseSellIn === 'third') {
          updatedQuality = checkItemsQuality(actualQuality + 3) === true ? actualQuality + 3 : updatedQuality;
        }
        // this.items[i].quality = ticketQuality;
      } else if (useCaseName === 'STANDARD') {
        if (useCaseSellIn === 'positive' || useCaseSellIn === 'zero') {
          updatedQuality = checkItemsQuality(actualQuality - 1) === true ? actualQuality - 1 : actualQuality;
        } else {
          updatedQuality = checkItemsQuality(actualQuality - 2) === true ? actualQuality - 2 : 0;
        }
        // this.items[i].quality = standarQuality;
      }
      if (useCaseName !== 'LEGEND') {
        this.items[i].sellIn = actualSellIn - 1;
        this.items[i].quality = updatedQuality;
      }
    }
    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
