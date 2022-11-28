import React from "react";
import EmailCard from "./EmailCard";
const EmailList = ({ emails, handleClick, isActive, currentActive }) => {
  return (
    <div
      style={{
        flex: 1,
        width: "90%",
        zIndex: 2,
        height: "80vh",
        margin: "auto",
      }}
    >
      {emails.map((email) => (
        <EmailCard
          email={email}
          key={email.id}
          handleClick={handleClick}
          isActive={isActive}
          currentActive={currentActive}
        />
      ))}
    </div>
  );
};

export default EmailList;
