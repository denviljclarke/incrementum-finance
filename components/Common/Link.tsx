import Link, { LinkProps as NextLinkProps } from "next/link";
import React, { ReactElement } from "react";

type LinkProps = NextLinkProps & {
  children: ReactElement;
};

function SmoothScrollTo({
  id,
  children,
  ...props
}: {
  id?: string;
  children: React.ReactNode;
  onClick?: (e: any) => void;
}) {
  function handleClick(ev: any) {
    // Disable the default anchor-clicking behavior
    // of scrolling to the element'
    ev.preventDefault();
    const target = document.querySelector(`${id}`);
    target?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <a
      href={`${id}`}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
        }
        handleClick(e);
      }}
    >
      {children}
    </a>
  );
}

const CustomLink: React.FC<LinkProps> = ({ children, href, ...props }) => {
  const internal = typeof href === "string" ? /^\/(?!\/)/.test(href) : true;
  const scrollTo = href.toString().includes("#") && href.toString().length > 1;

  if (scrollTo && typeof href === "string") {
    return (
      <SmoothScrollTo
        onClick={(e: any) => {
          if (props?.onClick) {
            props?.onClick(e);
          }
        }}
        id={href}
      >
        {children}
      </SmoothScrollTo>
    );
  }

  // Use Next Link for internal links, and <a> for others
  if (internal || typeof href !== "string") {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

export default CustomLink;
