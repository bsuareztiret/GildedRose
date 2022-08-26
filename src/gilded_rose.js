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
    const checkItems = (name) => {
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
    const updateByTime = (sellIn, quality) => {
    }

    const debugFunction = (item) => {
      console.log('SellIn:', item.sellIn);
      console.log('Quality:', item.quality);
    }

    // I can use some value to update them and pass it in the updatedByTime function
    for (var i = 0; i < this.items.length; i++) {
      let sellInToAdd = 0;
      let qualityToAdd = 0;
      console.log('__________')
      const useCase = checkItems(this.items[i].name);
      if (useCase === 'Conjured') {
        console.log('useCase:', useCase);
        debugFunction(this.items[i]);
      } else if (useCase === 'Cheeese') {
        console.log('useCase:', useCase);
        debugFunction(this.items[i]);
      } else if (useCase === 'Ticket') {
        console.log('useCase:', useCase);
        debugFunction(this.items[i]);
      } else if (useCase === 'Legend') {
        console.log('useCase:', useCase);
        debugFunction(this.items[i]);
      } else {
        console.log('useCase:', useCase);
        debugFunction(this.items[i]);
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
