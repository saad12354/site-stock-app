import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InventoryFormValues } from '@/schemas/inventorySchema';

interface FittingSectionProps {
  form: UseFormReturn<InventoryFormValues>;
}

export const FittingSection: React.FC<FittingSectionProps> = ({ form }) => {
  const fittings = form.watch('fittings');

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-secondary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          🔧 Pipe Fittings
          <Badge variant="secondary" className="ml-auto">
            {fittings.filter(f => f.selected).length} selected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fittings.map((fitting, index) => (
            <div key={fitting.size} className="flex items-center gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors">
              <FormField
                control={form.control}
                name={`fittings.${index}.selected`}
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
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div>
                  <Label className="font-semibold text-base">{fitting.size}"</Label>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Elbow Qty</Label>
                  <div className="flex gap-2 items-center">
                    <FormField
                      control={form.control}
                      name={`fittings.${index}.elbowQty`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="1000"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                              placeholder="Qty"
                              className="h-10"
                              disabled={!fitting.selected}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`fittings.${index}.elbowFeet`}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!fitting.selected}
                            />
                          </FormControl>
                          <Label className="text-xs">feet</Label>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Coupling Qty</Label>
                  <div className="flex gap-2 items-center">
                    <FormField
                      control={form.control}
                      name={`fittings.${index}.couplingQty`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="1000"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                              placeholder="Qty"
                              className="h-10"
                              disabled={!fitting.selected}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`fittings.${index}.couplingFeet`}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!fitting.selected}
                            />
                          </FormControl>
                          <Label className="text-xs">feet</Label>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {fitting.selected && (fitting.elbowQty > 0 || fitting.couplingQty > 0) && (
                    <span className="text-success font-medium">
                      ✓ E:{fitting.elbowQty}{fitting.elbowFeet ? '(ft)' : ''} C:{fitting.couplingQty}{fitting.couplingFeet ? '(ft)' : ''}
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