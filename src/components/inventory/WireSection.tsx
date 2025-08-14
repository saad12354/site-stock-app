import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InventoryFormValues } from '@/schemas/inventorySchema';

interface WireSectionProps {
  form: UseFormReturn<InventoryFormValues>;
}

export const WireSection: React.FC<WireSectionProps> = ({ form }) => {
  const wires = form.watch('wires');

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-secondary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          ⚡ Wires
          <Badge variant="secondary" className="ml-auto">
            {wires.filter(w => w.selected).length} selected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {wires.map((wire, index) => (
            <div key={wire.size} className="flex items-center gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors">
              <FormField
                control={form.control}
                name={`wires.${index}.selected`}
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
                  <Label className="font-semibold text-base">{wire.size} sq mm</Label>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Length (m)</Label>
                  <FormField
                    control={form.control}
                    name={`wires.${index}.length`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            max="10000"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                            placeholder="Length"
                            className="h-10"
                            disabled={!wire.selected}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Cores</Label>
                  <FormField
                    control={form.control}
                    name={`wires.${index}.cores`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-1">
                            {[2, 4, 6].map(cores => (
                              <button
                                key={cores}
                                type="button"
                                onClick={() => field.onChange(cores)}
                                className={`px-2 py-1 rounded-md text-sm font-medium transition-colors ${
                                  field.value === cores
                                    ? 'bg-success text-success-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                                disabled={!wire.selected}
                              >
                                {cores}
                              </button>
                            ))}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {wire.selected && wire.length > 0 && (
                    <span className="text-success font-medium">
                      ✓ {wire.length}m {wire.cores}-core
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