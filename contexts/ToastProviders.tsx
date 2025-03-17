import React, {createContext, useContext, useRef} from "react";
import Toast, {IToast} from "components/ui/Toast";

type ToastContextType = {
  showToast: (text: string, type: "info" | "success" | "error") => void;
  hideToast: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({children}: {children: React.ReactNode}) {
  const toastRef = useRef<IToast>(null);

  const showToast = (text: string, type: "info" | "success" | "error") => {
    toastRef.current?.hide(() => {
      toastRef.current?.show(text, type, 400);
    });
  };

  const hideToast = () => {
    toastRef.current?.hide();
  };

  return (
    <ToastContext.Provider value={{showToast, hideToast}}>
      <Toast ref={toastRef} onHide={() => {}} />
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
