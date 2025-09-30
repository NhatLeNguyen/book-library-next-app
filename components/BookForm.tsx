"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useBookStore } from "@store/bookStore";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { DialogHeader } from "@components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Book } from "@app-types/bookStore.types";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  year: z.number().int().min(1900).max(new Date().getFullYear()),
});

type Props = {
  bookToEdit?: Book | null;
  onClose: () => void;
};

export default function BookForm({ bookToEdit, onClose }: Props) {
  const [open, setOpen] = useState(!!bookToEdit);
  const { addBook, updateBook } = useBookStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: bookToEdit?.title || "",
      author: bookToEdit?.author || "",
      year: bookToEdit?.year || 2023,
    },
  });

  useEffect(() => {
    setOpen(!!bookToEdit);
  }, [bookToEdit]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (bookToEdit) {
      await axios.put(`/api/books/${bookToEdit.id}`, values);
      updateBook(bookToEdit.id, { ...bookToEdit, ...values });
    } else {
      const res = await axios.post("/api/books", values);
      addBook(res.data);
    }
    setOpen(false);
    onClose();
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{bookToEdit ? "Edit" : "Add New Book"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{bookToEdit ? "Edit Book" : "Add Book"}</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
