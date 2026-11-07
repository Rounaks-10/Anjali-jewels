import { useEffect } from "react";

const FireworkStory = () => {
  useEffect(() => {
    // Avoid loading script multiple times
    if (!document.getElementById("firework-script")) {
      const script = document.createElement("script");
      script.src = "https://asset.fwcdn3.com/js/storyblock.js";
      script.async = true;
      script.id = "firework-script";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "80vh" }}>
      <fw-storyblock
        channel="tanishq"
        playlist="g2037N"
        autoplay="true"
        loop="true"
        style={{ width: "100%", height: "100%" }}
      ></fw-storyblock>
    </div>
  );
};

export default FireworkStory;