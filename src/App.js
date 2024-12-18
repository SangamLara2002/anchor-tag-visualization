import React, { useState, useEffect } from "react";

const App = () => {
  const anchors = [
    { id: 1, x: 100, y: 100 },
    { id: 2, x: 300, y: 100 },
    { id: 3, x: 200, y: 300 },
  ];

  const [tag, setTag] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   const fetchTagPosition = async () => {
  //     try {
  //       // Replace with your actual API endpoint
  //       const response = await fetch('your-backend-url/tag-position');
  //       const data = await response.json();
  //       setTag({
  //         x: data.x,
  //         y: data.y
  //       });
  //     } catch (error) {
  //       console.error('Error fetching tag position:', error);
  //     }
  //   };

  //   // Poll backend every second
  //   const interval = setInterval(fetchTagPosition, 1000);

  //   return () => clearInterval(interval);
  // }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setTag({
        x: Math.random() * 400,
        y: Math.random() * 400,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)).toFixed(2);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <div style={{
        position: "relative",
        width: "500px",
        height: "500px",
        border: "2px solid black",
        margin: 'auto'
      }}>
        {/* Rest of your existing render code remains the same */}
        {anchors.map((anchor) => (
          <div key={anchor.id}>
            <div
              style={{
                position: "absolute",
                top: anchor.y,
                left: anchor.x,
                width: "10px",
                height: "10px",
                backgroundColor: "blue",
                borderRadius: "50%",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: anchor.y - 20,
                left: anchor.x - 10,
                fontSize: "12px",
                whiteSpace: "nowrap"
              }}
            >
              Anchor {anchor.id}
            </div>
          </div>
        ))}

        <div>
          <div
            style={{
              position: "absolute",
              top: tag.y,
              left: tag.x,
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: tag.y - 20,
              left: tag.x - 10,
              fontSize: "12px",
              whiteSpace: "nowrap"
            }}
          >
            Tag
          </div>
        </div>

        {anchors.map((anchor) => (
          <svg key={anchor.id} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
            <line
              x1={anchor.x + 5}
              y1={anchor.y + 5}
              x2={tag.x + 5}
              y2={tag.y + 5}
              stroke="black"
            />
            <text
              x={(anchor.x + tag.x) / 2}
              y={(anchor.y + tag.y) / 2 - 5}
              fontSize="12"
              fill="black"
            >
              {calculateDistance(anchor.x, anchor.y, tag.x, tag.y)}
            </text>
          </svg>
        ))}
      </div>
    </div>
  );
};

export default App;
