import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonToast,
  IonLoading,
} from "@ionic/react";
import { egg, logoTwitter } from "ionicons/icons";
import React, { useState } from "react";
import "./Home.css";

const Home: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const quoteText: any = document.getElementById("quote");
  const authorText: any = document.getElementById("author");

  async function getQuote() {
    setShowLoading(true);

    const apiUrl = "https://type.fit/api/quotes";
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const oneQuote = data[Math.floor(Math.random() * data.length)];
      //
      if (authorText === "") {
        authorText.innerText = "Unknown";
      } else {
        authorText.innerText = oneQuote.author;
      }
      quoteText.innerText = oneQuote.text;
      setShowLoading(false);
    } catch (error) {
      console.log("error no quote", error);
      setShowToast(true);
    }
  }

  function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
  }

  function handleClick() {
    getQuote();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Random Quote Machine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonTitle size="large">Blank</IonTitle>
        </IonHeader>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Finding Quote"}
          duration={5000}
        />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="There seems to be an error, Please try again."
          duration={500}
        />

        <div className="main-box" id="quote-box">
          <div className="quote-text">
            <IonIcon icon={egg}></IonIcon>
            <span id="quote"></span>
            <IonIcon icon={egg}></IonIcon>
          </div>
          <div className="quote-author">
            <span id="author"></span>
          </div>
          <div className="button-box">
            <IonButton onClick={tweetQuote} id="twitter" title="Tweet this!!">
              <IonIcon icon={logoTwitter} />
            </IonButton>
            <IonButton onClick={handleClick} color="light" id="new-quote">
              NEW QUOTE!
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
