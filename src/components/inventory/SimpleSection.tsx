import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InventoryFormValues } from '@/schemas/inventorySchema';

interface SimpleSectionProps {
  form: UseFormReturn<InventoryFormValues>;
}

export const SimpleSection: React.FC<SimpleSectionProps> = ({ form }) => {
  const formData = form.watch();

  return (
    <div className="space-y-6">
      {/* Flaring Tool */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-secondary/30">
        <CardHeader>
          <CardTitle className="text-xl">🔧 Flaring Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 rounded-lg border bg-background/50">
            <FormField
              control={form.control}
              name="flaringTool"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="scale-125"
                    />
                  </FormControl>
                  <FormLabel className="text-base font-medium cursor-pointer">Flaring Tool Required</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Brazing Rods */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-secondary/30">
        <CardHeader>
          <CardTitle className="text-xl">🔥 Brazing Rods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="brazingRods"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                      placeholder="Quantity"
                      className="mt-2 h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Butane / LPG */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-secondary/30">
        <CardHeader>
          <CardTitle className="text-xl">⛽ Butane / LPG</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="butaneSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Size</FormLabel>
                  <FormControl>
                    <div className="flex gap-4 mt-2">
                      <button
                        type="button"
                        onClick={() => field.onChange('Small')}
                        className={`flex-1 py-3 rounded-lg text-base font-medium transition-colors ${
                          field.value === 'Small'
                            ? 'bg-success text-success-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        Small
                      </button>
                      <button
                        type="button"
                        onClick={() => field.onChange('Big')}
                        className={`flex-1 py-3 rounded-lg text-base font-medium transition-colors ${
                          field.value === 'Big'
                            ? 'bg-success text-success-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        Big
                      </button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="butaneQty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                      placeholder="Quantity"
                      className="mt-2 h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Additional Tools & Materials */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-secondary/30">
        <CardHeader>
          <CardTitle className="text-xl">🛠️ Tools & Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="drainHeaterLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">🔌 Drain Heater Length (ft)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                        placeholder="Length"
                        className="mt-2 h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="hatlonLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">📏 Hatlon Length</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                          placeholder="Length"
                          className="mt-2 h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hatlonUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => field.onChange('ft')}
                            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                              field.value === 'ft'
                                ? 'bg-success text-success-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                          >
                            ft
                          </button>
                          <button
                            type="button"
                            onClick={() => field.onChange('m')}
                            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                              field.value === 'm'
                                ? 'bg-success text-success-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                          >
                            meter
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="oxygenCylinders"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">🫧 Oxygen Cylinders</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                        placeholder="Quantity"
                        className="mt-2 h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="nitrogenCylinders"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">💨 Nitrogen Cylinders</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                        placeholder="Quantity"
                        className="mt-2 h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="acGas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">❄️ AC Gas Type/kg</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="404, 404A, 410, etc."
                        className="mt-2 h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};