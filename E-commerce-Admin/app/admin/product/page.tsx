"use client"

import AddProduct from "@/components/products/addproduct"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react"
import EditProduct from "@/components/products/editproduct"
import { useState } from "react"

import { Switch } from "@/components/ui/switch"
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "@/lib/product"

export default function Product() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const { data, isLoading, error } = useQuery({
    queryKey: ["getallproduct", page, search],
    queryFn: () => getProducts(page, 10, search, ""),
  })

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1) // Reset to page 1 when searching
  }

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1)
  }

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  const products = data?.data || []
  const totalPages = data?.pagination?.totalPages || 1

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handelEdit = (product: any) => {
    setSelectedProduct(product)
    setIsEditOpen(true)
  }

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        {/* Left: Search */}
        <div className="flex w-full max-w-md items-center gap-2">
          <Field orientation="horizontal">
            <Input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Button onClick={() => handleSearch(search)}>Search</Button>
          </Field>
        </div>

        {/* Right: Add Button */}
        <div className="flex justify-end">
          <AddProduct />
        </div>
      </div>

      {/* Table */}
      <div className="w-100vh flex-1 overflow-hidden rounded-xl border bg-background">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center p-8">
            <p className="text-red-500">Error loading products</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center p-8">
            <p>No products found</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader className="bg-primary-foreground">
                <TableRow>
                  <TableHead className="w-12">Sr No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>MRP</TableHead>
                  <TableHead>About</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Added At</TableHead>
                  <TableHead>Live</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {products.map((product: any, sr: number) => (
                  <TableRow key={product.id}>
                    <TableCell className="items-center justify-center">
                      {(page - 1) * 10 + sr + 1}
                    </TableCell>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>
                      {product.mainImage?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.mainImage.url}
                          alt={product.productName}
                          className="h-12 w-12 rounded object-cover"
                        />
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell className="max-w-50 truncate">
                      {product.about || "N/A"}
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      {new Date(product.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Switch checked={product.isLive} />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <IconDotsVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <IconEdit size={16} />
                            <Button
                              variant="secondary"
                              onClick={() => handelEdit(product)}
                              className="w-full items-center justify-center"
                            >
                              Edit
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <IconTrash size={16} />
                            <Button variant="ghost" className=" ">
                              Delete
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Pagination */}
            <div className="flex items-center justify-between border-t bg-background p-4">
              <div>
                <p className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNextPage}
                  disabled={page >= totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      {isEditOpen && selectedProduct && (
        <EditProduct
          product={selectedProduct}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </div>
  )
}
