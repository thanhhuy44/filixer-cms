"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  ArticleCollectionBody,
  ArticleCollectionSchema,
} from "@/lib/validations/article-schemas";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import ImageDropzone from "../ui/image-dropzone";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ArticlePicker from "./article-picker";

function AddCollection() {
  const form = useForm<ArticleCollectionBody>({
    resolver: zodResolver(ArticleCollectionSchema),
  });
  const control = form.control;

  const onSubmit = (data: ArticleCollectionBody) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add collection</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Collection name..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Aa..." rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="thumbnailFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <ImageDropzone
                        value={field.value}
                        onDropAccepted={(files) => {
                          field.onChange(files[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="thumbnailFile"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Articles</FormLabel>
                    <FormControl>
                      <ArticlePicker />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddCollection;
