import React from 'react';
import NextLink from 'next/link';

export default function Link({ href, children, className, id, ...props }) {
  return (
    <NextLink
      id={id}
      href={href}
      className={className}
      {...props}
    >
      {children}
    </NextLink>
  );
}

