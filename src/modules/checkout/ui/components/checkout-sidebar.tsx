import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/utils";
import { CircleXIcon } from "lucide-react";
import React from "react";

interface CheckoutSideBarProps {
  total: number;
  onPurchase: () => void;
  isCanceled: boolean;
  disabled: boolean;
}
export const CheckoutSideBar = ({
  total,
  onPurchase,
  isCanceled,
  disabled,
}: CheckoutSideBarProps) => {
  return (
    <div className="border rounded-md overflow-hidden bg-white flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h4 className="font-medium text-lg">Total</h4>
        <p className="font-medium text-lg">{currencyFormatter(total)}</p>
      </div>
      <div className="flex items-center justify-center p-4">
        <Button
          variant={"elevated"}
          onClick={onPurchase}
          disabled={disabled}
          size={"lg"}
          className="w-full text-base text-white bg-primary hover:bg-yellow-300 hover:text-primary"
        >
          Checkout
        </Button>
      </div>
      {isCanceled && (
        <div className="p-4 flex justify-center items-center border-t">
          <div className="bg-red-100 border border-red-400 font-medium px-4 py-3 rounded-md flex items-center w-full">
            <div className="flex items-center">
              <CircleXIcon className="size-6 mr-2 fill-red-500 text-red-100" />
              <span>Checkout failed, please try again!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
