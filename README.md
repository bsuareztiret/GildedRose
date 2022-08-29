# GildedRose Kata Refactoring

**_Launch the project_**

- npm install

**_Launch the test_**

- npm test

I have to refactor this exercise.

My goal was to write readable code that was open to modification.
I think when you subdivide your code with functions it will be easier to read. And if you want to change something you go more easily to your point.

## Check the variable from the items

I write three checks for each variables contain by the items object.
I was not **_realy_** auhtorized to change this object so I prefer don't do that.

### CheckItemsName

This function have to goal to find the **_type_** of the object.
For now we:

- The normal object
- The conjured one
- The Aged Brie
- Ticket for concert
- The legendary object

In the begining example the code compare all the name string of the diffeent object, so I do the same.

Except for the conjured one.

It will be great to add this check in a new variable items, something like "type" and just chck the types. Because the name can contain something esle and it will be some mistake in it.

### CheckItemSellIn

This function check the time of validity of each items

When the time is positive all items have a specific beahviour, only Ticket have some other beahviour. Equal or under 10 days or equal or under 5 days.

When the time is negative the, something esle happen. For standard and conjured, quality drops twice faster. Ticket become 0.

The legendary object are immutable.

### CheckItemsQuality

This function check if the quality don't go up over 50 and go down under 0

I use a ternaire operation for this one because I like it, and to gain some line.

By my comprehension the quality is the variable are most changed, because each object change by it's own rules and depending dy de **_sellIn_** variable.

The legendary object are immutable.
