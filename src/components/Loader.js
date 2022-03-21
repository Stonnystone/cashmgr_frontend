import React,{ useState } from "react";

// Loading Screen utils
import Lottie from "react-lottie";
import FadeIn from "react-fade-in";

// Lottie Images
import loading from "../styles/lottie/loading.json"
import tick from "../styles/lottie/tick.json"

// Loading screen
export const Loader = ({ show }) => {
  const [done, setDone] = useState(false);
  
  React.useEffect(() => {
    let timeout = setTimeout(() => setDone(true), 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions2 = {
    loop: false,
    autoplay: true,
    animationData: tick,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <FadeIn>
        <div className={`loader bg-light align-items-center`}>
          {!done ? (
            <>
              <Lottie options={defaultOptions} height={120} width={120} />
            </>
          ) : (
            <Lottie options={defaultOptions2} height={120} width={120} />
          )}
        </div>
      </FadeIn>
    </>
  );
};
