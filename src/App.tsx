import React, { useState } from "react";
import { Button } from "./components/ui/button";
import "./App.css";

function App() {
  const [page, setPage] = useState(1);

  const nextPage = () => setPage((prev) => Math.min(prev + 1, 5));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="app-container">
      {page === 1 && (
        <div className="page page1">
          <video
            className="bg-video"
            src="/videos/background.mp4"
            autoPlay
            loop
            muted
          />
          <h1 className="header-top">MANDASTRONG</h1>
          <div className="button-group">
            <Button onClick={nextPage}>Next</Button>
            <Button>Login</Button>
            <Button>Register</Button>
          </div>
        </div>
      )}

      {page === 2 && (
        <div className="page page2">
          <h2 className="header-top">Welcome to MandaStrong Studio</h2>
          <p className="tagline-top">
            Make Your Own Longer Movies – Now Up to 180 Minutes
          </p>
          <div className="bottom-content">
            <video
              className="bottom-video"
              src="/videos/thatsallfolks.mp4"
              controls
            />
            <div className="nav-buttons">
              <Button onClick={prevPage}>Back</Button>
              <Button onClick={nextPage}>Next</Button>
            </div>
          </div>
        </div>
      )}

      {page === 3 && (
        <div className="page page3">
          <h2 className="header-top">Special Offer</h2>
          <p className="tagline-top">
            1st Time Registers Receive 3 Hours Complimentary
          </p>
          <div className="bottom-content">
            <div className="nav-buttons">
              <Button onClick={prevPage}>Back</Button>
              <Button onClick={nextPage}>Next</Button>
            </div>
          </div>
        </div>
      )}

      {page === 4 && (
        <div className="page page4">
          <h2 className="header-top">Editors Choice</h2>
          <div className="bottom-content">
            <input type="file" />
            <video className="bottom-video" controls />
            <div className="nav-buttons">
              <Button onClick={prevPage}>Back</Button>
              <Button onClick={nextPage}>Next</Button>
            </div>
          </div>
        </div>
      )}

      {page === 5 && (
        <div className="page page5">
          <h2 className="header-top">Thank You</h2>
          <p className="tagline-top">Your clips are ready to use!</p>
          <Button onClick={() => setPage(1)}>Home</Button>
        </div>
      )}
    </div>
  );
}

export default App;