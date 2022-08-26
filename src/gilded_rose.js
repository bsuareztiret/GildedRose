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
    // First of all, find the exceptions
    const checkItemsName = (name) => {
      if (name.toUpperCase().includes('CONJURED')) {
        return 'Conjured';
      } if (name === 'Aged Brie') {
        return 'Cheeese';
      } if (name === 'Backstage passes to a TAFKAL80ETC concert') {
        return 'Ticket';
      } if (name === 'Sulfuras, Hand of Ragnaros') {
        return 'Legend';
      } else {
        return 'Standard';
      }
    }
    // Maybe with just a function for all the update it will be good
    const checkItemsSellIn = (sellIn, type) => {
      if (sellIn > 0) {
        return 'Positive';
      } else if (sellIn === 0) {
        return 'Zero'
      } else if (sellIn < 0) {
        return 'Negative';
      } else if (type === 'Ticket' && sellIn <= 5) {
        return 'Third';
      } else if (type === 'Ticket' && sellIn <= 10) {
        return 'Twice';
      }
    }

    const checkItemsQuality = (qualityResult, type) => {
      if (type === 'UP' && quality < 50) {
        return true;
      } else if (type === 'DOWN' && quality >= 0) {
        return true;
      } else {
        return false;
      }
    }

    const debugFunction = (item) => {
      console.log('SellIn:', item.sellIn);
      console.log('Quality:', item.quality);
    }

    // I can use some value to update them and pass it in the updatedByTime function
    for (var i = 0; i < this.items.length; i++) {
      const actualQuality = this.items[i].quality;
      const actualSellIn = this.items[i].sellIn;
      // console.log('__________')
      const useCaseName = checkItemsName(this.items[i].name);
      const useCaseSellIn = checkItemsSellIn(this.items[i].sellIn);
      if (useCaseName === 'Conjured') {
        // console.log('useCaseName:', useCaseName);
        // debugFunction(this.items[i]);

        // quality down twice
      } else if (useCaseName === 'Cheeese') {
        console.log('useCaseName:', useCaseName);
        debugFunction(this.items[i]);

        // quality up
      } else if (useCaseName === 'Ticket') {
        console.log('useCaseName:', useCaseName);
        debugFunction(this.items[i]);

        this.items[i].quality = actualQuality + 1;
        // quality up
        if (useCaseSellIn === 'Twice') {
          // sellIn 10 days left: quality up
          this.items[i].quality = actualQuality + 1;
        } else if (useCaseSellIn === 'Third') {
          // sellIn 5 days left: quality up
          this.items[i].quality = actualQuality + 1;
        }
      } else if (useCaseName === 'Standard') {
        // console.log('useCaseName:', useCaseName);
        // debugFunction(this.items[i]);
        this.items[i].sellIn = this.items[i].sellIn - 1;
        if (useCaseSellIn === 'Positive' || useCaseSellIn === 'Zero') {
          this.items[i].quality = actualQuality - 1;
        } else {
          this.items[i].quality = actualQuality - actualQuality;
        }
        // sellIn -1
        // quality -1
      } else {
        console.log('useCaseName:', useCaseName);
        debugFunction(this.items[i]);

        // Then it is the legend object, he doesn't move
      }
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
