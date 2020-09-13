import React, { useState } from "react";
import { IonItem, IonImg, useIonViewWillEnter } from "@ionic/react";
import axios from "axios";
import "./RandomImage.css";

const ApiKey = "qOgh24S7mYoumKG_Bn7kr042X_lUN5TcSrgBa2oXFCE";
const ApiUrl = `https://api.unsplash.com/photos/random/?client_id=${ApiKey}&count=20`;

let src: string;

export const RandomImage: React.FC = () => {
  let [random, setRandom] = useState(0);

  const getPhotos = async () => {
    const response = await axios.get(ApiUrl);
    src = response.data[random].urls.regular;
    if (!response.data) {
      console.log("error, likely request limit reached");
    }
  };
  const changePhoto = () => {
    setRandom(random + 1);
    if (random === 10) {
      console.log("reached limit");
      random = 0;
    }
  };

  useIonViewWillEnter(async () => {
    await getPhotos();
    changePhoto();
  });

  console.log(random);

  return (
    <IonItem onClick={changePhoto} button={true} className="image-box">
      <IonImg src={src} />
    </IonItem>
  );
};
