"use client";

import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ArticleApi } from "@/api/article";
import PlateEditor from "@/components/editor/plate-editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { AddArticleBody } from "@/lib/validations/article-schemas";
import { ArticleCategory } from "@/types";

function AddArticleForm() {
  const form = useForm<AddArticleBody>();
  const onSubmit = async (data: AddArticleBody) => {
    try {
      await ArticleApi.create(data);
      toast.success("Article created successfully!");
    } catch (error) {
      console.error("🚀 ~ onSubmit: ~ error:", error);
      toast("Error creating article!", {});
    }
  };

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<ArticleCategory[]> => {
      try {
        const res = await ArticleApi.categories({ limit: 9999 });
        return res.data;
      } catch (error) {
        console.error("🚀 ~ queryFn: ~ error:", error);
        throw new Error("Failed to fetch categories");
      }
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Aa" rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <div
                // onClick={(e) => {
                //   e.stopPropagation();
                //   e.preventDefault();
                // }}
                >
                  <ImageUpload
                    onUploadComplete={(value) => field.onChange(value._id)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <MultiSelect
                    options={
                      categories.data
                        ? categories.data.map((category) => ({
                            label: category.name,
                            value: category._id,
                          }))
                        : []
                    }
                    value={field.value}
                    onValueChange={(e) => field.onChange(e)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <div
                  className=""
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <PlateEditor onChange={field.onChange} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create
        </Button>
      </form>
    </Form>
  );
}

export default AddArticleForm;
