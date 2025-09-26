"use client";

import { AxiosProgressEvent } from "axios";
import { File, FileJson2Icon, Frown, UploadIcon, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProgressBar } from "@/components/ui/progress-bar";
import { motion, AnimatePresence } from "framer-motion";
import { useUpdateQnAList } from "@/adaptor/mutation/agent/useUpdateQnA";
import { jsonFileToObject } from "@/lib/file";
import { UpdateQnAForm } from "@/domain/agent.domain";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const FILE_ACCEPT_TYPES = {
  "application/json": [".json"],
};

interface FileUploadProgress {
  progress: number;
  File: File;
}

export default function FileInput({
  fetchQna,
  isQnaFetching,
}: {
  isQnaFetching: boolean;
  fetchQna: () => void;
}) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);

  const { updateQnAAsync } = useUpdateQnAList("Cross");

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    const progress = Math.round(
      (progressEvent.loaded / (progressEvent.total ?? 0)) * 100,
    );

    if (progress === 100) {
      setFilesToUpload([{ ...filesToUpload[0], progress: 100 }]);

      return;
    }

    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.map((item) => {
        return {
          ...item,
          progress,
        };
      });
    });
  };

  const removeFile = (file: File) => {
    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.filter((item) => item.File !== file);
    });

    setUploadedFiles((prevUploadedFiles) => {
      return prevUploadedFiles.filter((item) => item !== file);
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 1) {
      setFilesToUpload((prevUploadProgress) => {
        return [
          ...acceptedFiles.map((file) => {
            return {
              progress: 0,
              File: file,
              source: null,
            };
          }),
        ];
      });
    }
  }, []);

  const requestUpdateQnAList = async () => {
    if (filesToUpload.length > 0) {
      const toastId = toast.loading("Uploading Q&A");

      const form = await jsonFileToObject<UpdateQnAForm>(filesToUpload[0].File);

      try {
        await updateQnAAsync({
          items: form,
          onPostComplete: onUploadProgress,
        });
        toast.success("Successfully uploaded Q&A", { id: toastId });
        await fetchQna();
        setTimeout(() => {
          setFilesToUpload([]);
        }, 1000);
      } catch (uploadError) {
        toast.error("Failed to upload Q&A", { id: toastId });
      }
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: FILE_ACCEPT_TYPES,
    maxFiles: 1,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full flex-wrap gap-2">
        <div className="w-full desktop:w-[500px]">
          <Label
            {...getRootProps()}
            onClick={(event) => {
              event.preventDefault();
              getRootProps()?.onClick?.(event);
            }}
            className="relative flex h-[90px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:bg-gray-100"
          >
            <AnimatePresence mode="wait">
              {filesToUpload.length > 0 ? (
                <motion.div
                  key="files-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full space-y-2 transition-all duration-1000"
                >
                  <div className="space-y-2 pr-3">
                    {filesToUpload.map((fileUploadProgress) => {
                      return (
                        <div
                          key={fileUploadProgress.File.lastModified}
                          className="group flex justify-between gap-2 overflow-hidden rounded-lg pr-2 hover:pr-0"
                        >
                          <div className="flex flex-1 items-center">
                            <div className="text-white">
                              <FileJson2Icon className="size-10 text-blue-800" />
                            </div>

                            <div className="ml-2 w-full space-y-1">
                              <div className="flex justify-between text-sm">
                                <p className="text-muted-foreground">
                                  {fileUploadProgress.File.name.slice(0, 25)}
                                </p>
                                <span className="text-xs">
                                  {fileUploadProgress.progress}%
                                </span>
                              </div>
                              <ProgressBar
                                progress={fileUploadProgress.progress}
                                className="bg-blue-800 fill-blue-800 transition-[width] duration-300"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();

                              removeFile(fileUploadProgress.File);
                            }}
                            className="hidden cursor-pointer items-center justify-center bg-red-500 px-2 text-white transition-all group-hover:flex"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="upload-prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="mx-auto max-w-min">
                    <UploadIcon size={20} />
                  </div>

                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold">Drop a file</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Label>

          <Input
            {...getInputProps()}
            id="dropzone-file"
            accept="json,application/json"
            type="file"
            className="hidden"
          />
          {isDragReject && (
            <motion.div
              key="upload-reject"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mt-1 flex items-center gap-1">
                <div className="max-w-min">
                  <Frown size={20} className="text-[#f56565]" />
                </div>

                <p className="text-sm text-[#f56565]">
                  <span className="font-semibold">
                    Only single json file is allowed
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </div>
        <div className="flex h-full items-end">
          <Button
            onClick={requestUpdateQnAList}
            disabled={
              !!isDragActive ||
              !!isDragReject ||
              !!isQnaFetching ||
              filesToUpload.length === 0
            }
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
