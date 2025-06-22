//import Constants from 'expo-constants';
import { createContext, useContext, useEffect, useState } from "react";

//console.log("RC iOS Key:", Constants.expoConfig?.extra?.REVENUECAT_IOS_API_KEY);

const PurchaseContext = createContext<{ isProUser: boolean | null }>({ isProUser: null });

export function PurchaseProvider({ children }: { children: React.ReactNode }) {
  const [isProUser, setIsProUser] = useState<boolean | null>(true);

  useEffect(() => {
  /* const initPurchases = async () => {
    try {
        Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

        const apiKey = Platform.select({
          ios: Constants.expoConfig?.extra?.REVENUECAT_IOS_API_KEY,
          android: Constants.expoConfig?.extra?.REVENUECAT_ANDROID_API_KEY,
        }) as string;

        Purchases.configure({ apiKey });

        // Log out any existing user for sandbox reset
        await Purchases.logOut();

      await Purchases.syncPurchases();
      const customerInfo = await Purchases.getCustomerInfo();
      const activeEntitlements = customerInfo.entitlements.active;
      console.log("Active Entitlements:", activeEntitlements);

      setIsProUser(!!activeEntitlements["Pro"]);
    } catch (err) {
      console.warn("Error fetching purchase info", err);
      setIsProUser(false);
    }
  };

  initPurchases(); */
}, []);

  return (
    <PurchaseContext.Provider value={{ isProUser }}>
      {children}
    </PurchaseContext.Provider>
  );
}

export const usePurchase = () => useContext(PurchaseContext);