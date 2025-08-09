import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { InventoryFormData } from '@/types/inventory';

interface SimpleSectionProps {
  formData: InventoryFormData;
  onUpdate: (formData: InventoryFormData) => void;
}

export const SimpleSection: React.FC<SimpleSectionProps> = ({ formData, onUpdate }) => {
  const updateField = (field: keyof InventoryFormData, value: any) => {
    onUpdate({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Flaring Tool */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-secondary/30">
        <CardHeader>
          <CardTitle className="text-xl">🔧 Flaring Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 rounded-lg border bg-background/50">
            <Checkbox
              checked={formData.flaringTool}
              onCheckedChange={(checked) => updateField('flaringTool', !!checked)}
              className="scale-125"
            />
            <Label className="text-base font-medium cursor-pointer">Flaring Tool Required</Label>
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
            <div>
              <Label className="text-base font-medium">Quantity</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.brazingRods || ''}
                onChange={(e) => updateField('brazingRods', Number(e.target.value) || 0)}
                placeholder="Quantity"
                className="mt-2 h-12"
              />
            </div>
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
            <div>
              <Label className="text-base font-medium">Size</Label>
              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => updateField('butaneSize', 'Small')}
                  className={`flex-1 py-3 rounded-lg text-base font-medium transition-colors ${
                    formData.butaneSize === 'Small'
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Small
                </button>
                <button
                  type="button"
                  onClick={() => updateField('butaneSize', 'Big')}
                  className={`flex-1 py-3 rounded-lg text-base font-medium transition-colors ${
                    formData.butaneSize === 'Big'
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Big
                </button>
              </div>
            </div>
            <div>
              <Label className="text-base font-medium">Quantity</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.butaneQty || ''}
                onChange={(e) => updateField('butaneQty', Number(e.target.value) || 0)}
                placeholder="Quantity"
                className="mt-2 h-12"
              />
            </div>
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
              <div>
                <Label className="text-base font-medium">🔌 Drain Heater Length (ft)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.drainHeaterLength || ''}
                  onChange={(e) => updateField('drainHeaterLength', Number(e.target.value) || 0)}
                  placeholder="Length"
                  className="mt-2 h-12"
                />
              </div>
              
              <div>
                <Label className="text-base font-medium">📏 Hatlon Length</Label>
                <div className="space-y-2 mt-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.hatlonLength || ''}
                    onChange={(e) => updateField('hatlonLength', Number(e.target.value) || 0)}
                    placeholder="Length"
                    className="h-12"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateField('hatlonUnit', 'ft')}
                      className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                        formData.hatlonUnit === 'ft'
                          ? 'bg-success text-success-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      ft
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('hatlonUnit', 'm')}
                      className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                        formData.hatlonUnit === 'm'
                          ? 'bg-success text-success-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      meter
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">🫧 Oxygen Cylinders</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.oxygenCylinders || ''}
                  onChange={(e) => updateField('oxygenCylinders', Number(e.target.value) || 0)}
                  placeholder="Quantity"
                  className="mt-2 h-12"
                />
              </div>
              
              <div>
                <Label className="text-base font-medium">💨 Nitrogen Cylinders</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.nitrogenCylinders || ''}
                  onChange={(e) => updateField('nitrogenCylinders', Number(e.target.value) || 0)}
                  placeholder="Quantity"
                  className="mt-2 h-12"
                />
              </div>
              
              <div>
                <Label className="text-base font-medium">❄️ AC Gas Type/kg</Label>
                <Input
                  type="text"
                  value={formData.acGas}
                  onChange={(e) => updateField('acGas', e.target.value)}
                  placeholder="404, 404A, 410, etc."
                  className="mt-2 h-12"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};