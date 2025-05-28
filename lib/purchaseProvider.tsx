import { createContext, useContext, useEffect, useState } from "react";
import Purchases from "react-native-purchases";

const PurchaseContext = createContext<{ isProUser: boolean | null }>({ isProUser: null });

export function PurchaseProvider({ children }: { children: React.ReactNode }) {
  const [isProUser, setIsProUser] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPurchases = async () => {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        const activeEntitlements = customerInfo.entitlements.active;
        setIsProUser(!!activeEntitlements["Pro"]); // replace with your entitlement ID
      } catch (err) {
        console.warn("Error fetching purchase info", err);
        setIsProUser(false);
      }
    };

    checkPurchases();
  }, []);

  return (
    <PurchaseContext.Provider value={{ isProUser }}>
      {children}
    </PurchaseContext.Provider>
  );
}

export const usePurchase = () => useContext(PurchaseContext);