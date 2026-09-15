export const restaurant = {
  name: "Aurelio",
  tagline: "Modern French cooking, an intimate dining room, and a drinks list worth lingering over.",
  heroTagline: "Good Food. Great Moments.",
  heroDescription:
    "A fine dining experience where exquisite flavors, warm ambiance, and genuine hospitality come together.",
  address: {
    line1: "418 Harrow Lane",
    line2: "San Francisco, CA 94111",
  },
  phone: "(415) 555-0148",
  email: "hello@aurelio-sf.com",
  hours: [
    { day: "Monday", time: "Closed" },
    { day: "Tuesday – Thursday", time: "5:00 PM – 10:00 PM" },
    { day: "Friday – Saturday", time: "5:00 PM – 11:00 PM" },
    { day: "Sunday", time: "5:00 PM – 9:00 PM" },
  ],
  mapQuery: "418 Harrow Lane, San Francisco, CA 94111",
};

export const menu = [
  {
    category: "To Start",
    items: [
      {
        name: "Charred Octopus",
        description: "Smoked paprika, fingerling potato, salsa verde",
        price: "$21",
      },
      {
        name: "Burrata",
        description: "Heirloom tomato, basil oil, aged balsamic",
        price: "$18",
      },
      {
        name: "Tartare",
        description: "Hand-cut beef, capers, egg yolk, brioche toast",
        price: "$24",
      },
      {
        name: "Roasted Beet Salad",
        description: "Whipped goat cheese, candied walnut, sherry vinaigrette",
        price: "$16",
      },
    ],
  },
  {
    category: "Mains",
    items: [
      {
        name: "Pan-Seared Duck Breast",
        description: "Cherry gastrique, root vegetable purée, charred scallion",
        price: "$42",
      },
      {
        name: "Wild Mushroom Risotto",
        description: "Parmesan, truffle oil, crisp sage",
        price: "$32",
      },
      {
        name: "Grilled Branzino",
        description: "Fennel, blood orange, olive tapenade",
        price: "$38",
      },
      {
        name: "Dry-Aged Ribeye",
        description: "14oz, bordelaise, confit garlic, pommes frites",
        price: "$56",
      },
    ],
  },
  {
    category: "Desserts",
    items: [
      {
        name: "Dark Chocolate Tart",
        description: "Sea salt caramel, espresso crémeux",
        price: "$14",
      },
      {
        name: "Crème Brûlée",
        description: "Tahitian vanilla, seasonal berries",
        price: "$13",
      },
      {
        name: "Tarte Tatin",
        description: "Caramelized apple, crème fraîche",
        price: "$14",
      },
    ],
  },
  {
    category: "Drinks & Mocktails",
    items: [
      {
        name: "Aurelio Spritz",
        description: "House-made bitters syrup, soda, orange peel",
        price: "$12",
      },
      {
        name: "Garden Mule",
        description: "Cucumber, mint, ginger beer, fresh lime",
        price: "$11",
      },
      {
        name: "Golden Hour",
        description: "Turmeric-ginger cordial, coconut cream, pineapple",
        price: "$12",
      },
      {
        name: "Berry Fizz",
        description: "Muddled seasonal berries, lemon, sparkling water",
        price: "$10",
      },
      {
        name: "Iced Botanical Tea",
        description: "Hibiscus, lemongrass, honey",
        price: "$8",
      },
      {
        name: "Espresso Tonic",
        description: "Double espresso, house tonic, orange twist",
        price: "$9",
      },
    ],
  },
];
