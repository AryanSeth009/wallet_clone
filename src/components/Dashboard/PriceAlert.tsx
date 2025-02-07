"use client"
import React, { useState, useEffect } from 'react';
import { BellIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface PriceAlertType {
  id: string;
  price: string;
  type: 'above' | 'below';
  active: boolean;
}

const PriceAlert = () => {
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [alerts, setAlerts] = useState<PriceAlertType[]>([]);
  const [newAlertPrice, setNewAlertPrice] = useState<string>('1632');
  const [newAlertType, setNewAlertType] = useState<'above' | 'below'>('below');
  const [showNewAlert, setShowNewAlert] = useState(false);

  // Fetch current ETH price
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        const data = await response.json();
        setCurrentPrice(data.ethereum.usd);
      } catch (error) {
        console.error('Failed to fetch ETH price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Check price alerts
  useEffect(() => {
    if (!currentPrice) return;

    alerts.forEach(alert => {
      const alertPrice = parseFloat(alert.price.replace(',', ''));
      if (alert.active) {
        if (alert.type === 'above' && currentPrice > alertPrice) {
          toast.success(`ETH price is now above $${alert.price}!`);
          setAlerts(prev => 
            prev.map(a => 
              a.id === alert.id ? { ...a, active: false } : a
            )
          );
        } else if (alert.type === 'below' && currentPrice < alertPrice) {
          toast.success(`ETH price is now below $${alert.price}!`);
          setAlerts(prev => 
            prev.map(a => 
              a.id === alert.id ? { ...a, active: false } : a
            )
          );
        }
      }
    });
  }, [currentPrice, alerts]);

  const createAlert = () => {
    const newAlert: PriceAlertType = {
      id: Date.now().toString(),
      price: newAlertPrice,
      type: newAlertType,
      active: true
    };
    
    setAlerts(prev => [...prev, newAlert]);
    setShowNewAlert(false);
    toast.success('Price alert created successfully!');
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    toast.success('Price alert removed');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-1 bg-gradient-to-r from-[#8A2BE2] to-[#00BFFF] text-transparent bg-clip-text">
            Price alerts
          </h2>
          <p className="text-[#A0AEC0] text-sm">
            Current ETH Price: ${currentPrice.toFixed(2)}
          </p>
        </div>
        <button 
          onClick={() => setShowNewAlert(true)}
          className="p-2 rounded-lg bg-[#1A1B23] text-[#A0AEC0] hover:bg-[#1A1B23]/80 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {showNewAlert && (
          <div className="bg-[#1A1B23] rounded-lg p-4 border border-[rgba(255,255,255,0.1)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#13141B] flex items-center justify-center">
                  <span className="text-sm">$</span>
                </div>
                <div>
                  <p className="font-medium text-white">New price alert</p>
                  <p className="text-sm text-[#A0AEC0]">
                    {newAlertType === 'below' ? 'Below' : 'Above'} ${newAlertPrice}
                  </p>
                </div>
              </div>
              <BellIcon className="h-5 w-5 text-[#8A2BE2]" />
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <select
                value={newAlertType}
                onChange={(e) => setNewAlertType(e.target.value as 'above' | 'below')}
                className="bg-[#13141B] text-white border border-gray-700 rounded-lg px-3 py-2"
              >
                <option value="below">Below</option>
                <option value="above">Above</option>
              </select>
              <div className="flex items-center">
                <span className="text-xl">$</span>
                <input
                  type="text"
                  value={newAlertPrice}
                  onChange={(e) => setNewAlertPrice(e.target.value)}
                  className="text-xl font-medium w-24 bg-transparent text-white outline-none border-b border-gray-700 focus:border-[#8A2BE2] transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 px-2 mb-2">
              {['1,650', '1,640', '1,630', '1,620', '1,610'].map((price) => (
                <span key={price}>{price}</span>
              ))}
            </div>

            <div className="w-full bg-gray-700 h-2 rounded-full mb-4">
              <div 
                className="bg-[#8A2BE2] h-full rounded-full" 
                style={{ 
                  width: `${Math.min(100, Math.max(0, 
                    (Number(newAlertPrice.replace(',', '')) - 1610) / (1650 - 1610) * 100
                  ))}%` 
                }}
              />
            </div>

            <div className="flex gap-2">
              <button 
                onClick={createAlert}
                className="flex-1 py-2 text-center text-white bg-[#7136D1] rounded-lg hover:bg-[#8A2BE2] transition-colors"
              >
                Create Alert
              </button>
              <button 
                onClick={() => setShowNewAlert(false)}
                className="flex-1 py-2 text-center text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {alerts.map(alert => (
          <div 
            key={alert.id}
            className="bg-[#1A1B23] rounded-lg p-4 border border-[rgba(255,255,255,0.1)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#13141B] flex items-center justify-center">
                  <span className="text-sm">$</span>
                </div>
                <div>
                  <p className="font-medium text-white">Price alert</p>
                  <p className="text-sm text-[#A0AEC0]">
                    {alert.type === 'below' ? 'Below' : 'Above'} ${alert.price}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {alert.active ? (
                  <BellIcon className="h-5 w-5 text-[#8A2BE2]" />
                ) : (
                  <span className="text-sm text-green-500">Triggered</span>
                )}
                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceAlert;
