import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { TooltipProvider } from "./components/ui/tooltip"; // ✅ Import TooltipProvider

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TooltipProvider>
      {/* ✅ Wrap here */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      <Toaster />
    </TooltipProvider>
  </StrictMode>
);
