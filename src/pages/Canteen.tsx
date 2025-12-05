import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockMenu, MenuItem } from '@/api/mockData';
import { Utensils, ShoppingCart, Plus, Minus, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface CartItem extends MenuItem {
  quantity: number;
}

export default function Canteen() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const categories = [...new Set(mockMenu.map(item => item.category))];

  const addToCart = (item: MenuItem) => {
    if (!item.available) {
      toast.error('Item not available');
      return;
    }
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast.success(`${item.name} added to cart`);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    toast.success('Order placed successfully!', {
      description: 'Your order will be ready in 15-20 minutes',
    });
    setCart([]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
            <Utensils className="h-7 w-7 text-accent" />
            Canteen Connect
          </h1>
          <p className="text-muted-foreground">Order food online from campus canteen</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Open: 8:00 AM - 8:00 PM</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Menu */}
        <div className="lg:col-span-2">
          <Tabs defaultValue={categories[0]}>
            <TabsList className="mb-4">
              {categories.map(cat => (
                <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
              ))}
            </TabsList>

            {categories.map(cat => (
              <TabsContent key={cat} value={cat} className="space-y-3">
                {mockMenu.filter(item => item.category === cat).map(item => (
                  <Card key={item.id} className={!item.available ? 'opacity-60' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{item.name}</h3>
                            {!item.available && (
                              <Badge variant="secondary">Unavailable</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <p className="text-lg font-bold text-primary mt-1">₹{item.price}</p>
                        </div>
                        <Button
                          onClick={() => addToCart(item)}
                          disabled={!item.available}
                          size="sm"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Cart */}
        <Card className="h-fit sticky top-20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Your Cart
              {totalItems > 0 && (
                <Badge className="ml-auto">{totalItems}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-2 py-2 border-b border-border">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">₹{item.price} × {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.id)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => addToCart(item)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{totalAmount}</span>
                </div>
                <Button className="w-full mt-4" onClick={placeOrder}>
                  Place Order
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
