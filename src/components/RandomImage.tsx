import React, { useState } from "react";
import { IonItem, IonImg, useIonViewDidEnter } from "@ionic/react";
import axios from "axios";

import "./RandomImage.css";

const ApiKey = "qOgh24S7mYoumKG_Bn7kr042X_lUN5TcSrgBa2oXFCE";
const ApiUrl = `https://api.unsplash.com/photos/random/?client_id=${ApiKey}&count=20`;

let photoList: any[];

export const RandomImage: React.FC = () => {
  const [img, setImg] = useState({
    src: "",
    alt_description: "",
  });

  const getPhotos = async () => {
    const response = await axios.get(ApiUrl);
    photoList = await response.data;
    if (!response.data) {
      console.log("error, likely request limit reached");
    }
  };

  const changePhoto = () => {
    setImg(photoList[Math.floor(Math.random() * photoList.length)]);
  };

  useIonViewDidEnter(async () => {
    await getPhotos();
    changePhoto();
  });

  console.log(photoList);

  return (
    <IonItem onClick={changePhoto} button={true} className="image-box">
      <IonImg src={img.src} alt={img.alt_description} />
    </IonItem>
  );
};
