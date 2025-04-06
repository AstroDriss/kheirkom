"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { post } from "@/actions/post";
import { ImageIcon, Loader2, Plus, X } from "lucide-react";
import Image from "next/image";

// TODO: Show a Toast message on success or error
const PostButton = () => {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>();
  const [content, setContent] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    fileInputRef.current!.value = "";
  };

  const handleImageUpload = (files: FileList) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("image/")) return;

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e.dataTransfer.files);
    fileInputRef.current!.files = e.dataTransfer.files;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return alert("Please write something");
    setSubmitting(true);

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      const { error, success } = await post(formData);

      if (error) alert(error);

      if (success) {
        setOpen(false);
        setContent("");
        setPreviewUrl(null);
      }
    }
    setSubmitting(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus />
          Post
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Post</DialogTitle>
          <DialogDescription>Create a new Post</DialogDescription>
        </DialogHeader>

        {/* form */}
        <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
          <Textarea
            placeholder="Write your post..."
            aria-label="Post content"
            value={content}
            id="content"
            className="min-h-[100px] w-full"
            name="content"
            onChange={(e) => setContent(e.target.value)}
            required
          />

          {previewUrl ? (
            <div className="relative rounded-md overflow-hidden">
              <Image
                src={previewUrl || ""}
                alt="Preview"
                width={500}
                height={300}
                className="w-full h-auto max-h-[300px] object-contain bg-gray-100"
              />
              <Button
                variant="destructive"
                size="icon"
                type="button"
                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                onClick={handleRemoveImage}
                disabled={submitting}
              >
                <X className="h-4 w-4 cursor-pointer" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
          ) : (
            <label
              htmlFor="image"
              className={`border-2 block border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 hover:border-primary/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <ImageIcon className="h-10 w-10 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Drag and drop an image, or click to select
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, GIF up to 5MB
              </p>
            </label>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="sr-only"
            accept="image/*"
            onChange={handleFileChange}
            name="image"
            id="image"
            disabled={submitting}
          />

          <Button
            disabled={submitting}
            type="submit"
            className="cursor-pointer"
          >
            {submitting && <Loader2 className="animate-spin mr-2" />}
            {submitting ? "Posting..." : "Post"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostButton;
