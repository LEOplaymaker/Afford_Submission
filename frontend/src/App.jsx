import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<All />} />
          <Route path="/train" element={<TrainDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function Header() {
  return (
    <div className='Header'>
      <img src="https://cdn-icons-png.flaticon.com/512/3/3843.png" alt="Vite Logo" className='logo' height="50px" width="50px" />
      <h3>Train Booking Schedule</h3>
    </div>
  );
}

function All() {
  const [dataTrain, setDataTrain] = useState([
    {
      trainDetails: "LOADING",
      trainPrice: "LOADING",
      trainTime: "LOADING",
    }
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getTrainDetails() {
      try {
        const response = await axios.get("https://afford.onrender.com/getDetails");
        setDataTrain(response.data)
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    }
    getTrainDetails();
  }, []);

  const viewDets = (trainNumber) => {
    navigate("/train?trainNum=" + trainNumber);
  }

  useEffect(() => {
    console.log(dataTrain);
  }, [dataTrain]);

  return (<div className='content_main'>
    <table id="customers">
      <tr>
        <th>trainNumber</th>
        <th>trainDetails</th>
        <th>trainPrice</th>
        <th>trainTime</th>
        <th>available</th>
        <th>Action</th>
      </tr>
      {
        dataTrain.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.trainNumber}</td>
              <td>{item.trainDetails}</td>
              <td>{item.trainPrice}</td>
              <td>{item.trainTime}</td>
              <td>{item.available ? "Yes" : "No"}</td>
              <td><button onClick={() => viewDets(item.trainNumber)}>View</button></td>
            </tr>
          )
        }
        )
      }
    </table>
  </div>)
}

function TrainDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const trainNumber = searchParams.get("trainNum");
  console.log(trainNumber);

  const [trainDets, setTrainDets] = useState({
  });
  useEffect(() => {
    async function fetch() {
      await axios.get(`https://afford.onrender.com/getParticularDets?trainNum=${trainNumber}`).then((response) => {
        console.log(response.data);
        setTrainDets(response.data);
      });
    }
    fetch();
  }, []);
  return (
    <div className='content_main'>
      <table id="customers">
        <tr>
          <th>trainNumber</th>
          <th>trainName</th>
          <th>departureTime</th>
          <th>Price</th>
          <th>Seats Available</th>
          <th>delayedBy</th>
        </tr>
        <tr>
          <td>{trainDets?.trainNumber}</td>
          <td>{trainDets?.trainName}</td>
          <td>
            <div className='con'>
              <span>{"Hours : " + trainDets?.departureTime?.Hours}</span>
              <span>{"Minutes : " + trainDets?.departureTime?.Minutes}</span>
              <span>{"Seconds : " + trainDets?.departureTime?.Seconds}</span>
            </div>
          </td>
          <td>
            <div className='con'>
              <span>{"Sleeper : " + trainDets?.price?.sleeper}</span>
              <span>{"AC : " + trainDets?.price?.AC}</span>
            </div>
          </td>
          <td>
            <div className='con'>
              <span>{"Sleeper : " + trainDets?.seatsAvailable
?.sleeper}</span>
              <span>{"AC : " + trainDets?.seatsAvailable
?.AC}</span>
            </div>
          </td>
          <td>{trainDets?.delayedBy}</td>
        </tr>
      </table>
    </div>
  )
}

export default App
