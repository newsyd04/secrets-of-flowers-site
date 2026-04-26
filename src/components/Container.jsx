import React from "react";

export default function Container({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`mx-auto w-full max-w-page px-6 lg:px-8 ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
