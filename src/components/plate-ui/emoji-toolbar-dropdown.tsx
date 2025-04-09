"use client";

import React, { type ReactNode } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type EmojiToolbarDropdownProps = {
  children: ReactNode;
  control: ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export function EmojiToolbarDropdown({
  children,
  control,
  isOpen,
  setIsOpen,
}: EmojiToolbarDropdownProps) {
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{control}</PopoverTrigger>
      <PopoverContent className="z-[100]">{children}</PopoverContent>
    </Popover>
  );
}
