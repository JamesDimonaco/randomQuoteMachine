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
  useIonViewDidEnter,
  IonFab,
  IonFabButton,
  IonFabList,
} from "@ionic/react";
import {
  logoTwitter,
  share,
  logoGithub,
  logoLinkedin,
  cafeSharp,
} from "ionicons/icons";
import React, { useState } from "react";
import "./Home.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import axios from "axios";
import { RandomImage } from "../components/RandomImage";

let quoteList: any[];

const Home: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [quote, setQuote] = useState({
    text: "Loading...",
    author: "",
  });

  const getQuotes = async () => {
    setShowLoading(true);
    const response = await axios.get("https://type.fit/api/quotes");
    setShowLoading(false);
    if (response.data) {
      quoteList = response.data;
    } else {
      if (quote.author == null) {
        quote.author = "Unknown";
      }
      console.log("error no quote");
      setShowToast(true);
    }
  };

  const changeQuote = () => {
    setQuote(quoteList[Math.floor(Math.random() * quoteList.length)]);
  };

  useIonViewDidEnter(async () => {
    await getQuotes();
    changeQuote();
  });

  function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`;
    window.open(twitterUrl, "_blank");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Random Machine </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scroll-y={true} fullscreen>
        <IonHeader collapse="condense">
          <IonTitle size="large">Blank</IonTitle>
        </IonHeader>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Finding Quote"}
          duration={2000}
        />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="There seems to be an error, Please try again."
          duration={5000}
        />
        <div className="flex">
          <div className="main-box" id="quote-box">
            <div className="quote-text">
              <FaQuoteLeft className="quoteSimbol" />
              <span id="quote">{quote.text}</span>
              <FaQuoteRight className="quoteSimbol" />
            </div>
            <div className="quote-author">
              <span id="author">{quote.author || "Unknown"}</span>
            </div>
            <div className="button-box">
              <IonButton onClick={tweetQuote} id="twitter" title="Tweet this!!">
                <IonIcon slot="icon-only" id="logo" icon={logoTwitter} />
              </IonButton>
              <IonButton onClick={changeQuote} id="new-quote">
                NEW QUOTE
              </IonButton>
            </div>
          </div>
          <div className="fab">
            <IonFab horizontal="end" slot="fixed">
              <IonFabButton>
                <IonIcon icon={share} />
              </IonFabButton>
              <IonFabList side="start">
                <IonFabButton
                  href="https://github.com/JamesDimonaco"
                  target="_blank"
                >
                  <IonIcon icon={logoGithub} />
                </IonFabButton>
                <IonFabButton
                  href="https://www.linkedin.com/in/james-dimonaco-436901160/"
                  target="_blank"
                >
                  <IonIcon icon={logoLinkedin} />
                </IonFabButton>
                <IonFabButton
                  href="https://www.buymeacoffee.com/JamesDimonaco"
                  target="_blank"
                >
                  <IonIcon icon={cafeSharp} />
                </IonFabButton>
              </IonFabList>
            </IonFab>
          </div>
          <RandomImage />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
