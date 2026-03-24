"use client"

const BASE_URL = process.env.NEXT_PUBLIC_API_PRODUCT_URL


export const addOrEditProduct = async (
  data: any,
  mainFile?: File,
  galleryFiles?: File[]
): Promise<any> => {

  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  // Backend expects "mainImage" not "mainFile"
  if (mainFile) formData.append("mainImage", mainFile);

  // Backend expects "productImages" not "galleryFiles"
  if (galleryFiles) {
    galleryFiles.forEach((file) => {
      formData.append("productImages", file);
    });
  }

  const res = await fetch(`${BASE_URL}/createorupdate`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Something went wrong");
  }

  return res.json();
};


export const getProducts= async(page:number=1,limit:number=10,search:string="",category:string="")=>{
    const params = new URLSearchParams();

    params.append("page",String(page));
    params.append("limit",String(limit));

    if(search) params.append("search",search);
    if(category)params.append("category",category);

    const res = await fetch(`${BASE_URL}/getallproduct?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();

}


