import React, { useState } from "react";
import { IonItem, IonImg, IonButton, useIonViewWillEnter } from "@ionic/react";
import axios from "axios";
import "./RandomImage.css";

const ApiKey = "qOgh24S7mYoumKG_Bn7kr042X_lUN5TcSrgBa2oXFCE";
const ApiUrl = `https://api.unsplash.com/photos/random/?client_id=${ApiKey}&count=30&orientation=landscape`;
let imgArry: string[] = [];
let num: number = 0;
export const RandomImage: React.FC = () => {
  const [imgHidden, setImgHidden] = useState(true);
  const [btnHidden, setBtnHidden] = useState(false);
  let [imgSrc, setImgSrc] = useState("");

  let random: number;
  let dataSrc: string;

  const getPhotos = async () => {
    const response = await axios.get(ApiUrl);
    for (random = 0; random < 30; random++) {
      dataSrc = response.data[random].urls.small;
      imgArry.push(dataSrc);
    }
  };

  const changePhoto = () => {
    setImgSrc(imgArry[++num]);
    console.log(num);
    if (num >= 29) {
      num = 0;
      getPhotos();
    }
  };

  const btnChange = () => {
    setImgSrc(imgArry[num]);
    console.log(imgArry);
    setBtnHidden(true);
    setImgHidden(false);
  };

  useIonViewWillEnter(() => {
    console.log("ionViewWillEnter event fired");
    getPhotos();
  });

  return (
    <div className="image-box">
      <IonButton hidden={btnHidden} onClick={btnChange}>
        Show image
      </IonButton>
      <IonItem hidden={imgHidden} onClick={changePhoto} button={true}>
        <IonImg src={imgSrc} />
      </IonItem>
    </div>
  );
};
