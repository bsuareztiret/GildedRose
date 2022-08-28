var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  const days = 15;

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  it("Quality can not be less than 0", function() {
    const gildedRose = new Shop([ new Item("Health potion", 4, 2)]);
    let items;
    for (let day = 0; day < days; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].quality).to.equal(0);
  })

  it("Quality can not be greather than 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 35, 39)]);
    let items;
    for (let day = 0; day < days; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].quality).to.equal(50);
  })

  it("Aged Brie quality up everyday", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 6, 2)]);
    let items;
    for (let day = 0; day < days; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].quality).gt(2);
  })

  it("Legendary object doesn't move", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    let items;
    for (let day = 0; day < days; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].quality).to.equal(80);
    expect(items[0].sellIn).to.equal(0);
  })

  it("If someone made a mistake when encoding a legendary item", function() {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 0, 12),
      new Item("Sulfuras, Hand of Ragnaros", 0, 123)
    ]);
    let items;
    for (let day = 0; day < days; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].quality).to.equal(80);
    expect(items[0].sellIn).to.equal(0);
    expect(items[1].quality).to.equal(80);
    expect(items[1].sellIn).to.equal(0);
  })

  it("Standard quality items down everyday", function() {
    const gildedRose = new Shop([ new Item("+1 Speed Boots", 10, 40)]);
    let items;
    for (let day = 0; day < days; day++) {
      items = gildedRose.updateQuality();
      if (items[0].sellIn === 0) {
        expect(items[0].quality).to.equal(30);
      }
      if (items[0].sellIn === -1) {
        expect(items[0].quality).to.equal(28);
      }
    }
    expect(items[0].quality).to.equal(20);
  })

  it("Conjured items quality down twice faster than standard items", function() {
    const gildedRose = new Shop([ new Item("Conjured flowers", 8, 44)]);
    let items;
    for (let day = 0; day < days; day++) {
      items = gildedRose.updateQuality();
      if (items[0].sellIn === 0) {
        expect(items[0].quality).to.equal(28);
      }
      if (items[0].sellIn === -1) {
        expect(items[0].quality).to.equal(24);
      }
    }
    expect(items[0].quality).to.equal(0);
  })

  it("Ticket quality increases as the concert date approaches", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 16, 15)]);
    let items;
    for (let day = 0; day < days; day++) {
      items = gildedRose.updateQuality();
      if (items[0].sellIn === 11) {
        expect(items[0].quality).to.equal(20);
      }
      if (items[0].sellIn <= 10) {
        expect(items[0].quality).to.gte(22);
      }
      if (items[0].sellIn === 6) {
        expect(items[0].quality).to.gte(30);
      }
      if (items[0].sellIn <= 5) {
        expect(items[0].quality).to.gte(33);
      }
    }
    expect(items[0].quality).to.equal(45);
  })

  it("Ticket quality goes to zero after the concert", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 14, 15)]);
    let items;
    for (let day = 0; day < days; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  })

});