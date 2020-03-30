import React, { useEffect, useState } from "react";
import gsap from "gsap";
import "./styles/App.scss";

//Components
import Header from "./components/header.component";
import Navigation from "./components/navigation.component";

//Pages
import Home from "./pages/home.pages";
import CaseStudies from "./pages/case-studies.pages";
import About from "./pages/about.pages";
import Approach from "./pages/approach.pages";
import Services from "./pages/services.pages";
import { Route } from "react-router-dom";

//Routes
const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/case-studies", name: "Case Studies", Component: CaseStudies },
  { path: "/about-us", name: "About Us", Component: About },
  { path: "/approach", name: "Approach", Component: Approach },
  { path: "/services", name: "Services", Component: Services }
];

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const App = () => {
  //Prevent Flashing first in the app.scss set visibility to hidden than come back here like the code below
  gsap.to("body", 0, {
    css: { visibility: "visible" }
  });
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });
  useEffect(() => {
    //GRab innser height of window for mobile reasons when dealing with vh
    let vh = dimensions.height * 0.01;
    //Set css variable vh
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  return (
    <>
      <Header dimensions={dimensions} />
      {console.log(dimensions)}
      <div className="App">
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
            <Component />
          </Route>
        ))}
      </div>
      <Navigation />
    </>
  );
};

export default App;
