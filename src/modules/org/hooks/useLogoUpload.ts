import { useState } from "react";
import axios from "axios";

import { notifier } from "@/lib/notifications/notifier";

import {
  useConfirmLogoUpload,
  useGenerateLogoUploadUrl,
} from "./useOrganization";

export function useLogoUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const generateLogoUploadUrl = useGenerateLogoUploadUrl();
  const confirmLogoUpload = useConfirmLogoUpload();

  const upload = async (file: File) => {
    setIsUploading(true);

    try {
      const uploadRequest = await generateLogoUploadUrl.mutateAsync({
        filename: file.name,
        contentType: file.type,
      });

      await axios.put(uploadRequest.uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      await confirmLogoUpload.mutateAsync({
        objectKey: uploadRequest.objectKey,
      });

      notifier.success("Organization logo updated successfully.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to upload organization logo.";

      notifier.error(message);

      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadLogo: upload,
    isUploading,
  };
}
