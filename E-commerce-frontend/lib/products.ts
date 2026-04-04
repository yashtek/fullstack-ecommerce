"use client"

const BASE_URL = process.env.NEXT_PUBLIC_API_PRODUCT_URL
export const getProducts = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  category: string = ""
) => {
  const params = new URLSearchParams()

  params.append("page", String(page))
  params.append("limit", String(limit))

  if (search) params.append("search", search)

  const res = await fetch(`${BASE_URL}/getallproduct?${params.toString()}`)

  if (!res.ok) throw new Error("Failed to fetch products")

  return res.json()
}

export const getProductbyId = async (id: string) => {
  const res = await fetch(`${BASE_URL}/get/${id}`)
  if (!res.ok) throw new Error("Failed to fetch product")
  return res.json()
}




