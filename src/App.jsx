import logo from "./logo.svg";
import "./App.css";
import EmailList from "./components/EmailList";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import EmailDetails from "./components/EmailDetails";

const URL = "https://6366339879b0914b75cba9c2.mockapi.io/api/email";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function App() {
  const [isActive, setIsActive] = useState(false);
  const [currentActive, setCurrentActive] = useState({});
  const [Emails, setEmails] = useState([]);
  const [showMails, setShowMails] = useState(Emails);
  const [currentPage, setCurrentPage] = useState("UNREAD");
  useEffect(() => {
    fetchHandler().then((data) => {
      let data1 = data;
      data1.forEach((d) => {
        d["isFav"] = false;
        d["isRead"] = false;
        d["isDeleted"] = false;
        d["body"] = "";
      });
      setEmails(data1);
      setShowMails(data1);
    });
  }, []);

  const handleClickCard = (isActive, data) => {
    const newData = Emails.map((item, i) => {
      if (item.id == data.id) {
        return { ...item, ["isRead"]: true };
      } else return item;
    });
    setEmails(newData);
    setShowMails(newData);

    setCurrentActive(data);
    if (!isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    // else if (!!isActive && data.id != currentActive.id) {
    //   setCurrentActive(data);
    // }
  };
  const markFavorite = (emailDetail) => {
    const newData = Emails.map((item, i) => {
      if (item.id == emailDetail.id) {
        return { ...item, ["isFav"]: !item.isFav };
      } else return item;
    });
    setEmails(newData);
    setShowMails(newData);
  };
  const handleFilter = (c) => {
    setIsActive(false);
    setCurrentPage(c);
    if (c == "UNREAD") {
      let unreadMails = Emails.filter((mail) => !mail.isRead);
      console.log("unreadMails", unreadMails);
      setShowMails(unreadMails);
    } else if (c == "READ") {
      let readMails = Emails.filter((mail) => mail.isRead);
      console.log("reead", readMails);
      setShowMails(readMails);
    } else if (c == "FAVORITES") {
      let favoriteMails = Emails.filter((mail) => mail.isFav);
      console.log("fav", favoriteMails);
      setShowMails(favoriteMails);
    }
    console.log("showMails", showMails);
    console.log("showMails", Emails);
  };

  return (
    <div className="App">
      <Header handleFilter={handleFilter} currentPage={currentPage} />
      <div className="container">
        <EmailList
          emails={showMails}
          handleClick={handleClickCard}
          isActive={isActive}
          currentActive={currentActive}
        />
        {isActive && (
          <section style={{ flex: 2 }}>
            <EmailDetails data={currentActive} markFavorite={markFavorite} />
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
