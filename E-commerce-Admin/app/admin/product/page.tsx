
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
const products = [
  {
    id: 1,
    name: "Product 1",
    image: "img1.jpg",
    category: "Electronics",
    mrp: "$250.00",
    about: "High quality product",
    stock: 10,
    addedAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Product 2",
    image: "img2.jpg",
    category: "Clothing",
    mrp: "$150.00",
    about: "Premium fabric",
    stock: 25,
    addedAt: "2024-01-16",
  },
  {
    id: 3,
    name: "Product 3",
    image: "img3.jpg",
    category: "Home",
    mrp: "$350.00",
    about: "Durable and stylish",
    stock: 5,
    addedAt: "2024-01-17",
  },
  {
    id: 4,
    name: "Product 4",
    image: "img4.jpg",
    category: "Electronics",
    mrp: "$450.00",
    about: "Latest model",
    stock: 15,
    addedAt: "2024-01-18",
  },
  {
    id: 5,
    name: "Product 5",
    image: "img5.jpg",
    category: "Books",
    mrp: "$55.00",
    about: "Best seller",
    stock: 50,
    addedAt: "2024-01-19",
  },
  {
    id: 6,
    name: "Product 5",
    image: "img5.jpg",
    category: "Books",
    mrp: "$55.00",
    about: "Best seller",
    stock: 50,
    addedAt: "2024-01-19",
  },
  {
    id: 7,
    name: "Product 5",
    image: "img5.jpg",
    category: "Books",
    mrp: "$55.00",
    about: "Best seller",
    stock: 50,
    addedAt: "2024-01-19",
  },
  {
    id: 8,
    name: "Product 5",
    image: "img5.jpg",
    category: "Books",
    mrp: "$55.00",
    about: "Best seller",
    stock: 50,
    addedAt: "2024-01-19",
  },
]

export default function Product() {
    const[selectedProduct, setSelectedProduct] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false)

    const handelEdit = (product) =>{
        setSelectedProduct(product);
        setIsEditOpen(true);
    }

  return (
    <div className="flex flex-col w-full  p-6 gap-6">
     
  {/* Header */}
  <div className="flex items-center justify-between w-full">

    {/* Left: Search */}
    <div className="flex items-center gap-2 w-full max-w-md">
      <Field orientation="horizontal">
      <Input type="search" placeholder="Search..." />
      <Button>Search</Button>
    </Field>
     
    </div>

    {/* Right: Add Button */}
    <div className="flex justify-end ">
      <AddProduct />
      
    </div>


  </div>

  {/* Table */}
  <div className="flex-1 w-100vh border rounded-xl overflow-hidden bg-background">
    <Table >
      <TableHeader className="bg-primary-foreground" >
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
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.image}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.mrp}</TableCell>
            <TableCell className="max-w-[200px] truncate">
              {product.about}
            </TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{product.addedAt}</TableCell>
            <TableCell><Switch/>

            
            </TableCell>
            <TableCell>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="sm">
        <IconDotsVertical size={16} />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem 
        
        className="flex items-center gap-2"
      >
        <IconEdit size={16} />
        <Button variant="secondary" onClick={()=> handelEdit(product)} className=" w-full items-center justify-center">Edit</Button>
      </DropdownMenuItem>
      <DropdownMenuItem 
   
        className="flex items-center gap-2 text-red-600"
      >
        <IconTrash size={16} />
        <Button variant="ghost" className=" ">Delete</Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  {isEditOpen && selectedProduct && (
    <EditProduct
    product={selectedProduct}
    onClose={()=>setIsEditOpen(false)}/>
  )}

</div>
  )
}
