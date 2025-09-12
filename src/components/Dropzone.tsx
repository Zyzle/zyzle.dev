import { useRef, useState } from "react";
import { FileUpload } from "@skeletonlabs/skeleton-react";
import {
  ImagePlus as IconDropzone,
  Paperclip as IconFile,
  XCircle as IconRemove,
} from "lucide-react";

export type DropzoneProps = {
  droppedFile: (ibm: ImageBitmap) => void;
};

export function Dropzone(props: DropzoneProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgVisible, setImgVisible] = useState<boolean>(false);

  const previewImage = (event: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = e.target?.result;
      if (imgRef.current && image) {
        setImgVisible(true);
        imgRef.current.src = image as string;
      }
      if (props.droppedFile && event.acceptedFiles && event.acceptedFiles[0]) {
        createImageBitmap(event.acceptedFiles[0]).then((ibm) => {
          props.droppedFile(ibm);
        });
      }
    };
    if (event.acceptedFiles && event.acceptedFiles[0]) {
      reader.readAsDataURL(event.acceptedFiles[0]);
    } else {
      setImgVisible(false);
    }
  };

  return (
    <>
      <FileUpload
        name="example"
        accept="image/*"
        maxFiles={1}
        subtext="Drop an image to analyze."
        iconInterface={<IconDropzone className="size-8" />}
        iconFile={<IconFile className="size-4" />}
        iconFileRemove={<IconRemove className="size-4" />}
        onFileChange={previewImage}
        onFileReject={console.error}
        classes="w-full"
      />
      <span className="not-prose">
        <img
          ref={imgRef}
          id="image-display"
          alt="dropped image"
          className="h-auto w-1/2 mx-auto my-5"
          hidden={!imgVisible}
        />
      </span>
    </>
  );
}
