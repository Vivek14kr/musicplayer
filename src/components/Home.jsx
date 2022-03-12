import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Login } from "../Redux/Login/actions";
import "./Home.css";
import CardContent from "@material-ui/core/CardContent";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Card from "@material-ui/core/Card";
import Player from "./Player";

export const Home = () => {
  const [data, setdata] = useState([]);
  const [keyy, setkey] = useState("");
  const [keydata, setkeydata] = useState([]);
  const [keyarray, setkeyarr] = useState([]);
  const [valuearr, setvalarr] = useState([]);
  const [valuee, setValuee] = useState("");
  const [show, setshow] = useState(false)

    const [searchsig, setsearch] = useState("");
    const showfilter = () => {
   
  let newdata = [];

  let dataa = data;
  console.log(data, "dfd");
  for (let r = 0; r < dataa.length; r++) {
    if (dataa[r].artists == searchsig) {
      newdata.push(dataa[r]);
      break;
    }

    let artist = dataa[r].artists.split(" ");
    console.log(artist.join(""), " newkdfjkd");
    if (artist.length > 1) {
      console.log(artist);
      for (let o = 0; o < artist.length; o++) {
        console.log(searchsig, artist[0], artist, " search");

        if (artist[o] == searchsig) {
          console.log("yes");
          console.log(data[r]);
          newdata.push(dataa[r]);
          break;
        }
      }
    }
  }
  console.log(newdata, "newdata");
  setdata(newdata);
      

    
    };
  useEffect(() => {
    fetchPost();
  }, []);

 
  const fetchPost = async () => {
    let dataaa = [];
    const baseURL =
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/studiod9c0baf.json";
    await fetch(baseURL)
      .then((resp) => resp.json())
      .then((dataa) => (dataaa = dataa));

    for (let j = 0; j < dataaa.length; j++) {
      dataaa[j].tracking = "none";
      dataaa[j].songKey = [[], []];
    }
    console.log(dataaa, " lklkl");
    setdata(dataaa);
  };
  console.log(data);
  const handlebtn = (songname) => {
    let track = data.filter((item) => item.song == songname);
    let obj = track[0];

    console.log(obj.songKey, " objsongkey");
    if (
      obj.songKey.length == 0 &&
      obj.songKey[0].length == 0 &&
      obj.songKey[1].length == 0
    ) {
      console.log(obj);

      obj.songKey[0].push({ keyy });

      obj.songKey[1].push({ valuee });

      console.log(obj, " dfkdfkdjfksdjf");

      let newdata = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].song == songname) {
          newdata.push(obj);
        } else {
          newdata.push(data[i]);
        }
      }
      setdata(newdata);
      console.log(" data", data);
    } else {
      console.log(obj.songKey, obj.songKey[0], obj.songKey[1]);
      obj.songKey[0].push(keyy);

      console.log("newarr ", obj.songKey[0]);
      obj.songKey[1].push(valuee);
      // let newww = [newarrrkey, valarrr];

      let newdata = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].song == songname) {
          newdata.push(obj);
        } else {
          newdata.push(data[i]);
        }
      }
      setdata(newdata);
      console.log(" new  updated data", data);
    }
  };
  const handleshowit = (song) => {
    let daq = [];
    for (let q = 0; q < data.length; q++) {
      if (data[q].song == song) {
        if (data[q].tracking == "none") {
          data[q].tracking = "block";
        } else {
          data[q].tracking = "none";
        }
        daq.push(data[q]);
      } else {
        daq.push(data[q]);
      }
    }
    setdata(daq);
  };

const sortltoh = ()=>{
  
  let d = data
  d.sort(function (a, b) {
    if (a.song[0] < b.song[0]) {
      return -1;
    }
    if (a.song[0] > b.song[0]) {
      return 1;
    }
    return 0;
  });

 console.log(d, "new d")
  setdata(d)
}

  return (
    <div>
      <div>
        <b>FIlter</b>
        <div>
          <input
            onChange={(e) => [setsearch(e.target.value)]}
            type="text"
            placeholder="Search Singer"
          />
          <button onClick={showfilter}>Search</button>
        </div>
        <button onClick={sortltoh}>Sort :A-Z</button>
      </div>

      <div id="gridview">
        {data.map((item) => (
          <div key={item.id} className="itemnu">
            <img className="cvrimg" src={item.cover_image} alt="" />
            <p>Song : {<b>{item.song}</b>}</p>
            <p>Artists: {<b>{item.artists}</b>}</p>

            <div className="viewset1">
              <div className="viewset">
                <div>
                  {item.songKey[0].map((item) => (
                    <div className="keydiv">
                      {" "}
                      <p className="keyname">{item}:</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="viewset">
                <div>
                  {item.songKey[1].map((item) => (
                    <div className="valdiv">
                      <b className="valuename"> {item}</b>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={(e) => {
                handleshowit(item.song);
              }}
            >
              Add Other Details
            </button>
            <Player url={item.url} />
            <div style={{ display: item.tracking }}>
              <input
                onChange={(e) => {
                  setkey(e.target.value);
                }}
                type="text"
                placeholder="Key"
              />
              <input
                onChange={(e) => {
                  setValuee(e.target.value);
                }}
                type="text"
                placeholder="Value"
              />
              <button
                onClick={() => {
                  handlebtn(item.song);
                }}
              >
                Add
              </button>

              <div>
                {item.Keys}: {item.Values}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
