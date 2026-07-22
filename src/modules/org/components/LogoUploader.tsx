import { useRef, useState } from "react";

import { Button, Card } from "@/components/ui";
import { Skeleton } from "@/components/feedback";
import { notifier } from "@/lib/notifications/notifier";

interface LogoUploaderProps {
  logoUrl?: string;
  uploading?: boolean;
  loading?: boolean;
  maxSizeMb?: number;
  disabled?: boolean;
  onFileSelected: (file: File) => void;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg"];

export default function LogoUploader({
  logoUrl,
  uploading = false,
  loading = false,
  maxSizeMb = 2,
  disabled = false,
  onFileSelected,
}: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState(false);

  const handleChooseFile = () => {
    if (disabled) {
      return;
    }
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      event.target.value = "";
      return;
    }
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
      <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border border-border 	bg-surface">
        {loading ? (
          <Skeleton className="h-full w-full rounded-full" />
        ) : showImage ? (
          <img
            src={logoUrl}
            alt="Organization logo"
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-raised text-center">
            <span className="text-sm font-medium 	text-text-secondary">
              No Logo
            </span>
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
        disabled={disabled || uploading || loading}
      >
        {uploading ? "Uploading..." : disabled ? "Logo Locked" : "Upload Logo"}
      </Button>

      <p className="text-center text-xs 	text-text-secondary">
        PNG or JPEG • Maximum {maxSizeMb} MB
      </p>
    </Card>
  );
}
