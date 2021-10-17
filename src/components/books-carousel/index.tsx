import React from "react";
import { Carousel, Button } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import styles from "./index.module.sass";

type Props = {
  children: any;
};

export const BooksCarousel: React.FC<Props> = (props: Props) => {
  return (
    <Carousel arrows {...settings} className={styles.carousel} dots>
      {props.children}
    </Carousel>
  );
};

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Button
      className={`${className} ${styles.arrow}`}
      shape="round"
      style={style}
      onClick={onClick}
      icon={<RightOutlined />}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Button
      className={`${className} ${styles.arrow}`}
      shape="round"
      style={style}
      onClick={onClick}
      icon={<LeftOutlined />}
    />
  );
}
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  slidesToShow: 6,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
