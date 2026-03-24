"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

import { Controller, useForm } from "react-hook-form"
import { useState } from "react"
import {z} from "zod";

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addOrEditProduct } from "@/lib/product"
import { toast } from "sonner"
export const formSchema = z.object({
   id: z.string().optional(),
  productName: z.string().min(10).max(255),
  price: z.number().positive("Price must be greater than 0"),
  about: z.string().min(10).max(255).trim().optional(),
  mainImage: z.any().optional(),
  productImages: z.any().optional(),
  stock: z.number().min(0),
  category: z.enum([
    "Electronics",
    "Clothing",
    "Toys",
    "HomeDecor",
    "Kitchen",
    "Bathroom",
    "Stationery",
    "Food",
  ]),
} as any)


export default function AddProduct() {
  const form = useForm<z.infer<typeof formSchema>>({
         resolver:zodResolver(formSchema),
         defaultValues:{
          productName:"",
          stock: 0,
          price: 0,
          about:"",
          category:"Electronics",

         },
    

  })
const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: ({ data, mainFile, galleryFiles }: {data: z.infer<typeof formSchema>, mainFile: File | null, galleryFiles: File[]}) => {
      console.log("Submitting with:", { data, mainFile, galleryFiles });
      if (!mainFile) {
        throw new Error("Main image file is missing");
      }
      return addOrEditProduct(data, mainFile, galleryFiles);
    },

    onSuccess:(res)=>{
      // Update the cache with new product - add to first page
      queryClient.setQueryData(
        ["getallproduct", 1, ""],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: [res.data, ...oldData.data],
            pagination: {
              ...oldData.pagination,
              total: String(Number(oldData.pagination.total) + 1),
            },
          };
        }
      );
      console.log("Success",res);
      toast.success("Product added successfully");
      form.reset();
      setMainFile(null);
      setGalleryFiles([]);
      setMainFileError("");
    },
    onError:(err)=>{
      console.error("Error:", err);
      toast.error("Unable to add product");
    }
  })
  const [mainFile, setMainFile] = useState<File | null>(null);
const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const [mainFileError, setMainFileError] = useState<string>("");

  const onSubmit = (data: z.infer<typeof formSchema>)=>{
    if (!mainFile) {
      setMainFileError("Main image is required");
      return;
    }
    setMainFileError("");
    mutate({
      data,mainFile,galleryFiles,
    })
  }

  return (
    <Sheet>
      <div className="space-x-4">
        <SheetTrigger asChild>
          <Button variant="outline" className="">
            Add Product
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Product</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-x-auto">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-3">
            <Controller
              name="productName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Product Name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Name"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field data-invalid={!!mainFileError}>
              <FieldLabel>Main Product Image <span className="text-red-500">*</span></FieldLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setMainFile(file);
                    setMainFileError("");
                  }
                }}
              />
              {mainFile && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {mainFile.name}
                </p>
              )}
              {mainFileError && (
                <p className="text-sm text-red-500 mt-2">{mainFileError}</p>
              )}
            </Field>
             <Field>
              <FieldLabel>Gallery Images (Maximum 5)</FieldLabel>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []).slice(0, 5);
                  setGalleryFiles(files);
                }}
              />
            
            </Field>
              {galleryFiles.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">
                    Selected: {galleryFiles.length} image{galleryFiles.length !== 1 ? "s" : ""}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {galleryFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <span className="text-sm truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setGalleryFiles(
                              galleryFiles.filter((_, i) => i !== idx)
                            );
                          }}
                          className="text-red-500 text-sm hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                  <select
                    {...field}
                    id={field.name}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Toys">Toys</option>
                    <option value="HomeDecor">Home Decor</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Stationery">Stationery</option>
                    <option value="Food">Food</option>
                  </select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="number"
                    step="0.01"
                    placeholder="Enter price"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="about"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>About</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter product description"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="stock"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Stock</FieldLabel>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="number"
                    placeholder="Enter stock quantity"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
           
          </div>
          </form>
        </div>
        <SheetFooter>
          <Button 
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add Product"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
