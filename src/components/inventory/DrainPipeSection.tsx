import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InventoryFormValues } from '@/schemas/inventorySchema';

interface DrainPipeSectionProps {
  form: UseFormReturn<InventoryFormValues>;
}

export const DrainPipeSection: React.FC<DrainPipeSectionProps> = ({ form }) => {
  const drainPipes = form.watch('drainPipes');

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-secondary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          💧 Drain Pipes
          <Badge variant="secondary" className="ml-auto">
            {drainPipes.filter(p => p.selected).length} selected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {drainPipes.map((pipe, index) => (
            <div key={pipe.size} className="flex items-center gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors">
              <FormField
                control={form.control}
                name={`drainPipes.${index}.selected`}
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
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <Label className="font-semibold text-base">{pipe.size}"</Label>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Quantity</Label>
                  <FormField
                    control={form.control}
                    name={`drainPipes.${index}.quantity`}
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
                            disabled={!pipe.selected}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Type</Label>
                  <FormField
                    control={form.control}
                    name={`drainPipes.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => field.onChange('Soft')}
                              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                field.value === 'Soft'
                                  ? 'bg-success text-success-foreground'
                                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                              }`}
                              disabled={!pipe.selected}
                            >
                              Soft
                            </button>
                            <button
                              type="button"
                              onClick={() => field.onChange('Hard')}
                              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                field.value === 'Hard'
                                  ? 'bg-success text-success-foreground'
                                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                              }`}
                              disabled={!pipe.selected}
                            >
                              Hard
                            </button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Unit</Label>
                  <FormField
                    control={form.control}
                    name={`drainPipes.${index}.unit`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => field.onChange('ft')}
                              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                field.value === 'ft'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                              }`}
                              disabled={!pipe.selected}
                            >
                              ft
                            </button>
                            <button
                              type="button"
                              onClick={() => field.onChange('m')}
                              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                field.value === 'm'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                              }`}
                              disabled={!pipe.selected}
                            >
                              m
                            </button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {pipe.selected && pipe.quantity > 0 && (
                    <span className="text-success font-medium">
                      ✓ {pipe.quantity} piece × {pipe.type} ({pipe.unit})
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