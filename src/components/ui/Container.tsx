import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as: Component = 'div'
}) => {
  return (
    <Component
      className={`w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 mx-auto ${className}`}
    >
      {children}
    </Component>
  );
};


export default Container;