import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InventoryFormValues } from '@/schemas/inventorySchema';

interface NutSectionProps {
  form: UseFormReturn<InventoryFormValues>;
}

export const NutSection: React.FC<NutSectionProps> = ({ form }) => {
  const nuts = form.watch('nuts');

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-secondary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          🔩 Flare Nuts
          <Badge variant="secondary" className="ml-auto">
            {nuts.filter(n => n.selected).length} selected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nuts.map((nut, index) => (
            <div key={nut.size} className="flex items-center gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors">
              <FormField
                control={form.control}
                name={`nuts.${index}.selected`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="scale-125"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                  <Label className="font-semibold text-base">{nut.size}"</Label>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Quantity</Label>
                  <FormField
                    control={form.control}
                    name={`nuts.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="1000"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                            placeholder="Qty"
                            className="h-10"
                            disabled={!nut.selected}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {nut.selected && nut.quantity > 0 && (
                    <span className="text-success font-medium">
                      ✓ {nut.quantity} pieces
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};