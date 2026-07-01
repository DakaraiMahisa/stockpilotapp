import { Button, Card } from "@/components/ui";
import { notifier } from "@/lib/notifications/notifier";
import { useRef } from "react";

interface LogoUploaderProps {
  logoUrl?: string | null;
  uploading?: boolean;
  maxSizeMb?: number;
  onFileSelected: (file: File) => void;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg"];

export function LogoUploader({
  logoUrl,
  uploading = false,
  maxSizeMb = 2,
  onFileSelected,
}: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

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

    onFileSelected(file);

    // Allow selecting the same file again later.
    event.target.value = "";
  };

  return (
    <Card className="flex flex-col items-center gap-4 p-6">
      <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border bg-gray-50">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="Organization logo"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm text-gray-500">No Logo</span>
        )}
      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleFileChange}
      />

      <Button type="button" onClick={handleChooseFile} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Logo"}
      </Button>

      <p className="text-center text-xs text-gray-500">
        PNG or JPEG • Maximum {maxSizeMb} MB
      </p>
    </Card>
  );
}
