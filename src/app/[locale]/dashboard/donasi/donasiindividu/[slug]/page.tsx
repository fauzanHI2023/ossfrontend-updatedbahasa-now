'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import { getProductBySlug, ProductResponse } from '@/lib/auth-donasi';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PopupNotif from '@/components/ui/utility/PopupNotif';

interface Params {
    slug: string;
}

const Page: React.FC<{ params: Params }> = ({ params }) => {
    const [productData, setProductData] = useState<ProductResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [customPrice, setCustomPrice] = useState<number | null>(null);
    const router = useRouter();
    const [notifMessage, setNotifMessage] = useState('');

    const fetchImageUrl = async (key: string): Promise<string> => {
        const response = await fetch(`/api/getImage?key=${key}`);
        const data = await response.json();
        return data.url;
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productResponse = await getProductBySlug(params.slug);
                setProductData(productResponse);

                // Fetch the image URL
                const productImageUrl = await fetchImageUrl(productResponse.data.product.product_img);
                setImageUrl(productImageUrl);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.slug) {
            fetchProduct();
        }
    }, [params.slug]);

    const formatPriceToIDR = (price: number): string => {
      return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
      }).format(price);
    };

    const handlePriceButtonClick = (price: number) => {
        setCustomPrice(price);
    };

    const handlePriceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value.replace(/,/g, ''));
        if (!isNaN(value)) {
            setCustomPrice(value);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!productData) {
        return <p>Product not found</p>;
    }

    const { product, transactionCount, totalGrossAmount } = productData.data;
    const priceToDisplay = customPrice !== null ? customPrice : product.price;

    const calculateProgress = (grossAmount: number): number => {
        const min = 50000;
        const max = 50000000;
        return ((grossAmount - min) / (max - min)) * 100;
    };

    const addToCart = (product: any) => {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      setNotifMessage("Produk Berhasil Ditambahkan.");
      router.push("/checkout");
    };

    return (
        <DashboardLayout>
            <main className="flex min-h-screen flex-col px-16 py-12">
                <div className="box p-6 flex flex-col gap-y-5 shadow-xl rounded-xl dark:bg-slate-900 bg-white">
                    <h1 className="text-lg font-semibold">{product.name}</h1>
                    {imageUrl ? (
                        <Image src={imageUrl} alt={product.name} width={1000} height={200} className="rounded-md" />
                    ) : (
                        <p>Image not available</p>
                    )}
                    <div className="flex flex-row gap-x-8 w-full">
                        <div className="w-2/3 flex flex-col gap-y-4">
                            <Progress value={calculateProgress(totalGrossAmount)} />
                            <p className="text-xs font-semibold text-blue-900">{transactionCount} orang mendukung program ini</p>
                            <div className="flex flex-col gap-y-4">
                              <h4>Deskripsi</h4>
                              <p>{product.description}</p>
                            </div>
                        </div>
                        <div className="w-1/3 flex flex-col gap-y-4 bg-indigo-100 dark:bg-slate-700 py-4 px-4">
                            <div className="flex flex-row gap-x-4">
                              <p className="bg-sky-500 text-white py-1 px-2 rounded-3xl text-sm">{product.donasi_type}</p>
                              <p className="bg-white text-sky-500 py-1 px-2 rounded-3xl text-sm">{product.category_program}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg">
                              <p className="text-normal font-semibold">{formatPriceToIDR(priceToDisplay)}</p>
                              <button className="bg-gray-200 text-gray-700 py-1 px-2 rounded text-sm" onClick={() => handlePriceButtonClick(100000)}>Rp 100.000</button>
                              <button className="bg-gray-200 text-gray-700 py-1 px-2 rounded text-sm" onClick={() => handlePriceButtonClick(200000)}>Rp 200.000</button>
                              <button className="bg-gray-200 text-gray-700 py-1 px-2 rounded text-sm" onClick={() => handlePriceButtonClick(500000)}>Rp 500.000</button>
                              <button className="bg-gray-200 text-gray-700 py-1 px-2 rounded text-sm" onClick={() => handlePriceButtonClick(1000000)}>Rp 1.000.000</button>
                              <input type="text" value={customPrice !== null ? customPrice.toLocaleString('id-ID') : ''} onChange={handlePriceInputChange} />
                              <button onClick={() => addToCart(product)} className="bg-blue-800 text-white p-2 rounded">Tambah Donasi</button>
                            </div>
                        </div>
                    </div>
                </div>
                <PopupNotif
                    message={notifMessage}
                    duration={3000}
                    onClose={() => setNotifMessage('')}
                />
            </main>
        </DashboardLayout>
    );
};

export default Page;
