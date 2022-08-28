var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  const days = 15;

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  it("Quality can not be negative", function() {
    const gildedRose = new Shop([ new Item("Health potion", 4, 2)]);
    let items;
    for (let day = 0; day < days; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].quality).to.equal(0);
  })

  it("Aged Brie quality up everyday", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 6, 2)]);
    let items;
    for (let day = 0; day < days; day++) {
      items = gildedRose.updateQuality();
      // console.log(`${items[0].name}, ${items[0].sellIn}, ${items[0].quality}`)
    }
    expect(items[0].quality).gt(2);
  })

});