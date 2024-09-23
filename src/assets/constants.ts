type TierType = {
    id: string;
    name: string;
    description: string;
    price: number;
}

const tiers: TierType[] = [
    {
      id: "BRONZE",
      name: "Bronze",
      description: "Get average points",
      price: 0.99,
    },
    {
      id: "SILVER",
      name: "Silver",
      description: "Get extra points",
      price: 4.99,
    },
    {
      id: "GOLD",
      name: "Gold",
      description: "The highest possible tier",
      price: 19.99,
    },
  ];

  export {
    tiers,
  }