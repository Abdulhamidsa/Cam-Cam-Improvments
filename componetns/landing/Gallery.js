﻿"use client";
import { useRef, useEffect, useState } from "react";
import styles from "../../styles/FrontPage.module.scss";
import Image from "next/image";
import { AiOutlineInstagram } from "react-icons/ai";
const data = [
  { id: 1, src: "/insp.jpg", width: 120, height: 200, left: 0, top: 0 },
  { id: 2, src: "/DSCF3111.jpg", width: 80, height: 98, left: 125, top: 0 },
  { id: 3, src: "/DSCF3306.jpg", width: 80, height: 98, left: 125, top: 102 },
  { id: 4, src: "/DSCF3372.jpg", width: 120, height: 200, left: 210, top: 0 },
  { id: 5, src: "/DSCF3411.jpg", width: 120, height: 200, left: 335, top: 0 },
  { id: 6, src: "/DSCF3474.jpg", width: 80, height: 98, left: 460, top: 0 },
  { id: 7, src: "/DSCF3502.jpg", width: 80, height: 98, left: 460, top: 102 },
  { id: 8, src: "/DSCF3502.jpg", width: 120, height: 200, left: 545, top: 0 },

  { id: 9, src: "/IMG_2913.jpg", width: 160, height: 150, left: 0, top: 204 },
  { id: 10, src: "/IMG_3042.jpg", width: 90, height: 150, left: 165, top: 204 },
  { id: 11, src: "/DSCF3474.jpg", width: 155, height: 150, left: 260, top: 204 },
  { id: 12, src: "/IMG_2990.jpg", width: 155, height: 150, left: 422, top: 204 },
  { id: 13, src: "/insp.jpg", width: 90, height: 150, left: 580, top: 204 },
];
export default function Gallery() {
  const [windowWidth, setWindowWidth] = useState(0);

  const galleryRef = useRef(null);

  useEffect(() => {
    const galleryContainer = galleryRef.current;
    const galleryWidth = galleryContainer.scrollWidth;
    const containerWidth = galleryContainer.clientWidth;

    let scrollPosition = 0;
    let animationId;

    const scrollGallery = () => {
      scrollPosition += 0.2;

      if (scrollPosition >= galleryWidth) {
        scrollPosition = 1;
      }

      galleryContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scrollGallery);
    };

    const startScrolling = () => {
      animationId = requestAnimationFrame(scrollGallery);
    };

    const stopScrolling = () => {
      cancelAnimationFrame(animationId);
    };

    startScrolling();

    galleryContainer.addEventListener("mouseenter", stopScrolling);
    galleryContainer.addEventListener("mouseleave", startScrolling);

    return () => {
      stopScrolling();
      galleryContainer.removeEventListener("mouseenter", stopScrolling);
      galleryContainer.removeEventListener("mouseleave", startScrolling);
    };
  }, []);

  let adjustedWidth;
  let adjustedLeft;
  let adjustedTop;
  let adjustedHeight;
  if (windowWidth >= 1024) {
    adjustedWidth = data.map((image) => image.width * 2);
    adjustedLeft = data.map((image) => image.left * 1.94);
    adjustedTop = data.map((image) => image.top * 1.58);
    adjustedHeight = data.map((image) => image.height * 1.6);
  } else if (windowWidth >= 450) {
    adjustedWidth = data.map((image) => image.width * 1.6);
    adjustedLeft = data.map((image) => image.left * 1.57);
    adjustedTop = data.map((image) => image.top * 1.3);
    adjustedHeight = data.map((image) => image.height * 1.3);
  } else {
    adjustedWidth = data.map((image) => image.width * 1.1);
    adjustedLeft = data.map((image) => image.left * 1.1);
    adjustedTop = data.map((image) => image.top * 1);
    adjustedHeight = data.map((image) => image.height * 1);
  }
  return (
    <>
      <div className={styles.heading}>
        <h2 className={styles.heading}>
          SHARE WITH US
          <AiOutlineInstagram />
        </h2>
      </div>
      <div className={styles.gallery} ref={galleryRef}>
        {data.map((image, index) => (
          <div
            key={image.id}
            className={styles.imgContainer}
            style={{
              width: `${adjustedWidth[index]}px`,
              height: `${adjustedHeight[index]}px`,
              left: `${adjustedLeft[index]}px`,
              top: `${adjustedTop[index]}px`,
            }}
          >
            <Image width={400} height={400} src={image.src} alt={`Image ${image.id}`} />
          </div>
        ))}
      </div>
    </>
  );
}