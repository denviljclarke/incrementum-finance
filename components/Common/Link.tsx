import {
  Link as ReactRouterLink,
  LinkProps as ReactRouterLinkProps
} from 'react-router-dom';
import React from 'react';

type LinkProps = ReactRouterLinkProps;

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
      behavior: 'smooth'
    });
  }

  return (
    <a
      href={`${id}`}
      onClick={e => {
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

const Link: React.FC<LinkProps> = ({ children, to, ...props }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for React)
  // will start with exactly one slash, and that anything else is external.
  const internal = typeof to === 'string' ? /^\/(?!\/)/.test(to) : true;
  const scrollTo = to.toString().includes('#') && to.toString().length > 1;

  if (scrollTo && typeof to === 'string') {
    return (
      <SmoothScrollTo
        onClick={(e: any) => {
          if (props?.onClick) {
            props?.onClick(e);
          }
        }}
        id={to}
      >
        {children}
      </SmoothScrollTo>
    );
  }

  // Use React Router Link for internal links, and <a> for others
  if (internal || typeof to !== 'string') {
    return (
      <ReactRouterLink to={to} {...props}>
        {children}
      </ReactRouterLink>
    );
  }

  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
};

export default Link;
