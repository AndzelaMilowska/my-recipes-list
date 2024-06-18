import { Recipe } from './recipe.interface';

export let recipeList: Recipe[] = [
  {
    title: 'The perfect chips',
    imgs: [
      'https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1292_1_1440773599.jpg?tr=w-800,h-1066',
    ],
    description:
      '“Without question, the humble fried potato, the chip, is a gastronomic phenomenon in itself. The ability potatoes have to get mega crispy on the outside and super-fluffy in the middle when cooked is so good. Skinny and shoestring fries are delicious, but a proper fat handcut chip is something else. It’s just a shame that they’re not very good for you, but, like a good old cake, life wouldn’t be quite the same without them. At home, we don’t cook chips very often, so when we do have them, we definitely want the real deal. So let me tell you how I make the perfect chip – if you’re going to do it, do it right. ',
    ingredientsList: [
      { amount: 500, name: 'sunflower oil', unit: 'ml' },
      { amount: 800, name: ' Maris Piper potatoes', unit: 'g' },
      { amount: 5, name: 'Salt', unit: 'g' },
      { amount: 400, name: 'sunflower oil', unit: 'ml' },
      { amount: 200, name: ' Maris Piper potatoes', unit: 'g' },
      { amount: 10, name: 'Salt', unit: 'g' },
    ],
    instructions: [
      'Three obvious things are important on your journey to perfection – your choice of potato, your choice of oil and your choice of salt. For me, the Maris Piper potato wins every time, and you want to use nice large ones.',
      'On oil, sunflower and sunseed are very efficient, and many people swear by using groundnut oil. But, if you’re after flavour, cooking chips in beef tallow (rendered beef fat you can get from your butcher) gives you better flavour and colour – the choice is yours.',
      'Finally, on salt, being an Essex boy, in my house it has to be Maldon sea salt.',
      'So down to business: chop 800g of Maris Piper potatoes into finger-sized chips, leaving the skin on – don’t be too exact.',
      'Chip shops have massive industrial fryers, which you can’t recreate at home, so you need to use a large sturdy pan on a medium to high heat (unless you own a deep-fat fryer, of course). Your oil should be 8cm deep, but never fill your pan more than half full. If you don’t have a thermometer, use a raw chip, and as it starts to float and fry the temperature should be about 140°C, which is perfect for blanching.',
      'Use a large metal sieve to gently lower the chips into the pan for around 8 minutes, or until soft but not coloured, then remove to a tray to cool.',
      'Turn the heat up under the oil and return one blanched chip to the oil as a guide again. Once it’s floating and golden the temperature should be about 180°C, which is perfect for frying and will give you chips with those all-important crispy outsides and fluffy middles.',
      'At this stage you may want to cook your chips in 2-portion batches, so you don’t decrease the temperature of the oil too much or overcrowd the pan. Fry the chips until beautifully golden, then remove to a bowl lined with kitchen paper, shake around a bit, season with sea salt and serve right away.',
    ],
    numberOfPortions: 2,
    categories: ['Breakfast', 'Healthy'],
    id: 1,
  },

  {
    title: 'The worst chips',
    imgs: [
      'https://img.cuisineaz.com/660x660/2016/07/26/i32581-frites-a-la-poele.webp',
    ],
    description:
      '“Without question, the humble fried potato, the chip, is a gastronomic phenomenon in itself. The ability potatoes have to get mega crispy on the outside and super-fluffy in the middle when cooked is so good. Skinny and shoestring fries are delicious, but a proper fat handcut chip is something else. It’s just a shame that they’re not very good for you, but, like a good old cake, life wouldn’t be quite the same without them. At home, we don’t cook chips very often, so when we do have them, we definitely want the real deal. So let me tell you how I make the perfect chip – if you’re going to do it, do it right. ',
    ingredientsList: [
      { amount: 500, name: 'sunflower oil', unit: 'ml' },
      { amount: 800, name: ' Maris Piper potatoes', unit: 'g' },
      { amount: 5, name: 'Salt', unit: 'g' },
      { amount: 400, name: 'sunflower oil', unit: 'ml' },
      { amount: 200, name: ' Maris Piper potatoes', unit: 'g' },
      { amount: 10, name: 'Salt', unit: 'g' },
    ],
    instructions: [
      'Three obvious things are important on your journey to perfection – your choice of potato, your choice of oil and your choice of salt. For me, the Maris Piper potato wins every time, and you want to use nice large ones.',
      'On oil, sunflower and sunseed are very efficient, and many people swear by using groundnut oil. But, if you’re after flavour, cooking chips in beef tallow (rendered beef fat you can get from your butcher) gives you better flavour and colour – the choice is yours.',
      'Finally, on salt, being an Essex boy, in my house it has to be Maldon sea salt.',
      'So down to business: chop 800g of Maris Piper potatoes into finger-sized chips, leaving the skin on – don’t be too exact.',
      'Chip shops have massive industrial fryers, which you can’t recreate at home, so you need to use a large sturdy pan on a medium to high heat (unless you own a deep-fat fryer, of course). Your oil should be 8cm deep, but never fill your pan more than half full. If you don’t have a thermometer, use a raw chip, and as it starts to float and fry the temperature should be about 140°C, which is perfect for blanching.',
      'Use a large metal sieve to gently lower the chips into the pan for around 8 minutes, or until soft but not coloured, then remove to a tray to cool.',
      'Turn the heat up under the oil and return one blanched chip to the oil as a guide again. Once it’s floating and golden the temperature should be about 180°C, which is perfect for frying and will give you chips with those all-important crispy outsides and fluffy middles.',
      'At this stage you may want to cook your chips in 2-portion batches, so you don’t decrease the temperature of the oil too much or overcrowd the pan. Fry the chips until beautifully golden, then remove to a bowl lined with kitchen paper, shake around a bit, season with sea salt and serve right away.',
    ],
    numberOfPortions: 4,
    categories: ['Breakfast', 'Healthy'],
    id: 2,
  },

  {
    title: 'The imgless recipe',
    description:
      '“Without question, the humble fried potato, the chip, is a gastronomic phenomenon in itself. The ability potatoes have to get mega crispy on the outside and super-fluffy in the middle when cooked is so good. Skinny and shoestring fries are delicious, but a proper fat handcut chip is something else. It’s just a shame that they’re not very good for you, but, like a good old cake, life wouldn’t be quite the same without them. At home, we don’t cook chips very often, so when we do have them, we definitely want the real deal. So let me tell you how I make the perfect chip – if you’re going to do it, do it right. ',
    ingredientsList: [
      { amount: 500, name: 'sunflower oil', unit: 'ml' },
      { amount: 800, name: ' Maris Piper potatoes', unit: 'g' },
      { amount: 5, name: 'Salt', unit: 'g' },
      { amount: 400, name: 'sunflower oil', unit: 'ml' },
      { amount: 200, name: ' Maris Piper potatoes', unit: 'g' },
      { amount: 10, name: 'Salt', unit: 'g' },
    ],
    instructions: [
      'Three obvious things are important on your journey to perfection – your choice of potato, your choice of oil and your choice of salt. For me, the Maris Piper potato wins every time, and you want to use nice large ones.',
      'On oil, sunflower and sunseed are very efficient, and many people swear by using groundnut oil. But, if you’re after flavour, cooking chips in beef tallow (rendered beef fat you can get from your butcher) gives you better flavour and colour – the choice is yours.',
      'Finally, on salt, being an Essex boy, in my house it has to be Maldon sea salt.',
      'So down to business: chop 800g of Maris Piper potatoes into finger-sized chips, leaving the skin on – don’t be too exact.',
      'Chip shops have massive industrial fryers, which you can’t recreate at home, so you need to use a large sturdy pan on a medium to high heat (unless you own a deep-fat fryer, of course). Your oil should be 8cm deep, but never fill your pan more than half full. If you don’t have a thermometer, use a raw chip, and as it starts to float and fry the temperature should be about 140°C, which is perfect for blanching.',
      'Use a large metal sieve to gently lower the chips into the pan for around 8 minutes, or until soft but not coloured, then remove to a tray to cool.',
      'Turn the heat up under the oil and return one blanched chip to the oil as a guide again. Once it’s floating and golden the temperature should be about 180°C, which is perfect for frying and will give you chips with those all-important crispy outsides and fluffy middles.',
      'At this stage you may want to cook your chips in 2-portion batches, so you don’t decrease the temperature of the oil too much or overcrowd the pan. Fry the chips until beautifully golden, then remove to a bowl lined with kitchen paper, shake around a bit, season with sea salt and serve right away.',
    ],
    numberOfPortions: 4,
    categories: ['Breakfast', 'Healthy'],
    id: 3,
  },
  {
    title: 'Short One',
    description: 'Aaaa',
    ingredientsList: [{ amount: 10, name: 'Salt', unit: 'g' }],
    instructions: ['aaa'],
    numberOfPortions: 4,
    categories: ['Breakfast', 'Healthy'],
    id: 4,
  },
  {
    title: 'Wide One',
    imgs: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbn16lnFBzhCCqEZgNvOUH52asJIRv5QoROw&s',
    ],
    description: 'Aaaa',
    ingredientsList: [{ amount: 10, name: 'Salt', unit: 'g' }],
    instructions: ['aaa'],
    numberOfPortions: 4,
    categories: ['Breakfast', 'Healthy'],
    id: 5,
  },
];
