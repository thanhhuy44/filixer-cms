/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dropzone, { DropzoneProps } from "shadcn-dropzone";

import { cn } from "@/lib/utils";

import { Button } from "./button";

interface Props extends DropzoneProps {
  value?: File;
}

function ImageDropzone({ value, ...props }: Props) {
  const [image, setImage] = useState<File | undefined>(value);

  useEffect(() => {
    setImage(value);
  }, [value]);

  return (
    <div className="relative">
      <Dropzone
        dropZoneClassName={cn(
          "border-solid rounded-md border aspect-video",
          props.dropZoneClassName
        )}
        multiple={false}
        onDropAccepted={(files, e) => {
          if (props?.onDropAccepted) {
            props.onDropAccepted(files, e);
          }
        }}
        onDropRejected={(files) => {
          console.log("🚀 ~ ImageDropzone ~ files:", files);
        }}
        {...props}
        showFilesList={false}
      />
      {!!image ? (
        <>
          <Image
            src={URL.createObjectURL(image)}
            alt=""
            width={1000}
            height={1000}
            className="absolute inset-0 size-full rounded-md border object-cover object-center"
          />
          <Button
            type="button"
            onClick={(e) => {
              setImage(undefined);
              if (props?.onDropAccepted) {
                props.onDropAccepted([], e as any);
              }
            }}
            variant="destructive"
            className="absolute right-3 top-3 size-8"
            size="icon"
          >
            <Trash />
          </Button>
        </>
      ) : null}
    </div>
  );
}

export default ImageDropzone;
