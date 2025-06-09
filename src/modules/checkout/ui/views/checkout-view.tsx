"use client";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useCart } from "../../hook/use-cart";
import { toast } from "sonner";
import { generateTenantUrl } from "@/lib/utils";
import { CheckoutItem } from "../components/checkout-item";
import { CheckoutSideBar } from "../components/checkout-sidebar";
import { InboxIcon, LoaderCircle } from "lucide-react";
import { useCheckoutStates } from "../../hook/use-checkout-state";
import { useRouter } from "next/navigation";

interface Props {
  tenantSlug: string;
}
export const CheckoutView = ({ tenantSlug }: Props) => {
  const router = useRouter()
  const[states, setStates]= useCheckoutStates();
  const { productIds,removeProduct,clearCart } = useCart(tenantSlug);
  const trpc = useTRPC();
  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({
      ids: productIds,
    })
  );

  const purchase= useMutation(trpc.checkout.purchase.mutationOptions({
    onError:(error)=>{
        if(error.data?.code==="UNAUTHORIZED"){
            router.push("/sign-in")
        }
        toast.error(error.message)
    },
    onSuccess:(data)=>{
        window.location.href=data.url;
    },
    onMutate:()=>{
        setStates({success:false, cancel:false})
    }
  }));

  useEffect(()=>{
    if(states.success){
      setStates({success:false, cancel:false})
        clearCart();
        router.push("/products")
    }
  },[states.success,clearCart,router,setStates])
  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearCart();
      toast.warning(
        "Some products are not available anymore. Your cart has been cleared."
      );
    }
  }, [error, clearCart]);

  if (data?.totalDocs === 0) {
    return (
      <div className="lg:pt-16 pt-4 px-4 lg:px-12">
        <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-2 bg-white w-full rounded-md">
          <InboxIcon  size={40}/>
          <h2 className="text-lg font-medium">Your cart is empty!</h2>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="lg:pt-16 pt-4 px-4 lg:px-12">
        <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-md">
          <LoaderCircle className="animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pt-16 pt-4 px-4 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="border rounded-md overflow-hidden">
            {data?.docs.length ? (
              data.docs.map((product, index) => (
                <CheckoutItem
                  key={product.id}
                  isLast={index === data.docs.length - 1}
                  imageUrl={product.image?.url}
                  name={product.name}
                  productUrl={`${generateTenantUrl(product.tenant.slug)}/products/${product.id}`}
                  tenantUrl={generateTenantUrl(product.tenant.slug)}
                  tenantName={product.tenant.name}
                  price={product.price ? product.price : 0}
                  onRemove={() => removeProduct(product.id)}
                />
              ))
            ) : (
              <div className="p-4 text-center">
                <p className="text-gray-500">Your cart is empty.</p>
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckoutSideBar
            total={data?.totalPrice || 0}
            onPurchase={() => purchase.mutate({tenantSlug,productIds})}
            isCanceled={states.cancel}
            disabled={purchase.isPending}
          />
        </div>
      </div>
    </div>
  );
};
