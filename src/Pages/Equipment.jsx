import React from 'react';

// Equipment data
const equipmentData = [
  {
    id: 1,
    name: "Espresso Machine",
    description: "Machine for brewing espresso by forcing hot water through finely-ground coffee.",
    category: "Electric",
    price: 299.99,
    features: ["15-bar pressure pump", "Steam wand for frothing milk", "Programmable shot volume", "Removable water tank"]
  },
  {
    id: 2,
    name: "French Press",
    description: "Manual coffee maker with a plunger and filter screen that presses hot water through ground coffee.",
    category: "Manual",
    price: 29.99,
    features: ["Stainless steel plunger", "Heat-resistant glass carafe", "Dishwasher safe", "Easy to use and clean"]
  },
  {
    id: 3,
    name: "Pour-Over Coffee Maker",
    description: "Device for manually pouring hot water over coffee grounds, often using a filter.",
    category: "Manual",
    price: 24.99,
    features: ["Borosilicate glass", "Reusable stainless steel filter", "Non-slip grip", "Compact design"]
  },
  {
    id: 4,
    name: "AeroPress",
    description: "Compact manual coffee maker that uses air pressure to push water through coffee grounds.",
    category: "Manual",
    price: 34.99,
    features: ["Portable", "Quick brewing time", "Durable plastic body", "Includes filters and stirrer"]
  },
  {
    id: 5,
    name: "Cold Brew Coffee Maker",
    description: "Brewing device for making cold brew coffee by steeping grounds in cold water over several hours.",
    category: "Manual",
    price: 39.99,
    features: ["Glass carafe with lid", "Fine mesh filter", "Dishwasher safe", "Brews 1 liter of coffee"]
  },
  {
    id: 6,
    name: "Coffee Grinder",
    description: "Device for grinding coffee beans, available in manual or electric versions.",
    category: "Electric/Manual",
    price: 49.99,
    features: ["Stainless steel burrs", "Multiple grind settings", "Detachable bean hopper", "Compact design"]
  },
  {
    id: 7,
    name: "Moka Pot",
    description: "Stovetop coffee maker that brews coffee by passing boiling water pressurized by steam through coffee grounds.",
    category: "Stovetop",
    price: 19.99,
    features: ["Aluminum body", "Heat-resistant handle", "Classic Italian design", "Brews rich, strong coffee"]
  },
  {
    id: 8,
    name: "Milk Frother",
    description: "Tool for frothing milk, commonly used for lattes and cappuccinos.",
    category: "Electric/Manual",
    price: 15.99,
    features: ["Stainless steel whisk", "Ergonomic handle", "Battery-operated", "Compact and portable"]
  },
  {
    id: 9,
    name: "Coffee Scale",
    description: "Digital scale for measuring coffee and water for accurate brewing ratios.",
    category: "Accessory",
    price: 25.99,
    features: ["Precision measurement", "Backlit display", "Tare function", "Rechargeable battery"]
  },
  {
    id: 10,
    name: "Kettle",
    description: "Electric or stovetop kettle, often with a gooseneck spout for precise pouring.",
    category: "Electric/Stovetop",
    price: 39.99,
    features: ["Gooseneck spout", "Temperature control", "Stainless steel body", "Quick heating"]
  },
  {
    id: 11,
    name: "Drip Coffee Maker",
    description: "Electric machine for automatically brewing coffee by dripping hot water through a filter and into a carafe.",
    category: "Electric",
    price: 49.99,
    features: ["Programmable timer", "12-cup capacity", "Reusable filter", "Keep-warm function"]
  },
  {
    id: 12,
    name: "Reusable Coffee Filter",
    description: "Eco-friendly filter for use in various coffee makers, usually made of metal or cloth.",
    category: "Accessory",
    price: 9.99,
    features: ["Stainless steel mesh", "Eco-friendly", "Fits standard coffee makers", "Dishwasher safe"]
  },
  {
    id: 13,
    name: "Coffee Tamper",
    description: "Tool for pressing down coffee grounds in an espresso machine portafilter.",
    category: "Accessory",
    price: 14.99,
    features: ["Stainless steel base", "Ergonomic handle", "Fits standard portafilters", "Durable build"]
  },
  {
    id: 14,
    name: "Syphon Coffee Maker",
    description: "Vacuum coffee brewer that uses vapor pressure to brew coffee.",
    category: "Stovetop",
    price: 79.99,
    features: ["Heat-resistant glass", "Cloth filter", "Precision brewing", "Unique brewing method"]
  }
];

const Equipment = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Coffee Making Equipment</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {equipmentData.map((item) => (
          <div key={item.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            margin: '10px',
            width: '300px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <h2 style={{ fontSize: '1.5em' }}>{item.name}</h2>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
            <div>
              <strong>Features:</strong>
              <ul>
                {item.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equipment;
