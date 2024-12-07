import React from "react";
interface HeadingProps extends React.HtmlHTMLAttributes<HTMLHeadingElement> {
  title: string;
  desc: string;
}
const Heading = ({ title, desc }: HeadingProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  );
};

export default Heading;
