import { cn } from '@udecode/cn';
import type { SlateLeafProps } from '@udecode/plate';
import { SlateLeaf } from '@udecode/plate';
import React from 'react';

export function CodeSyntaxLeafStatic({
  children,
  className,
  ...props
}: SlateLeafProps) {
  const tokenClassName = props.leaf.className as string;

  return (
    <SlateLeaf className={cn(tokenClassName, className)} {...props}>
      {children}
    </SlateLeaf>
  );
}
