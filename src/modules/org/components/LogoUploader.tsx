import { useRef, useState } from "react";

import { Button, Card } from "@/components/ui";
import { notifier } from "@/lib/notifications/notifier";

interface LogoUploaderProps {
  logoUrl?: string;
  uploading?: boolean;
  loading?: boolean;
  maxSizeMb?: number;
  onFileSelected: (file: File) => void;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg"];

export default function LogoUploader({
  logoUrl,
  uploading = false,
  loading = false,
  maxSizeMb = 2,
  onFileSelected,
}: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState(false);

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!ACCEPTED_TYPES.includes(file.type)) {
      notifier.error("Only PNG and JPEG images are supported.");
      event.target.value = "";
      return;
    }

    if (file.size > maxSizeMb * 1024 * 1024) {
      notifier.error(`Maximum file size is ${maxSizeMb} MB.`);
      event.target.value = "";
      return;
    }

    setImageError(false);

    onFileSelected(file);

    // Allow selecting the same file again.
    event.target.value = "";
  };

  const showImage = !!logoUrl && !imageError;

  return (
    <Card className="flex flex-col items-center gap-4 p-6">
      <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50">
        {loading ? (
          <div className="h-full w-full animate-pulse bg-slate-200" />
        ) : showImage ? (
          <img
            src={logoUrl}
            alt="Organization logo"
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-center">
            <span className="text-sm font-medium text-slate-500">No Logo</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept={ACCEPTED_TYPES.join(",")}
        onChange={handleFileChange}
      />

      <Button
        type="button"
        onClick={handleChooseFile}
        disabled={uploading || loading}
      >
        {uploading ? "Uploading..." : "Upload Logo"}
      </Button>

      <p className="text-center text-xs text-slate-500">
        PNG or JPEG • Maximum {maxSizeMb} MB
      </p>
    </Card>
  );
}
