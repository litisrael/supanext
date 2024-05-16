/** @format */
"use client";

import AuthButton from "@/components/AuthButton";
import { useState } from "react";
import { Nav } from "./ui/nav";

type Props = {};

import {
  ShoppingCart,
  CircleDollarSign,
  Earth ,
  UsersRound,
  Settings,
  ChevronRight,
  LogOut,
  Home as HomeIcon,
  BarChart 
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";
import Home from "@/app/page";
interface BLa {
  signOut: () => Promise<void>;
}
  export default function SideNavbar({signOut }: BLa) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  const handleSignOut = async () => {
    try {
      await signOut(); // Espera a que se resuelva la promesa
      console.log("Usuario desconectado con éxito");
      // Otras acciones después de que se complete el cierre de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Manejo de errores
    }
  };
  return (
    
    <div className="relative min-w-[80px] border-r px-3  pb-10 pt-24 ">
     
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
  
        links={[
          
          {
            title: "home",
            href: "/",
            icon: HomeIcon,
            variant: "default"
          },
          {
            title: "Upload",
            href: "/upload",
            icon: Settings,
            variant: "ghost"
          },
          // {
          //   title: "dashboard specific",
          //   href: "/specific-query-dashboard",
          //   icon: LayoutDashboard,
          //   variant: "ghost"
          // },
          {
            title: "Billing",
            href: "/billing",
            icon: CircleDollarSign,
            variant: "ghost"
          },
          // {
          //   title: "Users",
          //   href: "/users",
          //   icon: UsersRound,
          //   variant: "ghost"
          // },
          {
            title: "Orders",
            href: "/orders",
            icon: ShoppingCart,
            variant: "ghost"
          },
          {
            title: "States",
            href: "/states",
            icon: Earth ,
            variant: "ghost"
          }
        ]} 

        logout={
      {    title: "Logout",
          onClick:()=> handleSignOut() , 
          icon: LogOut,
          variant: "ghost"}
        
      }
      />  
       
    </div>
  );
}
