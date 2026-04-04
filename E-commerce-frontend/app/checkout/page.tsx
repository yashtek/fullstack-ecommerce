"use client"
import { useState,useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getProductbyId } from "@/lib/products"

import { toast } from "sonner"



const Checkout = () => {
 const searchParams = useSearchParams();
  const id = searchParams.get("productId");
  const qty = Number(searchParams.get("qty"));

  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setform] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);


  const { data, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductbyId(id as string),
    enabled: !!id,
  });

  const product = data?.data;
  const totalprice = product
    ? (Number(product.price) * qty).toFixed(2)
    : "0.00";

 
  const validate = () => {
    if (!form.name || !form.address || !form.city) return false;
    if (form.pincode.length !== 6) return false;
    if (!form.phone) return false;
    return true;
  };


  const verifyMutation = useMutation({
    mutationFn: async (response: any) => {
      await fetch("http://localhost:8000/product/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      }),
      });
    },
    onSuccess: () => {
      setOrderPlaced(true);
    },
  });

  
  const openRazorpay = (data: any) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount:data.amount,
      currency: data.currency,
      order_id: data.razorpayOrderId,

      handler: function (response: any) {
        console.log("FULL RESPONSE:", response);
        verifyMutation.mutate(response);
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };


  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:8000/product/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          quantity: qty,
          address: form.address,
          city: form.city,
          pincode: Number(form.pincode),
          name: form.name,
          phone: form.phone,
        }),
      });

      return res.json();
    },
    onSuccess: (data) => {
      openRazorpay(data);
    },
  });
  
  if (isError || !product) return <p>Error loading product</p>;

  if (orderPlaced) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20 text-center">
        <CheckCircle size={64} className="mx-auto mb-6 text-primary" />
        <h1 className="font-display text-3xl font-bold">Order Placed!</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you for your purchase. You'll receive a confirmation email
          shortly.
        </p>
        <Link href="/">
          <Button className="mt-8 rounded-full px-8">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  //   if (items.length === 0) {
  //     return (
  //       <div className="container mx-auto px-4 py-20 text-center">
  //         <p className="text-muted-foreground">Your bag is empty</p>
  //         <Link href="/" className="text-primary hover:underline mt-4 inline-block">Back to shop</Link>
  //       </div>
  //     );
  //   }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} /> Continue Shopping
      </Link>

      <h1 className="font-display mb-10 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-10 md:grid-cols-5">
        {/* Form */}
        <div className="space-y-8 md:col-span-3">
          <div>
            <h2 className="font-display mb-4 text-lg font-semibold">
              Shipping Address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="firstName">Full Name</Label>
                <Input id="name" value={form.name} onChange={(e)=>setform({...form,name:e.target.value})} placeholder="John doe" className="mt-1.5" />
              </div>
            
              <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={(e)=>setform({...form,address:e.target.value})}
                  placeholder="123 Main Street"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" value={form.city} onChange={(e)=>setform({...form,city:e.target.value})} placeholder="New York" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" value={form.pincode} onChange={(e) => setform({...form,pincode:e.target.value})} placeholder="10001" className="mt-1.5" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone} onChange={(e)=> setform({...form , phone:e.target.value})}
                  placeholder="+91 8003620625"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* <div>
            <h2 className="font-display text-lg font-semibold mb-4">Payment Method</h2>
            <div className="border border-border rounded-lg p-4 flex items-center gap-3 bg-secondary/50">
              <CreditCard size={20} className="text-primary" />
              <div>
                <p className="text-sm font-medium">Credit / Debit Card</p>
                <p className="text-xs text-muted-foreground">Demo mode — no real payment</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="col-span-2">
                <Label htmlFor="card">Card Number</Label>
                <Input id="card" placeholder="4242 4242 4242 4242" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="expiry">Expiry</Label>
                <Input id="expiry" placeholder="MM / YY" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" className="mt-1.5" />
              </div>
            </div>
          </div> */}
        </div>

        {/* Order Summary */}
        <div className="md:col-span-2">
          <div className="sticky top-24 rounded-xl bg-secondary/50 p-6">
            <h2 className="font-display mb-4 text-lg font-semibold">
              Order Summary
            </h2>
            <div className="mb-6 space-y-4">
              {product && (
                <div className="flex gap-3">
                  <img src={product.mainImage.url} alt={product.productName} className="w-14 h-16 object-cover rounded bg-secondary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.productName}</p>
                    <p className="text-xs text-muted-foreground">Qty: {qty}</p>
                  </div>
                  <span className="text-sm font-medium">${totalprice}</span>
                </div>
              )}
            </div>
            <div className="space-y-2 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalprice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-primary">Free</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
                <span>Total</span>
                <span>${totalprice}</span>
              </div>
            </div>
            <Button
              className="mt-6 h-12 w-full rounded-full font-semibold"
              disabled={createMutation.isPending}

              onClick={() => {
                if(!validate()){
                    toast.error("Fill all the details ");
                    return;
                }
                createMutation.mutate();
          
                
              }}
            >
                {createMutation.isPending ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
