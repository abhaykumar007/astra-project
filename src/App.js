import "./App.css";
import Introduction from "./components/introduction";
import { useState, useEffect, useRef } from "react";
function App() {
  const [like, setLike] = useState(
    localStorage.like ? parseInt(localStorage.like) : 0
  );
  const [feedBack, setFeedBack] = useState(false);
  const [image, setImage] = useState();
  const [input, setInput] = useState();
  const [flag, setFlag] = useState(false);

  const ref = useRef(null);

  function likeFun() {
    setLike((prevState) => prevState + 1);
    localStorage.setItem("like", like + 1);
  }

  function feedBackFun() {
    if (!flag) {
      setFeedBack(true);
    } else {
      alert("Feedback already sent");
    }
  }

  function saveFeedback() {
    // console.log("input", input);
    localStorage.setItem("feedback", input);
    setFeedBack(false);
    setFlag(true);
  }
  async function getdata() {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setImage(data.message);
    } catch (err) {
      console.log("error", err);
    }
  }
  useEffect(() => {
    if (feedBack) {
      ref.current.focus();
    }
  }, [feedBack]);
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="App">
      <div className="parent">
        <div className="header">
          <h2>Announcements</h2>
        </div>
        <div className="today">
          <h6>Today</h6>
          <div className="border">
            <div className="container">
              <Introduction kid={image} />
              <div
                className="background-btn"
                style={{
                  color: "rgb(133, 1, 1)",
                  backgroundColor: "rgb(243, 192, 192)",
                }}
              >
                <p>Absent</p>
              </div>
            </div>
          </div>
          <div className="border">
            <div className="container">
              <Introduction kid={image} />
              <div
                className="background-btn"
                style={{
                  color: "rgb(172, 5, 5)",
                  backgroundColor: "rgb(255, 215, 149)",
                }}
              >
                <p>Marks</p>
              </div>
            </div>
            <div className="container sub-container">
              <div>
                <p>Unit Test</p>
                <h5>English</h5>
              </div>
              <h1>32 / 40</h1>
            </div>
          </div>
        </div>
        <div className="yesterday">
          <h6>Yesterday</h6>
          <div className="border">
            <div className="container">
              <Introduction kid={image} />
              <div
                className="background-btn"
                style={{
                  color: " rgb(18, 83, 1)",
                  backgroundColor: " rgb(185, 230, 174)",
                }}
              >
                <p>Fees</p>
              </div>
            </div>
            <div className="container sub-container para">
              <p>Due on: Thursday, 23 Nov 2021</p>
            </div>
          </div>
          <div className="border">
            <div className="container">
              <Introduction kid={image} />
              <div
                className="background-btn"
                style={{
                  color: "rgb(4, 53, 126)",
                  backgroundColor: " rgb(187, 211, 247)",
                }}
              >
                <p>Announcement</p>
              </div>
            </div>
            <div className="container sub-container para">
              <p>
                School will be closed tomorrow due to rains. Any changes to
                school reopening will be notified
              </p>
            </div>

            <div className="container footer">
              <div className="sub-footer">
                <i class="far fa-thumbs-up" onClick={likeFun}></i>
                <p>{like}</p>
              </div>
              <div className="sub-footer" onClick={feedBackFun}>
                <i class="far fa-comment"></i>
                <p>{flag ? `Feedback sent` : `Send feedback`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {feedBack && (
        <div className="feedback-parent">
          <div className="blackScreen"></div>
          <div className="feedback">
            <p>Only School Admin will be able to see your feedback</p>
            <div className="input">
              <textarea
                ref={ref}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            <div className="button">
              <button
                style={{ color: "gray", marginRight: "1vh" }}
                onClick={() => setFeedBack(false)}
              >
                CANCEL
              </button>
              <button
                style={{ color: "rgb(4, 53, 126)" }}
                onClick={saveFeedback}
              >
                SHARE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
