import React, { useState } from "react";
import { IonItem, IonImg } from "@ionic/react";
import axios from "axios";
import "./RandomImage.css";

const ApiKey = "qOgh24S7mYoumKG_Bn7kr042X_lUN5TcSrgBa2oXFCE";
const ApiUrl = `https://api.unsplash.com/photos/random/?client_id=${ApiKey}&count=20`;

export const RandomImage: React.FC = () => {
  let imgArry: string[] = [];
  let random: number;
  let dataSrc: string;
  let num: number = 0;

  const getPhotos = async () => {
    const response = await axios.get(ApiUrl);
    for (random = 0; random < 10; random++) {
      dataSrc = response.data[random].urls.regular;
      imgArry.push(dataSrc);
    }
  };

  let [imgSrc, setImgSrc] = useState(
    "https://cdn.discordapp.com/attachments/729993223929593866/729996453979619330/unknown.png"
  );

  const changePhoto = () => {
    num = num + 1;
    setImgSrc(imgArry[num]);
  };

  getPhotos();

  return (
    <IonItem onClick={changePhoto} button={true} className="image-box">
      <IonImg src={imgSrc} />
    </IonItem>
  );
};
