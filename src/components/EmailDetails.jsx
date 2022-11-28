import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/EmailDetails.css";

const URL = "https://6366339879b0914b75cba9c2.mockapi.io/api/email/";
const fetchHandler = async (id) => {
  return await axios.get(URL + id).then((res) => res.data);
};

let dte = new Date();
let dformat =
  [dte.getMonth() + 1, dte.getDate(), dte.getFullYear()].join("/") +
  " " +
  [dte.getHours(), dte.getMinutes(), dte.getSeconds()].join(":");
const EmailDetails = ({ data, markFavorite }) => {
  const [emailDetail, setEmailDetails] = useState(data);
  useEffect(() => {
    fetchHandler(data.id).then((data2) => {
      setEmailDetails((emailDetail) => ({
        ...emailDetail,
        ["body"]: data2.body,
      }));
    });
  }, []);
  return (
    <div className="detailBox">
      <section className="leftCol">
        <div className="avatar">{emailDetail.from_name.charAt(0)}</div>
      </section>
      <section className="rightCol">
        <h1>
          {emailDetail.subject}{" "}
          {emailDetail.isFav ? (
            <button
              className="favBtn"
              onClick={() => {
                setEmailDetails(emailDetail=>({...emailDetail, ["isFav"]: !emailDetail.isFav }));
                 markFavorite(emailDetail)
                }
              }
            >
              Delete favorite
            </button>
          ) : (
            <button
              className="favBtn"
              onClick={() =>{
                setEmailDetails(emailDetail=>({...emailDetail, ["isFav"]: !emailDetail.isFav }));
               markFavorite(emailDetail)
              }}
            >
              Mark as favorite
            </button>
          )}
        </h1>
        <h4>{dformat}</h4>
        <span
          className="htmlElement"
          dangerouslySetInnerHTML={{ __html: `${emailDetail.body}` }}
        ></span>
      </section>
    </div>
  );
};

export default EmailDetails;
