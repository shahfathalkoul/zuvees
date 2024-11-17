import logo from './logo.svg';
import './App.css';
import InventoryView from './components/InventoryView';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoriesPage from './components/CategoriesPage';
import VariantsPage from './components/VariantsPage';
import RawMaterialsPage from './components/RawMaterialsPage';
import RoleSelectionPage from './mainPage';
import FlowerShop from './componentsMain/FlowerShop';
import { ProductCard } from './componentsMain/ProductCard';
function App() {
  const appRouter = createBrowserRouter([
    {
      path : "/",
      element : <RoleSelectionPage/>
    },
    {
      path : "/card",
      element : <ProductCard/>
    },
    {
    path : "/user",
    element : <FlowerShop/>
    },
    {
        path : "/admin",
        element : <InventoryView/>
    },
    {
      path : "/categories",
      element : <CategoriesPage/>
    },
    {
      path : "/raw",
      element : <RawMaterialsPage/>
    },
    {
      path : "/variant",
      element : <VariantsPage/>
    },



])
  return (
<RouterProvider router = {appRouter}/>
  );
}

export default App;
