"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { post } from "@/actions/post";

const PostButton = () => {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>();
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <DialogTrigger className="cursor-pointer px-4 border rounded-md py-2">
        Post
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish a Post</DialogTitle>
        </DialogHeader>

        {/* form */}
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="content">Content</Label>
            <Textarea
              placeholder="Write your post..."
              value={content}
              id="content"
              name="content"
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <Input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleFileChange}
          />

          {previewUrl && <img src={previewUrl} alt="Preview" width={200} />}

          <Button className="mt-4" disabled={submitting} type="submit">
            post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostButton;
