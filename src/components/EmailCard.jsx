import React from "react";
import "./styles/EmailCard.css";

let dte = new Date();
let dformat =
  [dte.getMonth() + 1, dte.getDate(), dte.getFullYear()].join("/") +
  " " +
  [dte.getHours(), dte.getMinutes(), dte.getSeconds()].join(":");

const EmailCard = ({ email, handleClick, isActive, currentActive }) => {
  return (
    <div
      className="card"
      id={email.isRead ? "readCard" : ""}
      onClick={() => handleClick(isActive, email)}
    >
      <section className="leftCol">
        <div className="avatar">{email.from_name.charAt(0)}</div>
      </section>
      <section className="rightCol">
        <h4>
          From :{" "}
          <span>
            {email.from_name} {`<${email.from_email}>`}
          </span>
        </h4>
        <h4>
          Subject : <span> {email.subject}</span>
        </h4>
        <h4>{email.short_description}</h4>
        <h4>
          {dformat} {email.isFav ? <span className="fav">Favorite</span> : ""}
        </h4>
      </section>
    </div>
  );
};

export default EmailCard;
