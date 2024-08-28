'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Alert } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/sonner"
import { Checkbox } from "@/components/ui/checkbox"


interface PricesItem {
    sku: number;
    product_name: string;
    asin: string;
    purchase_cost: number | null;
    user_id: string;
}

const supabase = createClient();

export const PricesForm = () => {
    const [pricesItems, setPricesItems] = useState<PricesItem[]>([]);
    const [updatedPrices, setUpdatedPrices] = useState<{ [sku: number]: number }>({});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [filterNotPrice, setFilterNotPrice] = useState<boolean>(false);
    // const [itemsWithoutCost, setItemsWithoutCost] = useState<PricesItem[]>([]);
    
    console.log("updatedPrices",updatedPrices);


const filteredItems = filterNotPrice
    ? pricesItems.filter((item) => item.purchase_cost == null)
    : pricesItems;




    useEffect(() => {
        const fetchPricesItems = async () => {
            const { data: {user} } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('cost_items')
                .select('*')
                .eq('user_id', user.id).order('sku', { ascending: true }); // Ordenar
            if (error) {
                console.error(error);
            } else {
                setPricesItems(data as PricesItem[]);
            }
            setLoading(false);
        };

        fetchPricesItems();
    }, []);


  
    // useEffect(() => {
    //     // Filtrar los elementos con `purchase_cost` igual a `null`
    //     const bla = pricesItems.filter(item => item.purchase_cost === null);
    //     // Actualizar el estado con los elementos filtrados
    //     setItemsWithoutCost(bla);
    // }, [pricesItems]); // El efecto se ejecutará cada vez que `pricesItems` cambie
    


    const handleInputChange = (sku: number, newPrice: number) => {
        setUpdatedPrices(prev => ({
            ...prev,
            [sku]: newPrice,
        }));
    };

    const handleUpdatePrice = async (sku: number) => {
        setMessage(null); // Resetea el mensaje antes de intentar la actualización
     if (updatedPrices[sku] === undefined) {
        setMessage({ type: 'error', text: `The price for the SKU ${sku} you haven't changed it` });
        return;
    }
    const currentPrice = pricesItems.find(item => item.sku === sku)?.purchase_cost;

    // Verificar si el precio es el mismo
    if (updatedPrices[sku] === currentPrice) {
        setMessage({ type: 'success', text: `The price for the SKU ${sku} It is already $${currentPrice}` });
        return;
    }


        try {
            const { data, error } = await supabase
                .from('cost_items')
                .update({ purchase_cost: updatedPrices[sku] })
                .eq('sku', sku);


            if (error) {
                throw error;
            } else {
                setPricesItems(prev =>
                    prev.map(item =>
                        item.sku === sku ? { ...item, purchase_cost: updatedPrices[sku] } : item
                    )
                );
                    setMessage({ type: 'success', text: `Price updated successfully ${sku}  $${updatedPrices[sku]}` });
            }
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Error updating price' });
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta o si el mensaje cambia antes de los 3 segundos
        }
    }, [message]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loanding...</div>;
    }

 
    return (
        <>
            {message && (
                <Alert
                    className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-4 rounded-md shadow-lg max-w-sm w-full ${
                        message.type === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {message.text}
                </Alert>
            )}

          <div className="flex flex-col gap-5  w-full">
             <div className="flex items-center space-x-2 mb-4">
       
        <label
            htmlFor="terms"
            // className="text-sm font-medium"
        >
            See only the ones that are priceless
        </label>
         <Checkbox
            id="terms"
            onClick={() => setFilterNotPrice(prev => !prev)}
            className="h-4 w-4"
        />
    </div>

                <h1 className="text-2xl font-bold mb-4">List of product unit costs:</h1>
           
<div 
className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">

    
                {filteredItems.map(({ sku, product_name, asin, purchase_cost }) => (
                    <Card key={sku} className="mb-4">
                        <CardHeader>
                            <CardTitle>
                                asin: {asin} <br />
                                sku: {sku}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-500">Product Name: {product_name}</p>
                            <Label htmlFor={`inputPrice_${sku}`} className="block mt-4 text-sm font-medium text-gray-700">
                            Cost usd:
                            </Label>
                            <div className="flex">
                                <Input
                                    id={`inputPrice_${sku}`}
                                    type="number"
                                    value={updatedPrices[sku] !== undefined ? updatedPrices[sku] : (purchase_cost ?? '')}
                                    onChange={(e) => handleInputChange(sku, parseFloat(e.target.value))}
                                    className="mt-1 block w-full"
                                    />
                                <Button onClick={() => handleUpdatePrice(sku)} className="ml-2">Update</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                </div>
            </div>
        </>
    );
};

export default PricesForm;